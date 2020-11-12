import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './graph.css';
// import Aux from '../../Components/HOC/Auxil';
import { Aux, Button } from '../../Components';
import { Player } from '../../external/js/api.es';
// import API from '../../utils/apiRequests';
// import { updatedRoom } from '../../store/actions';

function DesmosActivityGraph() {
  const [screenPage, setScreenPage] = useState(1);

  // useEffect(() => {
  //   const { tab, setFirstTabLoaded } = this.props;
  //   let activityConfig;
  //   // let window.player;

  //   // TODO handle existing room state?
  //   try {
  //     if (tab.desmosLink) {
  //       let link = tab.desmosLink;
  //       link = link.split('/');
  //       const code = link[link.length - 1];
  //       const URL = `https://teacher.desmos.com/activitybuilder/export/${code}`;
  //       console.log('adapted activity url: ', URL);
  //       fetch(URL, { headers: { Accept: 'application/json' } })
  //         .then((res) => res.json())
  //         .then((json) => {
  //           activityConfig = json;
  //           window.player = new Player({
  //             activityConfig,
  //             targetElement: this.calculatorRef.current,
  //           });

  //           if (window.player)
  //             console.log('Desmos Activity Player Initialized');

  //           setFirstTabLoaded();
  //         });
  //     }
  //   } catch (err) {
  //     console.log('Error- could not fetch URL, defaulting activity url: ', err);

  //     const URL = `https://teacher.desmos.com/activitybuilder/export/5ddbf9ae009cd90bcdeaadd7`;
  //     fetch(URL, { headers: { Accept: 'application/json' } })
  //       .then((res) => res.json())
  //       .then((json) => {
  //         activityConfig = json;

  //         window.player = new Player({
  //           activityConfig,
  //           targetElement: this.calculatorRef.current,
  //         });

  //         if (window.player)
  //           console.log('BACKUP - Desmos Activity Player Initialized');

  //         setFirstTabLoaded();
  //       });
  //   }
  // },[])

  console.log(window);
  console.log(screenPage);
  return (
    <Aux>
      <div id="activityNavigation">
        <Button theme="Small" id="nav-left">
          Prev
        </Button>
        Screen <span id="show-screen">{screenPage}</span>
        <Button theme="Small" id="nav-right">
          Next
        </Button>
      </div>
      <div
        className={classes.Graph}
        id="calculator"
        //ref={this.calculatorRef}
      />
    </Aux>
  );
}

DesmosActivityGraph.propTypes = {
  // activity: PropTypes.shape({}).isRequired,
  // currentTab: PropTypes.string.isRequired,
  tab: PropTypes.shape({}).isRequired,
  // role: PropTypes.string.isRequired,
  setFirstTabLoaded: PropTypes.func.isRequired,
  // updateActivityTab: PropTypes.func.isRequired,
};

export default DesmosActivityGraph;