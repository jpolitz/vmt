import React, { useRef, useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import ControlWarningModal from './ControlWarningModal';
import { usePyret, socket, API } from 'utils';
import classes from './graph.css';

const CodePyretOrg = (props) => {
  const { tab, inControl, user } = props;
  const { currentStateBase64: initialState } = tab;

  const [showControlWarning, setShowControlWarning] = useState(false);

  const cpoIframe = useRef();
  const cpoDivWrapper = useRef();
  const receivingData = useRef(false);

  const onMessage = function(data) {
    if (
      data.source === 'react-devtools-bridge' ||
      data.source === 'react-devtools-content-script'
    ) {
      return;
    }

    console.log('Got a message VMT side', data);

    // console.log('Responses updated: ', responses);
    if (_hasControl()) {
      handleResponseData(data);
    }
  };

  const { iframeSrc, postMessage, currentState, isReady } = usePyret(
    cpoIframe,
    onMessage,
    initialState
  );

  useEffect(() => {
    initPlayer();
    return () => {
      socket.removeEventListener('RECEIVE_EVENT', handleReceiveEvent);
      console.log('CPO activity ending - clean up listeners');
    };
  }, []);

  useEffect(() => {
    console.log('current state', currentState);
  }, [currentState]);

  // communicating to Pyret Editor about control state
  useEffect(() => {
    const { isFirstTabLoaded } = props;
    if (isFirstTabLoaded) {
      // states: ['gainControl', 'loseControl']
      // VMT states: ['ME', 'NONE', 'OTHER']
      if (inControl === 'ME') {
        postMessage({ type: 'gainControl' });
        console.log('gained Control!');
      } else {
        postMessage({ type: 'loseControl' });
        console.log('lost Control!');
      }
    }
  }, [inControl]);

  useEffect(() => {
    const { setFirstTabLoaded } = props;
    setFirstTabLoaded();
  }, [isReady]);

  // basic function is to build and save and event history
  const putState = () => {
    const { tab } = props;
    const { _id } = tab;
    const updateObject = {
      currentStateBase64: JSON.stringify(currentState),
    };
    API.put('tabs', _id, updateObject).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
  };

  // TODO: can we parse activity descriptions from Pyret?
  const buildDescription = (username, updates) => {
    console.log('Building description of', updates);
    return `${username} updated the program`;
  };

  const handleResponseData = (pyretMessage) => {
    console.log('Response data processing: ', pyretMessage);
    if (!isReady) return;
    const { emitEvent } = props;
    if (!receivingData.current) {
      const description = buildDescription(user.username, pyretMessage);

      const pyretMessageString = JSON.stringify(pyretMessage);
      const newData = {
        currentState: pyretMessageString, // use the currentState field on Event model
        description,
      };
      emitEvent(newData);
      console.log('Sent event... ', newData);
      putState();
    }
    receivingData.current = false;
  };

  const handleReceiveEvent = (data) => {
    const { updatedRoom, addNtfToTabs, addToLog } = props;
    console.log('Socket: Received data: ', data);
    addToLog(data);
    const { room } = props;
    receivingData.current = true;
    if (data.tab === tab._id) {
      const updatedTabs = room.tabs.map((t) => {
        if (t._id === data.tab) {
          t.currentState = data.currentState;
        }
        return tab;
      });
      updatedRoom(room._id, { tabs: updatedTabs });
      const pyretMessage = JSON.parse(data.currentState);
      // Relay the pyretMessage
      if (pyretMessage) {
        postMessage(pyretMessage);
      }
    } else {
      addNtfToTabs(data.tab);
      receivingData.current = false;
    }
  };

  function initializeListeners() {
    socket.on('RECEIVE_EVENT', handleReceiveEvent);
  }

  const initPlayer = () => {
    initializeListeners();
  };

  function _hasControl() {
    return inControl === 'ME';
  }

  function _checkForControl(event) {
    if (!_hasControl()) {
      event.preventDefault();
      setShowControlWarning(true);
    }
  }

  const style = {
    width: '100%',
    height: '100%',
    pointerEvents: !_hasControl() ? 'none' : 'auto',
  };

  return (
    <Fragment>
      <ControlWarningModal
        showControlWarning={showControlWarning}
        toggleControlWarning={() => {
          setShowControlWarning(false);
        }}
        takeControl={() => {
          props.toggleControl();
          setShowControlWarning(false);
        }}
        inControl={inControl}
        cancel={() => {
          setShowControlWarning(false);
        }}
        inAdminMode={user.inAdminMode}
      />

      <div
        className={classes.Activity}
        onClickCapture={_checkForControl}
        id="containerParent"
        style={{
          height: '890px', // @TODO this needs to be adjusted based on the editor instance.
        }}
      >
        <div
          ref={cpoDivWrapper}
          // style={{ height: '100%' }}
          id="container"
          style={{
            pointerEvents: !_hasControl() ? 'none' : 'auto',
            height: '100%',
            overflow: 'auto',
          }}
        >
          <iframe
            ref={cpoIframe}
            style={style}
            title="pyret"
            src={iframeSrc} // "http://localhost:5000/editor"
          />
          ;
        </div>
      </div>
    </Fragment>
  );
};

CodePyretOrg.propTypes = {
  room: PropTypes.shape({}).isRequired,
  tab: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  updatedRoom: PropTypes.func.isRequired,
  toggleControl: PropTypes.func.isRequired,
  setFirstTabLoaded: PropTypes.func.isRequired,
  inControl: PropTypes.string.isRequired,
  addNtfToTabs: PropTypes.func.isRequired,
  addToLog: PropTypes.func.isRequired,
};

export default CodePyretOrg;
