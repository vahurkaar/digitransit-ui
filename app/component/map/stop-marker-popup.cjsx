React                 = require 'react'
Relay                 = require 'react-relay'
queries               = require '../../queries'
StopCardContainer     = require '../stop-cards/stop-card-container'
Icon                  = require '../icon/icon.cjsx'
Link                  = require 'react-router/lib/Link'
FavouriteStopsAction  = require '../../action/favourite-stops-action'
MarkerPopupBottom     = require './marker-popup-bottom'
{FormattedMessage} = require('react-intl')


class StopMarkerPopup extends React.Component
  componentDidMount: ->
    @props.context.getStore('FavouriteStopsStore').addChangeListener @onChange

  componentWillUnmount: ->
    @props.context.getStore('FavouriteStopsStore').addChangeListener @onChange

  onChange: (id) =>
    if id? and id == @props.stop.id
      @forceUpdate()

  render: ->
    favourite = @props.context.getStore('FavouriteStopsStore').isFavourite(@props.stop.id)
    addFavouriteStop = (e) =>
      e.stopPropagation()
      @props.context.executeAction FavouriteStopsAction.addFavouriteStop, @props.stop.id

    <div className="card">
      <StopCardContainer stop={@props.stop} departures={5} className="padding-small"/>
      <MarkerPopupBottom routeHere="/reitti/#{@props.context.getStore('PositionStore').getLocationString()}/#{@props.stop.name}::#{@props.stop.lat},#{@props.stop.lon}">
        <Link to="/pysakit/#{@props.stop.gtfsId}"><Icon img={'icon-icon_time'}/> Näytä lähdöt</Link><br/>
      </MarkerPopupBottom>
    </div>


module.exports = Relay.createContainer StopMarkerPopup,
  fragments: queries.StopMarkerPopupFragments
