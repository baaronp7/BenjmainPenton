'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

import 'whatwg-fetch';

var wpBaseURL = wpSite => {return 'https://public-api.wordpress.com/rest/v1.1/sites/' + wpSite + '/posts/'}
var wpPath = wpTag => {return '?tag=' + wpTag}

var WordPress = React.createClass({
    getInitialState: function() {
        this.state = {};
        return({ message: null });
    },

    componentDidMount: function() {
        console.log(wpBaseURL(this.props.wpSite)+wpPath(this.props.wpTag));
        var url;
        if(!this.props.wpTag)
            url = wpBaseURL(this.props.wpSite)+wpPath(this.props.wpTag);
        else
            url = wpBaseURL(this.props.wpSite);
        fetch(url)
            .then(d => d.json())
            .then(d => {
                this.setState({
                    wpData: d
                });
                console.log(d);
            });
    },

    render: function() {
        if (!this.state.wpData) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
        return (
            <div>
                {this.state.wpData.posts.map(function(post, i) {
                    return <div key={i}><h1>{post.title}</h1><div dangerouslySetInnerHTML={{__html: post.content}}></div></div>
                })}
            </div>
        );
    },

    shouldComponentUpdate: function(nextProps, nextState){
        if (!this.state.wpData)
            return true;
        if (nextState.wpData.posts[0].content != this.state.wpData.posts[0].content)
            return true;
        return false;
    },

    componentDidUpdate: function(prevProps, prevState) {
        console.log(wpBaseURL(this.props.wpSite)+wpPath(this.props.wpTag));
        var url;
        if(!this.props.wpTag)
            url = wpBaseURL(this.props.wpSite)+wpPath(this.props.wpTag);
        else
            url = wpBaseURL(this.props.wpSite);
        fetch(url)
            .then(d => d.json())
            .then(d => {
                this.setState({
                    wpData: d
                });
                console.log(d);
            });
    }
});

export default WordPress;