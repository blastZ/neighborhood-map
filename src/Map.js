import React, { Component } from 'react'
import $ from 'jquery'

class Map extends Component {

    constructor() {
        super()
        this.map = null
        this.markers = []
        this.defaultMarker = null
        this.hoverMarker = null
        this.selectedMarker = null
        this.infoWindow = null
    }

    componentDidMount() {
        window.initMap = this.initMap
        this.loadJS('https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=AIzaSyAQwGrxv0G8j-tHGDB5MVP5Xg5ls0ULHZk&callback=initMap')
    }

    componentDidUpdate() {
        this.updateMarkers()
        this.markers.map((marker, index) => {
            if(index === this.props.selectedIndex) {
                marker.setIcon(this.selectedMarker)
                this.updateInfoWindow(marker)
            } else {
                marker.setIcon(this.defaultMarker)
            }
        })
    }

    updateMarkers = () => {
        const that = this
        this.markers.map((marker) => {
            marker.setMap(null)
        })
        this.markers = []
        this.props.neighborLocations.map((location, index) => {
            let marker = null
            if(index === this.props.selectedIndex) {
                marker = new window.google.maps.Marker({
                    position: location.position,
                    map: this.map,
                    icon: this.selectedMarker,
                    id: index,
                    title: location.title
                })
                //that.map.setCenter(marker.getPosition()); center the marker
            } else {
                marker = new window.google.maps.Marker({
                    position: location.position,
                    map: this.map,
                    icon: this.defaultMarker,
                    id: index,
                    title: location.title
                })
            }
            marker.addListener('mouseover', function() {
                this.setIcon(that.hoverMarker)
            })
            marker.addListener('mouseout', function() {
                if(this.id === that.props.selectedIndex) {
                    this.setIcon(that.selectedMarker)
                } else {
                    this.setIcon(that.defaultMarker)
                }
            })
            marker.addListener('click', function() {
                that.clickMarker(this)
            })
            this.markers.push(marker)
        })
    }

    updateInfoWindow = (marker) => {
        const that = this
        if(this.infoWindow) {
            this.infoWindow.close()
            this.infoWindow = null
        }
        var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + marker.title + '&format=json&callback=wikiCallback';
        var wikiTimeout = setTimeout(function(){
            that.infoWindow.setContent(`<div>${marker.title}</div><div>failed to get wikipedia resources</div>`);
        }, 4000);
        $.ajax({
            url: wikiUrl,
            dataType: 'jsonp',
        }).done(function(response){
            if(response.query.search.length > 0) {
                that.infoWindow.setContent(
                    `<div>${response.query.search[0].title}</div><div>${response.query.search[0].timestamp}</div><div>${response.query.search[0].snippet}</div>`
                )
            } else {
                that.infoWindow.setContent(
                    `<div>${marker.title}</div><div>nothing matched the query</div>`
                )
            }
            clearTimeout(wikiTimeout);
        });

        this.infoWindow = new window.google.maps.InfoWindow({
            content: ''
        })
        this.infoWindow.addListener('closeclick', () => {
            this.props.onInitIndex()
        })
        this.infoWindow.open(this.map, marker)
    }

    clickMarker = (marker) => {
        //this.map.setCenter(marker.getPosition()); center the marker
        this.props.onClickItem(marker.id)
    }

    initMap = () => {
        const that = this
        this.defaultMarker = {
            url: require('./imgs/marker-default.png'),
            scaledSize: new window.google.maps.Size(32, 32),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(16, 32)
        }
        this.hoverMarker = {
            url: require('./imgs/marker-hover.png'),
            scaledSize: new window.google.maps.Size(32, 32),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(16, 32)
        }
        this.selectedMarker = {
            url: require('./imgs/marker-selected.png'),
            scaledSize: new window.google.maps.Size(32, 32),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(16, 32)
        }
        this.map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: {lng: -73.9980244, lat: 40.7413549},
            mapTypeControl: false
        })
        this.updateMarkers()
    }

    loadJS = (src) => {
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref)
    }

    render() {
        return (
            <div id="map"></div>
        )
    }
}

export default Map
