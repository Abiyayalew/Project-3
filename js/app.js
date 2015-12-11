 // Enemies our player must avoid
 var winsE = document.getElementById('wins');
 var bestE = document.getElementById('best');
 var gem = document.getElementById('img');
        
var Enemy = function(row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.row = row;
    this.x = 0;
    this.y = (83 * this.row)-20;
    this.speed = getRandomInt(200,300);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + this.speed * dt);
    if(this.x > 505 ){
       this.x = -200;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 202;
    this.y = 415;
    this.moveable = true;
    gamestate = false;
    this.sprite = 'images/char-boy.png'; 
    this.wins = 0;
    this.best = 0;
};

// update the palyer postion and it return true when player reach in water.
Player.prototype.update = function(dt) {
     if (this.wins === 8) {
        if(gamestate){
            gamestate =false;
        }
     }

   if(this.moveable) {
        this.x = 101 * this.col;
        this.y = 83 * this.row;
        
    }
    

    if(this.y < 83 && this.moveable) {
        this.moveable = false;
        return true;
    }
    return false; 
};

 //draw the palyer on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.wins === 8) {
        ctx.fillText('Game Over', 150, 345);
        
    }
};
// reset all player varibles 
Player.prototype.reset = function() {
    this.col = 2;                          
    this.row = 5;
    this.moveable = true;  
    
};
Player.prototype.Restart = function() {
     if (gamestate === false) {
         gamestate = ture;
         score();
     }
     
}


// Handle input from keyboard
Player.prototype.handleInput = function(key) {
    switch (key){
        case 'left':
            this.col--;
            break;
        case 'up':
            this.row--;
            break;
        case 'right':
            this.col++;
            break;
        case 'down':
            this.row++;
            break;
        case  'pause':
            if (gamestate) {
                gamestate = false;
            }
            else {
                gamestate = true;
            }
            break;
        case 'restart':
            this.Restart();
            break;
    }
    if(this.col < 0) this.col = 0;
    if(this.col > 4) this.col = 4;
    if(this.row < 0) this.row = 0;
    if(this.row > 5) this.row = 5;
};

// Change sprite property of palyer object using image selected by the user and start game
function playerimgselector() {
    var e = document.getElementById("player");
    player.sprite = e.options[e.selectedIndex].value;
    if (gamestate === false) {
        gamestate =true;
    }
}

// Return random integer number between min and max 
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/* This is called by updateEntities function to display score 
     */
function score() {
    winsE.innerHTML = player.wins;
    if(player.wins > player.best) {
        player.best = player.wins;
    }
    bestE.innerHTML = player.best;

    if (player.wins < 2) {
        removeGems(gem);
    }
    else{
        collectGems(gem);
    }

}
     // display gems on screen when palyer wins more than two in row
function collectGems(list){
    var image = new Image();
    switch (player.wins) {
        case 2:
            image.src  = "images/Gem Blue.png";
            break;
        case 4:
            image.src = "images/Gem Green.png";
            break;
        case 6:
            image.src = "images/Gem Orange.png";
            break;
        case 8:
            image.src = "images/Star.png";
            break;
        }
    list.appendChild(image);                 
}

// Remove gems from screen when  collision occurs 
function removeGems(list){
    while (list.hasChildNodes()) {   
        list.removeChild(list.firstChild);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for(var i = 1; i <= 3; i++){
    allEnemies.push(new Enemy(i));
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'pause',
        82: 'restart'
    };
    
    player.handleInput(allowedKeys[e.keyCode]);
});
