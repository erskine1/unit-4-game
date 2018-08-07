$(document).ready(function() { 

// CHARACTER OBJECTS

var exar = { name: "Exar Kun", hp: 130, atk: 6, counterAtk: 14, alive: true, avail: true };
var nomi = { name: "Nomi Sunrider", hp: 110, atk: 8, counterAtk: 12, alive: true, avail: true };
var vader = { name: "Darth Vader", hp: 120, atk: 7, counterAtk: 11, alive: true, avail: true };
var katarn = { name: "Kyle Katarn", hp: 100, atk: 9, counterAtk: 10, alive: true, avail: true };


// GAME STATE VARIABLES
var pickPC = false;
var pickNPC = false;
var charCount = 4;
var player = "";
var opponent = "";
var damage = 0;


// SOUNDS
var death = new Audio(src="assets/sounds/gl-4.mp3");
var victory = new Audio(src="assets/sounds/victory.wav");
victory.volume = 0.4;


// FUNCTIONS

function restartGame() {
  pickPC = false;
  pickNPC = false;
  charCount = 4;
  player = "";
  opponent = "";
  damage = 0;
  exar = { name: "Exar Kun", hp: 130, atk: 6, counterAtk: 16, alive: true, avail: true };
  nomi = { name: "Nomi Sunrider", hp: 110, atk: 8, counterAtk: 12, alive: true, avail: true };
  vader = { name: "Darth Vader", hp: 120, atk: 7, counterAtk: 14, alive: true, avail: true };
  katarn = { name: "Kyle Katarn", hp: 100, atk: 9, counterAtk: 10, alive: true, avail: true };
  $(".game").removeClass("selected dead exar-bg nomi-bg vader-bg katarn-bg")
  $(".select").removeClass("selected");
  $(".game-text").empty();
  $("#restart").hide().text("restart");
  $("#message").text("select your character.")
  death.load();
  victory.load();
}

function win() {
  if (charCount === 0)  {
    $("#message").empty();
    $("#combat-text").append(`<div>Congratulations!! You have won!</div>`);
    $("#restart").show().text("play again");
    victory.play();
    pickNPC = true;
  }
  else {
    return false;
  }
}

function charHP() {
  if (player.hp <= 0) {
    player.hp = 0;
    death.play();

    $("#combat-text").append(`<div>You have been slain by ${opponent.name}!</div>`);
    $("#player-window").addClass("dead");
    $("#attack").hide();
    $("#restart").show();
  }
  else if (opponent.hp <= 0) {
    opponent.hp = 0;

    $("#combat-text").append(`<div>You have slain ${opponent.name}!</div>`);
    charCount--;
    pickNPC = false;
    $("#opponent-window").addClass("dead");
    $("#attack").hide();
    $("#message").text("select a new opponent.")
  }
  win();
}

function newValues() {
  $("#pcHP").text(`HP: ${player.hp}`);
  $("#newATK").text(`ATK: ${damage + player.atk}`);
  $("#npcHP").text(`HP: ${opponent.hp}`);
}


// PLAYER + NPC SELECTION EVENT HANDLER

$(".character").on("click", function() {
  character = this.id;

  // PLAYER SELECTION
  if (!pickPC) {
    if (character === "exar") {
      player = exar;
      exar.avail = false;
      $("#exar").addClass("selected");
      $("#player-window").addClass("character-bg exar-bg");
    }
    else if (character === "nomi") {
      player = nomi;
      nomi.avail = false;
      $("#nomi").addClass("selected");
      $("#player-window").addClass("character-bg nomi-bg");
    }
    else if (character === "vader") {
      player = vader;
      vader.avail = false;
      $("#vader").addClass("selected");
      $("#player-window").addClass("character-bg vader-bg");
    }
    else if (character === "katarn") {
      player = katarn;
      katarn.avail = false;
      $("#katarn").addClass("selected");
      $("#player-window").addClass("character-bg katarn-bg");
    }

    pickPC = true;
    charCount--;
    $("#player-text").append(`<div>Player: ${player.name}</div>`);
    $("#player-text").append(`<div id="pcHP">HP: ${player.hp}</div>`);
    $("#player-text").append(`<div id="newATK">ATK: ${player.atk}</div>`);
    $("#message").text("select an opponent.")
  }  


  // NPC SELECTION
  else if (pickPC && !pickNPC ) {

    $("#opponent-window").removeClass("character-bg dead exar-bg nomi-bg vader-bg katarn-bg");
    $("#opponent-text").empty();
    
    if (character === "exar" && exar.avail) {
      opponent = exar;
      exar.avail = false;
      pickNPC = true;
      $("#exar").addClass("selected")
      $("#opponent-window").addClass("character-bg exar-bg")
    }
    else if (character === "nomi" && nomi.avail) {
      opponent = nomi;
      nomi.avail = false;
      pickNPC = true;
      $("#nomi").addClass("selected")
      $("#opponent-window").addClass("character-bg nomi-bg")
    }
    else if (character === "vader" && vader.avail) {
      opponent = vader;
      vader.avail = false;
      pickNPC = true;
      $("#vader").addClass("selected")
      $("#opponent-window").addClass("character-bg vader-bg")
    }
    else if (character === "katarn" && katarn.avail) {
      opponent = katarn;
      katarn.avail = false;
      pickNPC = true;
      $("#katarn").addClass("selected")
      $("#opponent-window").addClass("character-bg katarn-bg")
    }
    

    if (pickNPC) {
      $("#opponent-text").append(`<div>Opponent: ${opponent.name}</div>`);
      $("#opponent-text").append(`<div id="npcHP">HP: ${opponent.hp}</div>`)
      $("#opponent-text").append(`<div>ATK: ${opponent.counterAtk}</div>`)
      $("#message").empty();
      $("#attack").show();
    }
  }

});

$("#attack").on("click", function() {
  if (player.hp > 0 && opponent.hp > 0) {
    var totalDamage = damage + player.atk;

    if (totalDamage < opponent.hp || opponent.counterAtk < player.hp) {
      damage += player.atk; 
      $("#combat-text").append(`<div class="yellow-text">You attack ${opponent.name} for ${damage} points of damage!</div>`);
      $("#combat-text").append(`<div class="red-text">${opponent.name} attacks YOU for ${opponent.counterAtk} points of damage!</div>`);
    }
    else if (totalDamage >= opponent.hp && opponent.counterAtk >= player.hp) {
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
    newValues();
  }
  
  
});

$("#restart").on("click", function() {
  restartGame();  
});


});
