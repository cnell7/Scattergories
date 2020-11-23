import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import history from '../history.js'
import { requestGetStats } from "../Services/GetStatsService.js"

export default class Stats extends React.Component {
    constructor(props){
        super(props);
        this.state = {stats: this.getStats().body}
    }
    async getStats(){
        return await requestGetStats();
    }
    render(){
        return(<p>{this.state.stats}</p>);
    }
}