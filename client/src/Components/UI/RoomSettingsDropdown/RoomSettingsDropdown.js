import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'Components';
import { Room } from 'Model';
import Select, { components } from 'react-select';

const RoomSettingsDropdown = ({ initialSettings, onChange }) => {
  const [roomSettingsOptions, setRoomSettingsOptions] = useState([]);

  const handleRoomSettingsChange = (option) => {
    setRoomSettingsOptions((prevRoomSettingsOptions) =>
      // find the matching option.setting in prevRoomSettingsOptions and toggle its value
      prevRoomSettingsOptions.map((opt) => {
        if (opt.setting === option.setting) {
          return { ...opt, value: !opt.value };
        }
        return opt;
      })
    );
    onChange({ ...option, value: !option.value });
  };

  useEffect(() => {
    const source =
      (Object.values(initialSettings).length && initialSettings) ||
      Room.getDefaultRoomSettings();
    console.groupCollapsed('RoomSettingsDropdown');
    console.log('initialSettings', initialSettings);
    console.log('Room.getDefaultRoomSettings()', Room.getDefaultRoomSettings());
    console.log('source', source);
    console.groupEnd();
    const defaultRoomSettingsOptions = Object.keys(source).map((setting) => {
      return {
        value: source[setting],
        label: Room.settings[setting].label,
        setting,
      };
    });
    setRoomSettingsOptions(defaultRoomSettingsOptions);
  }, [initialSettings]);

  return (
    <Select
      isMulti
      isSearchable={false}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      isClearable={false}
      controlShouldRenderValue={false}
      placeholder="Update room settings"
      value={roomSettingsOptions.filter((option) => option.value)}
      options={roomSettingsOptions}
      onChange={(_oldOption, newOption) =>
        handleRoomSettingsChange(newOption.option)
      }
      components={{ Option }}
      name="roomSettings"
      styles={{
        option: (provided) => ({
          ...provided,
          cursor: 'pointer',
        }),
      }}
    />
  );
};

RoomSettingsDropdown.propTypes = {
  initialSettings: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};

const Option = (props) => {
  const {
    children,
    data: { setting },
    isSelected,
  } = props;

  return (
    <components.Option {...props}>
      <div
        onClick={(e) => e.preventDefault()}
        onKeyDown={(e) => e.preventDefault()}
        role="checkbox"
        aria-checked={isSelected}
        tabIndex={0}
      >
        <Checkbox
          checked={isSelected}
          change={() => {}}
          dataId={`${setting}-checkbox`}
        >
          {children}
        </Checkbox>
      </div>
    </components.Option>
  );
};

Option.propTypes = {
  children: PropTypes.node,
  data: PropTypes.shape({
    setting: PropTypes.string,
  }),
  isSelected: PropTypes.bool,
};

Option.defaultProps = {
  children: null,
  data: {},
  isSelected: false,
};

export default RoomSettingsDropdown;