import React from 'react';
import history from '../history.js'

export default class Settings extends React.Component {
    constructor(props){
        super(props);
        this.signedIn = this.props.state.signedIn;
    }
    render(){
        return(<p>Settings</p>);
    }
}