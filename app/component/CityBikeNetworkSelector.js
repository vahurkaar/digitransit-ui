import PropTypes from 'prop-types';
import React from 'react';
import Toggle from './Toggle';
import { saveRoutingSettings } from '../action/SearchSettingsActions';
import Icon from './Icon';
import {
  mapDefaultNetworkProperties,
  getCityBikeNetworkName,
  getCityBikeNetworkConfig,
  updateCitybikeNetworks,
  getCitybikeNetworks,
} from '../util/citybikes';

const CityBikeNetworkSelector = (
  { isUsingCitybike, currentOptions },
  { config, getStore, executeAction },
) => (
  <React.Fragment>
    {mapDefaultNetworkProperties(config).map(network => (
      <div
        className="mode-option-block citybike-network-container"
        key={`cb-${network.networkName}`}
        style={{ height: '3em' }}
      >
        <Icon
          className={`${network.icon}-icon`}
          img={`icon-icon_${network.icon}`}
          height={0.5}
          width={0.5}
        />
        <Toggle
          toggled={
            isUsingCitybike &&
            currentOptions.filter(option => option === network.networkName)
              .length > 0
          }
          label={getCityBikeNetworkName(
            getCityBikeNetworkConfig(network.networkName, config),
            getStore('PreferencesStore').getLanguage(),
          )}
          onToggle={() => {
            executeAction(saveRoutingSettings, {
              allowedBikeRentalNetworks: updateCitybikeNetworks(
                getCitybikeNetworks(config),
                network.networkName,
                config,
                isUsingCitybike,
              ),
            });
          }}
        />
      </div>
    ))}
  </React.Fragment>
);

CityBikeNetworkSelector.propTypes = {
  currentOptions: PropTypes.array.isRequired,
  isUsingCitybike: PropTypes.bool.isRequired,
};

CityBikeNetworkSelector.contextTypes = {
  config: PropTypes.object.isRequired,
  getStore: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired,
};

export default CityBikeNetworkSelector;
