
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
var charCount = 4;
var player = "";
var opponent = "";
// variable holding the player's current damage output
var damage = 0;

// Will either want a reset function here
// or build it into reset button at the end

// Function that checks if a character has died
// if hp is 0 or negative, sets hp to 0

function restartGame() {
  pickPC = false;
  pickNPC = false;
  charCount = 4;
  player = "";
  opponent = "";
  damage = 0;
  kenobi = { name: "Ben Kenobi", hp: 90, atk: 8, counterAtk: 5, alive: true, avail: true };
  fett = { name: "Boba Fett", hp: 110, atk: 12, counterAtk: 20, alive: true, avail: true };
  vader = { name: "Darth Vader", hp: 130, atk: 14, counterAtk: 25, alive: true, avail: true };
  maul = { name: "Darth Maul", hp: 100, atk: 10, counterAtk: 10, alive: true, avail: true };
  $(".game").removeClass("selected dead kenobi-bg fett-bg vader-bg maul-bg")
  $(".select").removeClass("selected");
  // $("#combat-text").empty();
  $(".game-text").empty();
  $("#restart").hide();
}

function win() {
  if (charCount === 0)  {
    $("#combat-text").append(`<div>Congratulations!! You have won!</div>`);
    $("#restart").show();
  }
  else {
    return false;
  }
}

function charHP() {
  if (player.hp <= 0) {
    player.hp = 0;
    console.log(`${player.name} has died`)
    $("#combat-text").append(`<div>You have been slain by ${opponent.name}!</div>`);
    $("#player-window").addClass("dead");
    $("#attack").hide();
    $("#restart").show();
  }
  else if (opponent.hp <= 0) {
    opponent.hp = 0;
    console.log(`${opponent.name} has died`)
    $("#combat-text").append(`<div>You have slain ${opponent.name}!</div>`);
    charCount--;
    pickNPC = false;
    $("#opponent-window").removeClass("character-bg");
    $("#opponent-text").empty();
    $("#attack").hide();
  }
  win();
}

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
      // Places Kenobi background in player window
      $("#kenobi").addClass("selected");
      $("#player-window").addClass("character-bg kenobi-bg");
    }
    else if (character === "fett") {
      player = fett;
      fett.avail = false;
      $("#fett").addClass("selected");
      $("#player-window").addClass("character-bg fett-bg");
    }
    else if (character === "vader") {
      player = vader;
      vader.avail = false;
      $("#vader").addClass("selected");
      $("#player-window").addClass("character-bg vader-bg");
    }
    else if (character === "maul") {
      player = maul;
      maul.avail = false;
      $("#maul").addClass("selected");
      $("#player-window").addClass("character-bg maul-bg");
    }
    pickPC = true;
    charCount--;
    console.log(`Player:`);
    console.log(player);
    $("#player-text").text(player.name);
    
  }  

  // If player chose a character, and hasn't chosen NPC, assign character to NPC
  else if (pickPC && !pickNPC ) {
    if (character === "kenobi" && kenobi.avail) {
      opponent = kenobi;
      kenobi.avail = false;
      pickNPC = true;
      $("#kenobi").addClass("selected")
      $("#opponent-window").addClass("character-bg kenobi-bg")
    }
    else if (character === "fett" && fett.avail) {
      opponent = fett;
      fett.avail = false;
      pickNPC = true;
      // Gives Fett window selected attribute, greying it out
      // Places Fett background in the opponent window
      $("#fett").addClass("selected")
      $("#opponent-window").addClass("character-bg fett-bg")
    }
    else if (character === "vader" && vader.avail) {
      opponent = vader;
      vader.avail = false;
      pickNPC = true;
      $("#vader").addClass("selected")
      $("#opponent-window").addClass("character-bg vader-bg")
    }
    else if (character === "maul" && maul.avail) {
      opponent = maul;
      maul.avail = false;
      pickNPC = true;
      $("#maul").addClass("selected")
      $("#opponent-window").addClass("character-bg maul-bg")
    }
    console.log(`Opponent:`)
    console.log(opponent);
    $("#opponent-text").text(opponent.name);
    $("#attack").show();
  }

  // if (pickPC && pickNPC) {
    
  // }

});

$("#attack").on("click", function() {
  if (player.hp > 0 && opponent.hp > 0) {
    
    if (damage < opponent.hp || opponent.counterAtk < player.hp) {
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

$("#restart").on("click", function() {
  restartGame();  
});


// });
