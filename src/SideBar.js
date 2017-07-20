import React, { Component } from 'react'
import $ from 'jquery'

class SideBar extends Component {

    state = {
        showSidebar: false
    }

    changeShowState = () => {
        this.setState({showSidebar: !this.state.showSidebar})
    }

    clickItem = (e) => {
        this.props.onClickItem($(e.target).index())
    }

    changeInputText = (e) => {
        this.props.onChangeInputText(e.target.value)
    }

    getContent = () => {
        if(!this.state.showSidebar) {
            return (
                <div id='sidebar-button' onClick={this.changeShowState}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )
        } else {
            return (
                <div id='sidebar'>
                    <button style={{flex: '1 0 auto', maxHeight: '50px'}} className="w3-button w3-green w3-hover-light-green w3-large" onClick={this.changeShowState}>Close</button>
                    <input onChange={this.changeInputText} id="filter-input" type="text" className="w3-input"></input>
                    <ul style={{flex: '8 1 auto'}} className="w3-ul w3-hoverable">{
                        this.props.neighborLocations.map((location, index) => (
                            index === this.props.selectedIndex ?
                            <li onClick={this.clickItem} key={location.title.toString()} className="w3-text-white selected-item">{location.title}</li> :
                            <li onClick={this.clickItem} key={location.title.toString()} className="w3-text-white">{location.title}</li>
                        ))
                    }</ul>
                </div>
            )
        }
    }

    render() {
        return (
            <div  style={{position: 'fixed', left: '0px', top:'0px'}}>{
                this.getContent()
            }</div>
        )
    }
}

export default SideBar
