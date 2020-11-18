import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { requestSignup } from '../Services/SignupService.js'

function ActionLink() {
    function handleClick(e) {
        e.preventDefault();
        console.log('Sending signup request...');
        let u = document.getElementById('usernameInput').value;
        let p = document.getElementById('passwordInput').value;
        let response = requestSignup(u, p);
        console.log(response);
        if(!response){
            console.log('username taken')
            return
        }
        return response
    }
  
    return (<a href="#" onClick={handleClick}>Submit</a>);
}

export default function Signup() {
    return(
        <div>
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
