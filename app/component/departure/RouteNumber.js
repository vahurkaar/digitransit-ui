import React from 'react';
import cx from 'classnames';
import Icon from '../icon/icon';
import ComponentUsageExample from '../documentation/ComponentUsageExample';
import { realtimeDeparture as exampleRealtimeDeparture } from '../documentation/ExampleData';

function RouteNumber(props) {
  const mode = props.mode.toLowerCase();

  return (
    <span className={cx('route-number', props.className, { vertical: props.vertical })}>
      <Icon
        className={mode}
        img={`icon-icon_${mode}`}
      />
      {props.vertical ? <br /> : null}
      <span className={`vehicle-number ${mode}`}>
        {props.text}
      </span>
    </span>);
}

RouteNumber.description = (
  <div>
    <p>Display mode icon and route number with mode color</p>
    <ComponentUsageExample>
      <RouteNumber
        mode={exampleRealtimeDeparture.pattern.route.type}
        text={exampleRealtimeDeparture.pattern.route.shortName}
      />
    </ComponentUsageExample>
    <ComponentUsageExample description="with realtime symbol">
      <RouteNumber
        mode={exampleRealtimeDeparture.pattern.route.type}
        text={exampleRealtimeDeparture.pattern.route.shortName}
        realtime
      />
    </ComponentUsageExample>
    <ComponentUsageExample description="in vertical configuration">
      <RouteNumber
        mode={exampleRealtimeDeparture.pattern.route.type}
        text={exampleRealtimeDeparture.pattern.route.shortName}
        vertical
      />
    </ComponentUsageExample>
  </div>);

RouteNumber.propTypes = {
  mode: React.PropTypes.string.isRequired,
  realtime: React.PropTypes.bool,
  text: React.PropTypes.node,
  vertical: React.PropTypes.bool,
  className: React.PropTypes.string,
};

RouteNumber.displayName = 'RouteNumber';
export default RouteNumber;
