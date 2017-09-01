'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

import WordPress from './wordpress.js';
import BubbleElemnet from './bubbleContainer.js';

var App = React.createClass({
    getInitialState: function() {
        this.state = {};
        return ({message: null})
    },

    render: function() {
        return (
            <div className='App'>
                <BubbleElemnet class="workExperience" posTop="0" posLeft="0" widthHeight="20px">
                    <WordPress wpSite="bapcontent.wordpress.com" wpTag="work-experience"></WordPress>
                </BubbleElemnet>
                <BubbleElemnet class="skills" posTop="0" posLeft="50px">
                    <WordPress wpSite="bapcontent.wordpress.com" wpTag="work-experience"></WordPress>
                </BubbleElemnet>
            </div>
        );
    },

    shouldComponentUpdate: function(nextProps, nextState){
        return true;
    }
});

ReactDOM.render(
  <App></App>,
  document.getElementById('container')
);