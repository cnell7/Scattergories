import React from 'react';
import '../App.css';
import { requestSignup } from '../Services/SignupService.js'

function ActionLink() {
    async function handleClick(e) {
        e.preventDefault();
        console.log('Sending signup request...');
        let u = document.getElementById('usernameInput').value;
        let p = document.getElementById('passwordInput').value;
        if(u.length == 0 || p.length == 0 || u.length > 12 || p.length > 18){
            if(!document.getElementById('emptyUserDiv')){
                let emptyDiv = document.createElement('div');
                let emptyB = document.createElement('button');
                let emptyP = document.createElement('p');
                emptyDiv.setAttribute("class", "notification is-danger");
                emptyDiv.setAttribute("id", "emptyUserDiv")
                emptyB.setAttribute("class", "delete");
                emptyB.setAttribute("id", "emptyUserButton")
                emptyB.onclick = () => {
                    document.getElementById('emptyUserDiv').remove();
                }
                emptyP.setAttribute("id", "emptyUser");
                emptyP.appendChild(document.createTextNode("Username must be between 1 and 12 characters. Password must be between 1 and 18 characters."));
                emptyDiv.append(emptyB, emptyP)
                document.getElementById('signupForm').append(emptyDiv);
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
                takenP.appendChild(document.createTextNode("Username taken."));
                takenDiv.append(takenB, takenP)
                document.getElementById('signupForm').append(takenDiv);
                return false
            }
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
            goodP.appendChild(document.createTextNode("Success! You've created an account. Login to play."));
            goodDiv.append(goodB, goodP)
            document.getElementById('signupForm').append(goodDiv);
        }
        return response
    }
  
    return (
        <button class='button is-black mt-4' onClick={handleClick}>
            <strong class="content is-bold has-text-danger">Submit</strong>
        </button>);
}

export default function Signup() {
    return(
        <div class='section'>
            <h1 class="title is-2 has-text-centered">Signup</h1>
            <div class="container is-max-desktop">
                <div class="box has-text-centered">
                    <div id="signupForm">
                        <div class="field">
                            <p class="control">
                                <input id="usernameInput" class="input has-text-centered" type="username" placeholder="Username"></input>
                            </p>
                            </div>
                        <div class="field">
                            <p class="control">
                                <input id="passwordInput" class="input has-text-centered" type="password" placeholder="Password"></input>
                            </p>
                        </div>
                    </div>
                    <div class="container">
                        <p class="control has-text-centered">
                            <ActionLink />
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};
