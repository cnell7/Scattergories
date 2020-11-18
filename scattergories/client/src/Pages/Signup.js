import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { requestSignup } from '../Services/SignupService.js'

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
        let response = await requestSignup(u, p);
        if(!response){
            if(!document.getElementById('takenDiv')){
                let takenDiv = document.createElement('div');
                let takenB = document.createElement('button');
                let takenP = document.createElement('p');
                takenDiv.setAttribute("class", "notification is-danger");
                takenDiv.setAttribute("id", "takenDiv")
                takenB.setAttribute("class", "delete");
                takenB.setAttribute("id", "takenUserButton")
                takenB.onclick = () => {
                    document.getElementById('takenDiv').remove();
                }
                takenP.setAttribute("id", "takenUser");
                takenP.appendChild(document.createTextNode("Username taken"));
                takenDiv.append(takenB, takenP)
                document.getElementById('signupForm').append(takenDiv);
                return false
            }
        }
        return response
    }
  
    return (<a id="signupSubmitLink" href="#" onClick={handleClick}>Submit</a>);
}

export default function Signup() {
    return(
        <div id="signupForm">
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
