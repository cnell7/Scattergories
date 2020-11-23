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
        let response = requestNewPass(oldPass, newPass);
        if(oldPass.length > 18 || newPass.length > 18 || oldPass.length == 0 || newPass.length == 0){
            if(!document.getElementById('emptyPassDiv')){
                let emptyPassDiv = document.createElement('div');
                let emptyPassB = document.createElement('button');
                let emptyPassP = document.createElement('p');
                emptyPassDiv.setAttribute("class", "notification is-danger");
                emptyPassDiv.setAttribute("id", "emptyPassDiv")
                emptyPassB.setAttribute("class", "delete");
                emptyPassB.setAttribute("id", "emptyPassButton")
                emptyPassB.onclick = () => {
                    document.getElementById('emptyPassDiv').remove();
                }
                emptyPassP.setAttribute("id", "emptyPassP");
                emptyPassP.appendChild(document.createTextNode("Bad password length. A password must be between 1 and 18 characters."));
                emptyPassDiv.append(emptyPassB, emptyPassP)
                document.getElementById('settingsForm').append(emptyPassDiv);
            }
            return false;
        }
        if(!response){
            if(!document.getElementById('badPassDiv')){
                let badPassDiv = document.createElement('div');
                let badPassB = document.createElement('button');
                let badPassP = document.createElement('p');
                badPassDiv.setAttribute("class", "notification is-danger");
                badPassDiv.setAttribute("id", "badPassDiv")
                badPassB.setAttribute("class", "delete");
                badPassB.setAttribute("id", "badPassButton")
                badPassB.onclick = () => {
                    document.getElementById('badPassDiv').remove();
                }
                badPassP.setAttribute("id", "badPassP");
                badPassP.appendChild(document.createTextNode("Incorrect password."));
                badPassDiv.append(badPassB, badPassP)
                document.getElementById('settingsForm').append(badPassDiv);
            }
            return false
        }
        console.log(true);
        return true;
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
            <h1 class="title is-2 has-text-centered">Settings</h1>
            <div class="container is-max-desktop">
                <div class='box has-text-centered'>
                    <div id="settingsForm">
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input id="changeOldPassInput" class="input" type="password" placeholder="Old Password"></input>
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
                                <input id="changeNewPassInput" class="input" type="password" placeholder="New Password"></input>
                                <span class="icon is-small is-left">
                                    <i class="fas fa-envelope"></i>
                                </span>
                                <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="container">
                        <p class="control has-text-centered">
                            <SubmitNewPass />
                        </p>
                    </div>
                </div>
            </div>
        </div>);
    }
}