import React, { Component } from 'react'
import './css/App.css'
import './css/w3.css'
import Map from './Map.js'
import SideBar from './SideBar.js'

class App extends Component {

    state = {
        defaultLocations: [
            {title: 'Park Ave Penthouse', position: {lat: 40.7713024, lng: -73.9632393}},
            {title: 'Chelsea Loft', position: {lat: 40.7444883, lng: -73.9949465}},
            {title: 'Union Square Open Floor Plan', position: {lat: 40.7347062, lng: -73.9895759}},
            {title: 'East Village Hip Studio', position: {lat: 40.7281777, lng: -73.984377}},
            {title: 'TriBeCa Artsy Bachelor Pad', position: {lat: 40.7195264, lng: -74.0089934}},
            {title: 'Chinatown Homey Space', position: {lat: 40.7180628, lng: -73.9961237}}
        ],
        neighborLocations: [
            {title: 'Park Ave Penthouse', position: {lat: 40.7713024, lng: -73.9632393}},
            {title: 'Chelsea Loft', position: {lat: 40.7444883, lng: -73.9949465}},
            {title: 'Union Square Open Floor Plan', position: {lat: 40.7347062, lng: -73.9895759}},
            {title: 'East Village Hip Studio', position: {lat: 40.7281777, lng: -73.984377}},
            {title: 'TriBeCa Artsy Bachelor Pad', position: {lat: 40.7195264, lng: -74.0089934}},
            {title: 'Chinatown Homey Space', position: {lat: 40.7180628, lng: -73.9961237}}
        ],
        selectedIndex: -1
    }

    clickItem = (index) => {
        this.setState({selectedIndex: index})
    }

    changeInputText = (value) => {
        this.setState({neighborLocations: this.state.defaultLocations}, () => {
            if(value.trim() !== '') {
                const match = new RegExp('\\b' + value, 'i')
                const resultLocations = this.state.neighborLocations.filter((location) => (
                    match.test(location.title)
                ))
                this.setState({neighborLocations: resultLocations})
            }
        })
    }

    initIndex = () => {
        this.setState({selectedIndex: -1})
    }

    render() {
      return (
        <div className="App">
          <Map onClickItem={this.clickItem} selectedIndex={this.state.selectedIndex} neighborLocations={this.state.neighborLocations} onInitIndex={this.initIndex}/>
          <SideBar onChangeInputText={this.changeInputText} onClickItem={this.clickItem} selectedIndex={this.state.selectedIndex} neighborLocations={this.state.neighborLocations}/>
        </div>
      );
    }
}

export default App;
