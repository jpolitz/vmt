/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { connect } from 'react-redux';
import { NavItem, ToggleGroup } from 'Components';
import { updateMonitorSelections } from 'store/actions';
import statsReducer, { initialState } from 'Containers/Stats/statsReducer';
import Chart from 'Containers/Stats/Chart';
import SimpleChat from 'Components/Chat/SimpleChat';
import { API, buildLog } from 'utils';
import SelectionTable from './SelectionTable';
import classes from './monitoringView.css';
import DropdownMenuClasses from './dropdownmenu.css';

/**
 * The MonitoringView provides three views into a set of rooms: activity graph, thumbnail, and chat. Users can
 * select which of all the rooms they manage (from userResources).
 *
 * The views of the rooms are laid out as tiles. The tiles have their room name at top and a space for notifications. Clicking
 * on the notification icon brings up the notifications in a modal window for that room (@TODO). Hovering on the three dots next to a title
 *  brings up a menu: Enter Room, Manage Members, Open Replayer, and View Room Stats. Each of these simply goes to the
 * appropriate Route (the room, the lobby with the members tab selected, the room with the replayer, or the room lobby
 * with the Stats tab selected).
 *
 * For the activity graph, I reuse what's shown in the stats area of the room.
 * For the chat, there's a simpler chat component (SimpleChat), which is a SIGNIFICANTLY scaled down version of /Layout/Chat (i.e.,
 * ChatLayout) -- no references or arrows are shown, the text messages aren't clickable, etc. However, this component
 * does show the room name at top (rather than just 'Chat') and implements a dropdown menu (a component embedded in
 * the SimplifiedChat file) that was mostly copied from DropdownNavItem.
 * Thumbnails (@TODO) might require server-side rendering (e.g., via
 * Puppeteer) and then pulling the base64 string to the client.
 *
 * Monitoring connects to the Redux store to maintain the user's selection of rooms (and potentially other states of the
 * monitoring view)
 *
 * @TODO:
 *  - when you use the menu to jump somewhere else, the way to get back to Monitoring is the browser's Back button.
 *    Is this obvious enough for users?
 *  - Perhaps adapt the InfoBox rather than having my custom "Title" div below.
 *  - Store entire state (room selections, toggle choices, scrollTop for each tile, etc.) in Redux store and restore MonitorView state accordingly
 *  - Show notifications for rooms
 *  - indicate 'last update' on each tile as well as number currently in room (but how to do this so isn't overly busy)
 *  - UPDATE TO USE USESNAPSHOT HOOK. This encapsulates a lot of the thumbnail logic.  Similarly, need to use the
 *      usePopulatedRoom hook.
 */

