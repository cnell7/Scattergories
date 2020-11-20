import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import history from '../history.js'

export default class Game extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(<p>Game</p>);
    }
}