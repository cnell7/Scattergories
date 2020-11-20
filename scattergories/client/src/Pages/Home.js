import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.logged = props.logged;
    }
    render(){
        return(<nav><button class='button'>Create</button><button class='button'>Join</button></nav>);
    }
};