import React from 'react';
import history from '../history.js'
import { requestNewPass } from '../Services/ChangePassService.js'

class SubmitNewPass extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(){
        let oldPass = document.getElementById('changeOldPassInput').value;
        let newPass = document.getElementById('changeNewPassInput').value;
        console.log(oldPass, newPass);
    }
    render(){
        return(
            <div>
                <button class="button is-black has-text-danger mt-4" onClick={this.handleClick}>Change Password</button>
            </div>
        );
    }
}

export default class Settings extends React.Component {
    constructor(props){
        super(props);
        this.signedIn = this.props.state.signedIn;
    }
    render(){
        return(
            <div class="section">
            <h1 class="title is-5 has-text-centered">Settings</h1>
            <div class="container is-max-desktop">
                <div id="settingsForm">
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input id="changeOldPassInput" class="input" placeholder="Old Password"></input>
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-check"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input id="changeNewPassInput" class="input" placeholder="New Password"></input>
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-check"></i>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="container">
                <p class="control has-text-centered">
                    <SubmitNewPass />
                </p>
            </div>
        </div>);
    }
}