function MonitoringView({
  userResources: allResources,
  storedSelections,
  user,
  connectUpdateMonitorSelections,
  notifications,
}) {
  const constants = {
    SELECT: 'Select',
    VIEW: 'View',
    CHAT: 'Chat',
    THUMBNAIL: 'Thumbnail',
    GRAPH: 'Graph',
    SIMPLE: 'Simple Chat',
    DETAILED: 'Detailed Chat',
  };

  // Monitoring is allowed only on the rooms that the user manages.
  const userResources = React.useMemo(
    () => allResources.filter((res) => res.myRole === 'facilitator'),
    [allResources]
  );

  const _wasRecentlyUpdated = (room) => {
    // integrated logic to determine default rooms to view
    // hours is time window to determine recent rooms
    const hours = 24;
    const recent = 3600000 * hours;
    const lastUpdated = new Date(room.updatedAt);
    const now = new Date();
    return now - lastUpdated < recent;
  };

  // we have to check whether the rooms in userResources are consistent
  // with the collection of rooms that were available for selection
  // and so stored in the Redux store.  For example, maybe a new room
  // was added since we last did our monitoring.
  const _initializeSelections = (rooms) => {
    const result = {};
    rooms.forEach((room) => {
      if (
        !storedSelections ||
        (storedSelections && storedSelections[room._id] === undefined)
      ) {
        result[room._id] = _wasRecentlyUpdated(room);
      } else {
        result[room._id] = storedSelections[room._id];
      }
    });
    return result;
  };

  const [viewOrSelect, setViewOrSelect] = React.useState(constants.VIEW);
  const [selections, setSelections] = React.useState(
    _initializeSelections(userResources)
  );
  const [viewType, setViewType] = React.useState(constants.CHAT);
  const [chatType, setChatType] = React.useState(constants.DETAILED);
  const savedState = React.useRef();

  // Because "useQuery" is the equivalent of useState, do this
  // initialization of queryStates (an object containing the states
  // for the API-retrieved data) at the top level rather than inside
  // of a useEffect.
  const queryStates = {};
  userResources.forEach((room) => {
    queryStates[room._id] = useQuery(
      room._id,
      () =>
        API.getPopulatedById('rooms', room._id, false, true).then(
          (res) => res.data.result
        ),
      // Check for updates constantly. If we are viewing rooms (i.e., Chat, Thumbnail, or Graph), then we need
      // to update only the currently selected rooms. If we are selecting rooms via the selection table, then we
      // should try to update all rooms so that the "current in room" column remains correct.
      {
        refetchInterval: 10000, // @TODO Should experiment with longer intervals to see what's acceptable to users (and the server)
        enabled:
          (savedState.current && savedState.current[room._id]) ||
          viewOrSelect === constants.SELECT,
      }
    );
  });

  /**
   * EFFECTS THAT ARE USED TO PERSIST STATE AFTER UNMOUNT
   *
   * Whenever the state we want to persist changes, update the savedState ref. When the component unmounts,
   * save the state in the Redux store. Much preferred to alerting the Redux store of every little local state change.
   *
   * Right now, we save only the current selections. In the future, we might save:
   *  - width and height of each tile
   *  - the scroll location for each tile
   *  - whether we are viewing chat, thumbnail, or graph
   *
   */

  React.useEffect(() => {
    savedState.current = selections;
  }, [selections]);

  React.useEffect(() => {
    return () => {
      connectUpdateMonitorSelections(savedState.current);
    };
  }, []);

  /**
   *
   * FUNCTIONS THAT ARE USED TO SIMPLIFY THE RENDER LOGIC
   *
   */

  const _adminWarning = () => {
    return (
      <div style={{ color: 'red' }}>
        {/* {!user.isAdmin ? (
          <span>
            Warning: You are not an Admin. If you enter a room, you will be
            seen. To become an admin, please contact your VMT administrator.
          </span>
        ) : ( */}
        {user.isAdmin && !user.inAdminMode && (
          <span>Warning: You are not currently in Admin mode.</span>
        )}
      </div>
    );
  };

  const _checkForSelection = (roomsSelections) => {
    if (Object.keys(roomsSelections).length === 0) return false;
    if (Object.values(roomsSelections).indexOf(true) > -1) {
      return true;
    }
    return false;
  };

  const _makeMenu = (id) => {
    return [
      {
        name: 'Enter Room',
        link: `/myVMT/workspace/${id}`,
      },
      {
        name: 'Manage Members',
        link: `/myVMT/rooms/${id}/members`,
      },
      {
        name: 'Open Replayer',
        link: `/myVMT/workspace/${id}/replayer`,
      },
      {
        name: 'View/Export Room Stats',
        link: `/myVMT/rooms/${id}/stats`,
      },
    ];
  };

  const _getMostRecentSnapshot = (roomId) => {
    if (!queryStates[roomId].isSuccess) return null;
    const snapshotData = queryStates[roomId].data.snapshot; // all the snapshots, indexed by tabIds
    if (!snapshotData) return null;
    let maxSoFar = 0;
    let result = null;
    Object.values(snapshotData).forEach((snapDatum) => {
      if (snapDatum.timestamp > maxSoFar) {
        maxSoFar = snapDatum.timestamp;
        result = snapDatum.dataURL;
      }
    });
    return result;
  };

  // The isSuccess test is really not needed because we don't render unless it's true. However,
  // it just seems clearer to keep the test here as we are using queryStates[].data
  const _displayViewType = (id) => {
    switch (viewType) {
      case constants.GRAPH:
        return (
          <ChartUpdater
            log={
              queryStates[id].isSuccess
                ? buildLog(queryStates[id].data.tabs, queryStates[id].data.chat)
                : []
            }
          />
        );
      case constants.CHAT:
        return (
          <SimpleChat
            isSimplified={chatType === constants.SIMPLE}
            log={queryStates[id].isSuccess ? queryStates[id].data.chat : []}
          />
        );
      case constants.THUMBNAIL: {
        const snapshot = _getMostRecentSnapshot(id);
        return snapshot && snapshot !== '' ? (
          <img alt={`Snapshot of room ${id}`} src={snapshot} />
        ) : (
          <span className={classes.NoSnapshot}>No snapshot currently</span>
        );
      }
      default:
        return null;
    }
  };

  // @TODO VMT should have a standard way of displaying timestamps, perhaps in utilities. This function should be there.
  const _roomDateStamp = (lastUpdated) => {
    const d = new Date(lastUpdated);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [month, day, year].join('-');
  };

  return (
    <div className={classes.Container}>
      {_adminWarning()}

      <div className={classes.TogglesContainer}>
        <ToggleGroup
          buttons={[constants.VIEW, constants.SELECT]}
          onChange={setViewOrSelect}
        />

        {viewOrSelect === constants.VIEW && (
          <Fragment>
            <ToggleGroup
              buttons={[constants.CHAT, constants.THUMBNAIL, constants.GRAPH]}
              onChange={setViewType}
            />
            {viewType === constants.CHAT && (
              <ToggleGroup
                buttons={[constants.DETAILED, constants.SIMPLE]}
                onChange={setChatType}
              />
            )}
          </Fragment>
        )}
      </div>

      {viewOrSelect === constants.SELECT ? (
        <SelectionTable
          data={Object.keys(queryStates)
            .filter((id) => queryStates[id].isSuccess)
            .map((_id) => {
              return { _id, ...queryStates[_id].data };
            })}
          selections={selections}
          onChange={(newSelections) => {
            setSelections((prev) => {
              return { ...prev, ...newSelections };
            });
          }}
        />
      ) : (
        <div className={classes.TileGroup}>
          {!_checkForSelection(selections) && (
            <div className={classes.NoSnapshot}>
              No rooms in current selection
            </div>
          )}
          {userResources.map((room) => {
            // for each of the rooms managed by a user, if that
            // room is selected, display its title bar (title and menu) and
            // then the particular view type.
            return (
              selections[room._id] && (
                <div key={room._id} className={classes.Tile}>
                  <div className={classes.TileContainer}>
                    <div
                      className={classes.Title}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginBottom: '5px',
                      }}
                    >
                      <DropdownMenu
                        list={_makeMenu(room._id)}
                        name={<i className="fas fa-bars" />}
                      />
                      {queryStates[room._id].isSuccess ? (
                        <Fragment>
                          {queryStates[room._id].data.name}
                          <span className={classes.Timestamp}>
                            updated:{' '}
                            {_roomDateStamp(
                              queryStates[room._id].data.updatedAt
                            )}
                          </span>
                        </Fragment>
                      ) : (
                        'Loading...'
                      )}
                    </div>

                    {queryStates[room._id].isSuccess &&
                      _displayViewType(room._id)}
                  </div>
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * ChartUpdater is a simple wrapper that implements the reducer-based approach to displaying info
 * in the chart (taken from Stats.js). In Stats.js, the reducer is used to communicate changes
 * due to the log or the filters changing.
 */
function ChartUpdater(props) {
  const { log } = props;
  const [state, dispatch] = React.useReducer(statsReducer, initialState);

  React.useEffect(() => {
    // @TODO this should be an action that hides the literal string.
    // Also, why not use the Redux store?
    if (log && log.length > 0) dispatch({ type: 'GENERATE_DATA', data: log });
  }, [log]);

  return <Chart state={state} />;
}

/**
 * DropdownMenu is an adaptation of DropdownNavItem used in the main VMT header. I adapted it
 * because it looks nice. If there's a desire to make this a generic, reusable
 * component, it should be moved to the ./Components portion of src.
 */

const DropdownMenu = (props) => {
  const { name, list } = props;
  return (
    <li
      className={DropdownMenuClasses.Container}
      // eslint-disable-next-line react/destructuring-assignment
      data-testid={props['data-testid']}
    >
      <NavItem link={list[0].link} name={name} />
      <div className={DropdownMenuClasses.DropdownContent}>
        {list.map((item) => {
          return (
            <div className={DropdownMenuClasses.DropdownItem} key={item.name}>
              <NavItem link={item.link} name={item.name} />
            </div>
          );
        })}
      </div>
    </li>
  );
};

MonitoringView.propTypes = {
  // @TODO clean up so only specify what we need
  resource: PropTypes.string.isRequired,
  parentResource: PropTypes.string,
  parentResourceId: PropTypes.string,
  user: PropTypes.shape({}).isRequired,
  userResources: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  storedSelections: PropTypes.shape({}),
  connectUpdateMonitorSelections: PropTypes.func.isRequired,
};

MonitoringView.defaultProps = {
  parentResource: null,
  parentResourceId: null,
  storedSelections: {},
};

ChartUpdater.propTypes = {
  log: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

DropdownMenu.propTypes = {
  name: PropTypes.element.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  'data-testid': PropTypes.string,
};

DropdownMenu.defaultProps = {
  'data-testid': 'dropdownMenu',
};

const mapStateToProps = (state) => {
  return {
    storedSelections: state.rooms.monitorSelections,
  };
};

export default connect(
  mapStateToProps,
  {
    connectUpdateMonitorSelections: updateMonitorSelections,
  }
)(MonitoringView);
