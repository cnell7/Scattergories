import React from 'react';
import history from '../history.js'
import '../App.css';
import { requestLogin } from '../Services/LoginService.js'

export class ActionLink extends React.Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }
    async handleClick(e) {
        e.preventDefault();
        console.log('Sending login request...');
        let u = document.getElementById('usernameInput').value;
        let p = document.getElementById('passwordInput').value;
        if(u.length == 0 || p.length == 0){
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
                emptyP.appendChild(document.createTextNode("Empty username or password."));
                emptyDiv.append(emptyB, emptyP)
                document.getElementById('signupForm').append(emptyDiv);
            }
            return false
        }
        let response = await requestLogin(u, p);
        if(!response){
            if(!document.getElementById('unauthorizedDiv')){
                let unauthDiv = document.createElement('div');
                let unauthB = document.createElement('button');
                let unauthP = document.createElement('p');
                unauthDiv.setAttribute("class", "notification is-danger");
                unauthDiv.setAttribute("id", "unauthorizedDiv")
                unauthB.setAttribute("class", "delete");
                unauthB.setAttribute("id", "unauthorizedButton")
                unauthB.onclick = () => {
                    unauthDiv.remove();
                }
                unauthP.setAttribute("id", "unauthorized");
                unauthP.appendChild(document.createTextNode("Incorrect username or password."));
                unauthDiv.append(unauthB, unauthP)
                document.getElementById('loginForm').append(unauthDiv);
            }
            return false
        }
        if(!(document.getElementById('usernameDisplay').innerHTML.length > 0))
            document.getElementById('usernameDisplay').innerHTML += 'Hello, ' + u + '.';
        this.props.state.switchState();
        sessionStorage.setItem('user', u);
        history.push('/home');
        return response
    }
    
    render(){return (
        <buttton class='button is-black mt-4' onClick={this.handleClick}>
            <strong class="content is-bold has-text-danger">Submit</strong>
        </buttton>);}
}

export default class Login extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
    return(
        <div class="section">
            <h1 class="title is-2 has-text-centered">Login</h1>
            <div class="container is-max-desktop">
                <div class="box has-text-centered">
                    <div id="loginForm">
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
                            <ActionLink state = {{
                            switchState: this.props.state.switchState
                            }}/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );}
};