import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { requestLogin } from '../Services/LoginService.js'

function ActionLink() {
    async function handleClick(e) {
        e.preventDefault();
        console.log('Sending signup request...');
        let u = document.getElementById('usernameInput').value;
        let p = document.getElementById('passwordInput').value;
        if(u.length == 0 || p.length ==0){
            if(!document.getElementById('emptyUserDiv')){
                let takenDiv = document.createElement('div');
                let takenB = document.createElement('button');
                let takenP = document.createElement('p');
                takenDiv.setAttribute("class", "notification is-danger");
                takenDiv.setAttribute("id", "emptyUserDiv")
                takenB.setAttribute("class", "delete");
                takenB.setAttribute("id", "emptyUserButton")
                takenB.onclick = () => {
                    document.getElementById('emptyUserDiv').remove();
                }
                takenP.setAttribute("id", "emptyUser");
                takenP.appendChild(document.createTextNode("Empty username or password"));
                takenDiv.append(takenB, takenP)
                document.getElementById('signupForm').append(takenDiv);
            }
            return false
        }
        let response = await requestLogin(u, p);
        return response
    }
  
    return (<a id="signupSubmitLink" href="#" onClick={handleClick}>Submit</a>);
}

export default function Login() {
    return(
        <div id="loginForm">
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input id="usernameInput" class="input" type="username" placeholder="Username"></input>
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                    </span>
                </p>
                </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input id="passwordInput" class="input" type="password" placeholder="Password"></input>
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <ActionLink />
                </p>
            </div>
        </div>
    );
};