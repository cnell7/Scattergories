# [Scattergories](https://scattergories-app.herokuapp.com/ "Scattergories")  
# Development Mode   

## Installation

Clone the repository. Then, run **npm install** in both the Scattergories directory and the client directory.

## Front End  
```npm run watch```   
Run in client folder. Builds front end and watches for changes. Automatically re-builds upon saving.  

### Pages

#### Home
Includes two buttons to start or join a Scattergories game. Also includes rules and information about how to play.
#### Stats
A new feature that allows users to see how many total games they have won.
#### Game
Where Scattergories is played. Displays Letter on the left along with time remaining, and a play button if you are host. Underneath that, all user's stats are displayed.
In the middle of the screen you have all of the categories to go along with the letter. You input your answers there and they will automatically be collected when the time is up. Under the categories is round recap. There players vote on answers that are good and bad.
To the right at the top is the game ID. This is what user's use to join the game. Under it in the current remaining rounds, and players/score.
#### Login
Allows players to sign-in to their account. Displays warning when player inputs bad request.
#### Signup
Allows players to create an account to play. Displays warning when player inputs bad request.
#### Settings
Allows players to change password and delete account.
## Back End   
```bash   
nodemon server   
```   
Run in the scattergories directory. This will start the back end and watch for any changes so you won't have to restart it.

### Server
Handles sockets and GameManager.
### Engine
#### Game
Holds logic for game including information about the players and what state it is in.
#### GameManager
Holds all current games that are going on at any given moment.

## URLs  
In the services folder, there are several Axios requests. In development mode, you will be sending these to localhost. In production mode, they will need to be changed to the server location. 

# Production Mode 
## Heroku
This app is deployed on heroku. A Procfile is included to build and deploy the app.
