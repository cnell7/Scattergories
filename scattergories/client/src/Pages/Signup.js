import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { requestSignup } from '../Services/SignupService.js'

function ActionLink() {
    function handleClick(e) {
      e.preventDefault();
      console.log('Sending signup request...');
      return requestSignup("test", "123");
    }
  
    return (
      <a href="#" onClick={handleClick}>
        Click me
      </a>
    );
}

export default function Signup() {
    return(
        <div>
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="emailInput" type="email" placeholder="Email"></input>
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
                    <input class="passwordInput" type="password" placeholder="Password"></input>
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
