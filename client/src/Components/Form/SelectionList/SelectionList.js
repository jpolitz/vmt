// @TODO this is very similar to participantList...look into combining/abstracting
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox/Checkbox';
import classes from './selectionList.css';

class SelectionList extends Component {
  render() {
    const { selectItem, listToSelectFrom, selected } = this.props;
    const ElementList = listToSelectFrom.map((activity, i) => {
      return (
        <li
          className={[classes.ListItem, i % 2 ? classes.Odd : null].join(' ')}
          key={activity._id}
        >
          <Checkbox
            change={(event) => {
              selectItem(event, activity._id);
            }}
            id={activity._id}
            checked={selected.indexOf(activity._id) > -1}
            dataId={activity.name}
            // @todo this component is sometimes controlled...but here it is not. we need to consistantly pass check and checked instead of onChange
            // but now this is going to require have two lists ... options vs. selected and then checked will = options contains selected.
          >
            {activity.name}
          </Checkbox>
        </li>
      );
    });
    return (
      <ul className={classes.List}>
        {listToSelectFrom.length > 0 ? (
          ElementList
        ) : (
          <div className={classes.ErrorText}>
            There doesn&#39;t appear to be anything here yet...
          </div>
        )}
      </ul>
    );
  }
}

SelectionList.propTypes = {
  listToSelectFrom: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string),
  selectItem: PropTypes.func.isRequired,
};

SelectionList.defaultProps = {
  selected: [],
};
export default SelectionList;
