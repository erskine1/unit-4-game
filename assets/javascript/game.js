
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

// Will either want a reset function here
// or build it into reset button at the end

// PLAYER + OPPONENT EVENT HANDLER
$(".character").on("click", function() {
  character = this.id; // Determine which character was clicked
  // console.log("You clicked on " + character);

  // If player hasn't chosen a character yet, assign the character clicked
  if (!pickPC) {
    if (character === "kenobi") {
      player = kenobi;
      kenobi.avail = false;
    }
    else if (character === "fett") {
      player = fett;
      fett.avail = false;
    }
    else if (character === "vader") {
      player = vader;
      vader.avail = false;
    }
    else if (character === "maul") {
      player = maul;
      maul.avail = false;
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
    }
    else if (character === "fett" && fett.avail) {
      opponent = fett;
      fett.avail = false;
      pickNPC = true;
    }
    else if (character === "vader" && vader.avail) {
      opponent = vader;
      vader.avail = false;
      pickNPC = true;
    }
    else if (character === "maul" && maul.avail) {
      opponent = maul;
      maul.avail = false;
      pickNPC = true;
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
    
  }
});


// });
