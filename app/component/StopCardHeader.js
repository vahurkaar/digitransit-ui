import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';

import CardHeader from './CardHeader';
import ComponentUsageExample from './ComponentUsageExample';
import Icon from './Icon';
import ServiceAlertIcon from './ServiceAlertIcon';
import ZoneIcon from './ZoneIcon';
import { getActiveAlertSeverityLevel } from '../util/alertUtils';
import ExternalLink from './ExternalLink';
import { Link } from 'react-router';
import { PREFIX_TIMETABLE_SUMMARY } from '../util/path';

class StopCardHeader extends React.Component {
  get headerConfig() {
    return this.context.config.stopCard.header;
  }

  getDescription() {
    let description = '';

    if (this.headerConfig.showDescription && this.props.stop.desc) {
      description += this.props.stop.desc;
    }

    if (this.headerConfig.showDistance && this.props.distance) {
      description += ` // ${Math.round(this.props.distance)} m`;
    }

    return description;
  }

  getExternalLink(code, isPopUp) {
    // Check for popup from stopMarkerPopup, should the external link be visible
    if (!code || isPopUp || !this.headerConfig.virtualMonitorBaseUrl) {
      return null;
    }
    const url = `${this.headerConfig.virtualMonitorBaseUrl}${code}`;
    return (
      <ExternalLink className="external-stop-link" href={url}>
        {' '}
        {
          <FormattedMessage
            id="stop-virtual-monitor"
            defaultMessage="Virtual monitor"
          />
        }{' '}
      </ExternalLink>
    );
  }

  render() {
    const {
      className,
      currentTime,
      headingStyle,
      icons,
      stop,
      isPopUp,
      isTerminal,
    } = this.props;
    if (!stop) {
      return false;
    }

    const prefix = isTerminal ? 'terminaalit' : 'pysakit';
    return (
      <CardHeader
        className={className}
        headerIcon={
          <ServiceAlertIcon
            className="inline-icon"
            severityLevel={getActiveAlertSeverityLevel(
              stop.alerts,
              currentTime,
            )}
          />
        }
        headingStyle={headingStyle}
        secondaryLink={
          isPopUp && (
            <Link to={`/${PREFIX_TIMETABLE_SUMMARY}/${stop.gtfsId}`}>
              <Icon img="icon-icon_schedule" />
              <div className="card-header-link-label">
                <FormattedMessage id="timetable-summary" defaultMessage="Timetable Summary" />
              </div>
            </Link>
          )
        }
        name={stop.name}
        url={isPopUp ? `/${prefix}/${encodeURIComponent(stop.gtfsId)}` : null}
        description={this.getDescription()}
        code={this.headerConfig.showStopCode && stop.code ? stop.code : null}
        externalLink={this.getExternalLink(stop.code, isPopUp)}
        icons={icons}
      >
        {this.headerConfig.showZone &&
          stop.zoneId && <ZoneIcon showTitle zoneId={stop.zoneId} />}
      </CardHeader>
    );
  }
}

StopCardHeader.propTypes = {
  currentTime: PropTypes.number,
  stop: PropTypes.shape({
    gtfsId: PropTypes.string,
    name: PropTypes.string,
    code: PropTypes.string,
    desc: PropTypes.string,
    isPopUp: PropTypes.bool,
    zoneId: PropTypes.string,
    alerts: PropTypes.arrayOf(
      PropTypes.shape({
        alertSeverityLevel: PropTypes.string,
        effectiveEndDate: PropTypes.number,
        effectiveStartDate: PropTypes.number,
      }),
    ),
  }),
  distance: PropTypes.number,
  className: PropTypes.string,
  headingStyle: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.node),
  isPopUp: PropTypes.bool,
  isTerminal: PropTypes.bool,
};

StopCardHeader.defaultProps = {
  stop: undefined,
};

StopCardHeader.contextTypes = {
  config: PropTypes.shape({
    stopCard: PropTypes.shape({
      header: PropTypes.shape({
        showDescription: PropTypes.bool,
        showDistance: PropTypes.bool,
        showStopCode: PropTypes.bool,
        showZone: PropTypes.bool,
        virtualMonitorBaseUrl: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
};

const exampleStop = {
  code: '4611',
  gtfsId: 'HSL:1541157',
  name: 'Kaivonkatsojanpuisto',
  desc: 'Kaivonkatsojantie',
};

StopCardHeader.displayName = 'StopCardHeader';

StopCardHeader.description = () => (
  <div>
    <ComponentUsageExample description="basic">
      <StopCardHeader stop={exampleStop} distance={345.6} />
    </ComponentUsageExample>
    <ComponentUsageExample description="with icons">
      <StopCardHeader
        stop={exampleStop}
        distance={345.6}
        icons={[
          <Icon className="info" img="icon-icon_info" key="1" />,
          <Icon className="caution" img="icon-icon_caution" key="2" />,
        ]}
      />
    </ComponentUsageExample>
  </div>
);

export default StopCardHeader;
