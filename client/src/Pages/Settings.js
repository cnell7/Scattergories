import React from 'react';
import history from '../history.js'
import { requestNewPass } from '../Services/ChangePassService.js'

class DeleteAccount extends React.Component {
    constructor(props){
        super(props);
    }
    handleClick(e){
        e.preventDefault();
        history.push('/home');
    }
    render(){
        return(
            <button class="button is-danger has-text-black" onClick={this.handleClick}>
                <strong>Delete</strong>
            </button>
        );
    }
}

class SubmitNewPass extends React.Component{
    constructor(props){
        super(props);
    }
    async handleClick(){
        let oldPass = document.getElementById('changeOldPassInput').value;
        let newPass = document.getElementById('changeNewPassInput').value;
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
        let response = await requestNewPass(oldPass, newPass);
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
        if(!document.getElementById('goodDiv')){
            let goodDiv = document.createElement('div');
            let goodB = document.createElement('button');
            let goodP = document.createElement('p');
            goodDiv.setAttribute("class", "notification is-primary");
            goodDiv.setAttribute("id", "goodDiv")
            goodB.setAttribute("class", "delete");
            goodB.setAttribute("id", "goodUserButton")
            goodB.onclick = () => {
                document.getElementById('goodDiv').remove();
            }
            goodP.setAttribute("id", "goodUser");
            goodP.appendChild(document.createTextNode("Success! You've changed your password."));
            goodDiv.append(goodB, goodP)
            document.getElementById('signupForm').append(goodDiv);
        }
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
                    <h2 class='title is-4'>New Password</h2>
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
                <div class='box has-text-centered'>
                    <h2 class='title is-4 has-text-daner'><strong>Delete Account</strong></h2>
                    <div class="container">
                        <p class="control has-text-centered">
                            <DeleteAccount />
                        </p>
                    </div>
                </div>
            </div>
        </div>);
    }
}