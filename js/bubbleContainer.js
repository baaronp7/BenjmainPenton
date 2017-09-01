'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var BubbleElemnet = React.createClass({
    getInitialState: function() {
        this.state = {};
        console.log(this.props.posLeft);
        return({
            posTop: this.props.posTop,
            posLeft: this.props.posLeft,
            containerStyles: {
                top: this.props.posTop,
                left: this.props.posLeft
            },
            styles: {}, 
            expand: false, 
            load: false, 
            active: false, 
            show: false 
        });
    },

    componentDidMount: function() {

    },

    expandElement: function() {
        this.setState({
            containerStyles: { left: 0 },
            styles: {
                position: "absolute", 
                top: this.state.posTop,
                left: 0
            }
        });
        setTimeout(function() { 
            this.setState({
                containerStyles: { left: 0 },
                styles: {
                    position: "absolute", 
                    top: this.state.posTop,
                    left: this.state.posLeft
                },
                expand: true
            });
            setTimeout(function() { this.loadElement(); }.bind(this), 1000);
        }.bind(this), 10);
    },

    loadElement: function() {
        this.setState({
            load: true
        });
        setTimeout(function() { this.activateElement(); }.bind(this), 1000);
    },

    activateElement: function() {
        this.setState({
            load: false,
            styles: {
                left: 0
            },
            active: true
        });
        setTimeout(function() { this.showElement(); }.bind(this), 1000);
    },

    showElement: function() {
        this.setState({
            show: true
        });
        console.log("show: " + this.state.show);
    },

    closeElement: function() {
        this.setState({
            show: false,
            active: false,
            containerStyles: { left: 0 },
            styles: {
                position: "absolute", 
                top: this.state.posTop,
                left: this.state.posLeft
            },
            load: true,
            expand: true
        });
        setTimeout(function() { this.deexpandElement(); }.bind(this), 1000);
    },

    deexpandElement: function() {
        this.setState({
            show: false,
            load: false,
            active: false,
            containerStyles: { background: 'transparent' },
            styles: { left: 0 },
            expand: true
        });
        setTimeout(function() { this.deactivateElement(); }.bind(this), 1000);
    },

    deactivateElement: function() {
        this.setState({
            show: false,
            load: false,
            active: false,
            containerStyles: { left: this.state.posLeft },
            styles: { left: 0 },
            expand: false
        });
    },

    render: function() {
        return (
            <div ref="bubbleContainer" className={this.state.expand ? 'BubbleContainer ' + this.props.class + ' load' : this.state.load ? 'BubbleContainer ' + this.props.class + ' load' : this.state.active ? 'BubbleContainer ' + this.props.class + ' load' : 'BubbleContainer ' + this.props.class } style={this.state.containerStyles}>
                <div ref="BubbleElemnet" className='BubbleElemnet' style={this.state.styles}>
                    <div className={this.state.active ? 'close active' : 'close'} onClick={this.closeElement}></div>
                    <div className={this.state.active ? this.props.class + ' active' : this.state.load ? this.props.class + ' load' : this.props.class } onClick={this.expandElement}>
                        <div className={this.state.show ? 'show' : ''}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    shouldComponentUpdate: function(nextProps, nextState){
        return true;
    }
});

export default BubbleElemnet;