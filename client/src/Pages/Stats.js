import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import history from '../history.js'
import { requestGetStats } from "../Services/GetStatsService.js"

export default class Stats extends React.Component {
    constructor(props){
        super(props);
        this.totalWins = this.getStats();
    }
    async getStats(){
        return await requestGetStats(sessionStorage.getItem('user'));
    }
    render(){
        return(<p>{this.totalWins}</p>);
    }
}