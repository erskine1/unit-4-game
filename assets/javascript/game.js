
// $(document).ready(function() { 

// CHARACTER OBJECTS

var kenobi = {
  name: "Ben Kenobi",
  hp: 90,
  atk: 8,
  counterAtk: 5,
  alive: true,
  avail: true
};

var fett = {
  name: "Boba Fett",
  hp: 110,
  atk: 12,
  counterAtk: 20,
  alive: true,
  avail: true
};

var vader = {
  name: "Darth Vader",
  hp: 130,
  atk: 14,
  counterAtk: 25,
  alive: true,
  avail: true
};

var maul = {
  name: "Darth Maul",
  hp: 100,
  atk: 10,
  counterAtk: 10,
  alive: true,
  avail: true
};

// GAME STATE VARIABLES

// Default game state. No characters picked, player values unassigned
var pickPC = false;
var pickNPC = false;
var charCounter = 4;
var player = "";
var opponent = "";
// variable holding the player's current damage output
var damage = 0;

// Will either want a reset function here
// or build it into reset button at the end

// Function that checks if a character has died
// if hp is 0 or negative, sets hp to 0
function charHP() {
  if (player.hp <= 0 && opponent.hp <= 0) {
    
  }
  else if (player.hp <= 0) {
    player.hp = 0;
    console.log(`${player.name} has died`)
    $("#combat-text").append(`<div>You have been slain by ${opponent.name}!</div>`);
    $("#restart").show();
  }
  else if (opponent.hp <= 0) {
    opponent.hp = 0;
    console.log(`${opponent.name} has died`)
    $("#combat-text").append(`<div>You have slain ${opponent.name}!</div>`);
    var opponent = "";
    pickNPC = false;
    $("#opponent-window").attr("class", "character-bg")
    $("#opponent-window").empty();
  }
}

// function opponentHP() {
//   if (opponent.hp <= 0) {
//     opponent.hp = 0;
//     console.log(`${opponent.name} has died`)
//     $("#combat-text").append(`<div>You have slain ${opponent.name}!</div>`);
//   }
//   else {
//     console.log(`${opponent.name} is alive`)
//   }
// }


// PLAYER + OPPONENT EVENT HANDLER
$(".character").on("click", function() {
  character = this.id; // Determine which character was clicked
  // console.log("You clicked on " + character);

  // If player hasn't chosen a character yet, assign the character clicked
  if (!pickPC) {
    if (character === "kenobi") {
      player = kenobi;
      kenobi.avail = false;
      // Gives Kenobi window selected attribute, greying it out
      $("#kenobi").attr("class", "character selected")
      // Places Kenobi background in player window
      $("#player-window").attr("class", "character-bg kenobi-bg")
    }
    else if (character === "fett") {
      player = fett;
      fett.avail = false;
      $("#fett").attr("class", "character selected")
    }
    else if (character === "vader") {
      player = vader;
      vader.avail = false;
      $("#vader").attr("class", "character selected")
    }
    else if (character === "maul") {
      player = maul;
      maul.avail = false;
      $("#maul").attr("class", "character selected")
    }
    pickPC = true;

    console.log(`Player:`);
    console.log(player);
    $("#player-window").text(player.name);
    
  }  

  // If player chose a character, and hasn't chosen NPC, assign character to NPC
  else if (pickPC && !pickNPC ) {
    if (character === "kenobi" && kenobi.avail) {
      opponent = kenobi;
      kenobi.avail = false;
      pickNPC = true;
      $("#kenobi").attr("class", "character selected")
    }
    else if (character === "fett" && fett.avail) {
      opponent = fett;
      fett.avail = false;
      pickNPC = true;
      // Gives Fett window selected attribute, greying it out
      $("#fett").attr("class", "character selected")
      // Places Fett background in the opponent window
      $("#opponent-window").attr("class", "character-bg fett-bg")
    }
    else if (character === "vader" && vader.avail) {
      opponent = vader;
      vader.avail = false;
      pickNPC = true;
      $("#vader").attr("class", "character selected")
    }
    else if (character === "maul" && maul.avail) {
      opponent = maul;
      maul.avail = false;
      pickNPC = true;
      $("#maul").attr("class", "character selected")
    }
    console.log(`Opponent:`)
    console.log(opponent);
    $("#opponent-window").text(opponent.name);
    
  }

  if (pickPC && pickNPC) {
    $("#attack").show();
  }

});

$("#attack").on("click", function() {
  if (player.hp > 0 && opponent.hp > 0) {
    
    if (damage < opponent.hp && opponent.counterAtk < player.hp) {
      damage += player.atk; 
      $("#combat-text").append(`<div class="yellow-text">You attack ${opponent.name} for ${damage} points of damage!</div>`);
      $("#combat-text").append(`<div class="red-text">${opponent.name} attacks YOU for ${opponent.counterAtk} points of damage!</div>`);
    }
    else if (damage >= opponent.hp && opponent.counterAtk >= player.hp) {
      var magicDie = Math.floor(Math.random() * 20) + 1;
      if (magicDie > 10) {
        opponent.counterAtk = 0;
        damage += player.atk; 
        $("#combat-text").append(`<div class="yellow-text">You attack ${opponent.name} for ${damage} points of damage!</div>`);
        $("#combat-text").append(`<div class="red-text">${opponent.name} tries to attack YOU, but YOU dodge!</div>`);
      }  
      else {
        damage = 0; 
        $("#combat-text").append(`<div class="yellow-text">You try to attack ${opponent.name}, but ${opponent.name} dodges!</div>`);
        $("#combat-text").append(`<div class="red-text">${opponent.name} attacks YOU for ${opponent.counterAtk} points of damage!</div>`);
        
      }
    }
    opponent.hp -= damage;
    player.hp -= opponent.counterAtk;
    charHP();
    console.log(`Player HP is ${player.hp}`)
    console.log(`Opponent HP is ${opponent.hp}`)
  }

});


// });
