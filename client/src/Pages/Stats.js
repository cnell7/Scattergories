import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import history from '../history.js'
import { requestGetStats } from "../Services/GetStatsService.js"

export default class Stats extends React.Component {
    constructor(props){
        super(props);
    }
    async componentDidMount() {
        let r = await requestGetStats();
        document.getElementById('stats').innerHTML = r;
    }
    render(){
        return(<p id='stats'>test</p>);
    }
}