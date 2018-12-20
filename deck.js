/* All individual perk data is stored in the checkboxes in the template files
these functions just manipulate the data and display it
*/
//Starting deck of cards
var charDeck = [
  "+0",
  "+0",
  "+0",
  "+0",
  "+0",
  "+0",
  "-1",
  "-1",
  "-1",
  "-1",
  "-1",
  "+1",
  "+1",
  "+1",
  "+1",
  "+1",
  "+2",
  "-2",
  "Miss",
  "x2"
];
//Cards go here after they are drawn
var discard = [];
//An array of the unique card values in charDeck
var possiblecards = charDeck.filter(uniqueArray);
var numOfRollingCards = 0;
var RollingCardsInDeck = 0;

//Resets to the defaults, maybe I should put the above here and call it on the page load
function reset() {
  charDeck = [
    "+0",
    "+0",
    "+0",
    "+0",
    "+0",
    "+0",
    "-1",
    "-1",
    "-1",
    "-1",
    "-1",
    "+1",
    "+1",
    "+1",
    "+1",
    "+1",
    "+2",
    "-2",
    "Miss",
    "x2"
  ];
  discard = [];
  document.getElementById("cardFront").src = "img/Blank.png";
  document.getElementById("cardBack").src = "img/Back.png";
  numOfRollingCards = 0;
  RollingCardsInDeck = 0;

  calculatePercents();
  document.getElementById("modifieraverage").innerHTML =
    "Average Modifier: " + calculateAverageModifier();
}

function loadCharacterPerks(character) {
  reset();
  $("#perks").load("templates/" + character + ".html");
}

function chance(deck, card) {
  let count = 0;

  for (var i = 0; i < deck.length; ++i) {
    if (deck[i] == card) count++;
  }
  if (charDeck.length >= 1) {
    return Math.floor(count * (100 / charDeck.length) * 1000) / 1000;
  } else {
    document.getElementById("cardBack").src = "";
    return 0;
  }
}

function draw() {
  if (charDeck.length >= 1) {
    let card = Math.floor(Math.random() * charDeck.length);
    document.getElementById("cardFront").src = "img/" + charDeck[card] + ".png";
    if (charDeck[card] == "Bless") {
      let cardIndex = charDeck.indexOf(charDeck[card]);
      charDeck.splice(cardIndex, 1);
    } else if (charDeck[card] == "Curse") {
      let cardIndex = charDeck.indexOf(charDeck[card]);
      charDeck.splice(cardIndex, 1);
    } else {
      discard.push(charDeck[card]);
      if (charDeck[card].includes("Rolling")) {
        RollingCardsInDeck -= 1;
      }

      let cardIndex = charDeck.indexOf(charDeck[card]);
      charDeck.splice(cardIndex, 1);
    }

    calculatePercents();
    if (charDeck.length == 0) {
      document.getElementById("cardBack").src = "img/Blank.png";
    }
  }
}

function shuffle() {
  charDeck = charDeck.concat(discard);
  document.getElementById("cardBack").src = "img/Back.png";
  document.getElementById("cardFront").src = "img/Blank.png";
  discard = [];
  RollingCardsInDeck = numOfRollingCards;
  //Maybe add an actual shuffling algorithm here
  //Not really needed since I pick cards at random?

  calculatePercents();
  document.getElementById("modifieraverage").innerHTML =
    "Average Modifier: " + calculateAverageModifier();
}

function addBless() {
  let count = 0;

  for (var i = 0; i < charDeck.length; ++i) {
    if (charDeck[i] == "Bless") count++;
  }
  if (count < 10) {
    charDeck.push("Bless");
    calculatePercents();
    document.getElementById("modifieraverage").innerHTML =
      "Average Modifier: " + calculateAverageModifier();
  }
}

function addCurse() {
  let count = 0;

  for (var i = 0; i < charDeck.length; ++i) {
    if (charDeck[i] == "Curse") count++;
  }
  if (count < 10) {
    charDeck.push("Curse");
    calculatePercents();
    document.getElementById("modifieraverage").innerHTML =
      "Average Modifier: " + calculateAverageModifier();
  }
}

function uniqueArray(value, index, self) {
  return self.indexOf(value) === index;
}

function updatePossibleCards() {
  possiblecards = charDeck.filter(uniqueArray);
  possiblecards.sort();
}

/**
 * This makes the unordered list which has the card names
 * and percentage chance
 * It should get passed the unique array of possible cards
 * @param {*} array
 */
function makeList(array) {
  var list = document.createElement("ul");

  for (var i = 0; i < array.length; i++) {
    var item = document.createElement("li");

    item.appendChild(
      document.createTextNode(
        array[i] +
          "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
          chance(charDeck, array[i]) +
          " %"
      )
    );

    list.appendChild(item);
  }
  return list;
  //TODO it would be nice to add images to this to match the perks but
  // I'd have to change the way I go about making it
}

function calculatePercents() {
  updatePossibleCards();
  document.getElementById("percentChance").innerHTML = "";
  document.getElementById("percentChance").appendChild(makeList(possiblecards));
  document.getElementById("decktotal").innerHTML =
    "Cards in Deck: " +
    charDeck.length +
    " / " +
    (charDeck.length + discard.length);

  document.getElementById("modifieraverage").innerHTML =
    "Average Modifier: " + calculateAverageModifier();

  document.getElementById("advantage").innerHTML =
    "Average with Advantage: " + calculateAdvantage();

  document.getElementById("disadvantage").innerHTML =
    "Average with Disadvantage: " + calculateDisadvantage();
}

function calculateAverageModifier() {
  let total = 0;
  charDeck.forEach(element => {
    thisNum = parseInt(element);
    if (isNaN(thisNum) == false) {
      total += thisNum;
    }
    if (element == "Bless") {
      total += 2;
    }
    if (element == "Curse") {
      total -= 2;
    }
    if (element == "x2") {
      total += 2;
    }
    if (element == "Miss") {
      total -= 2;
    }
  });

  let avg = total / (charDeck.length - RollingCardsInDeck);
  avg = Math.floor(avg * 1000) / 1000;

  if (isNaN(avg)) {
    avg = "";
  }

  return avg;
}

function calculateAdvantage() {
  let total = 0;
  let totcards = 0;
  let deckCopy = charDeck;
  let drawnCards = [];

  // make I should clone charDeck so I can remove the cards as I put them into drawnCards

  for (i = 0; i < deckCopy.length; i++) {
    drawnCards.push(deckCopy[i]);

    for (j = 0; j < deckCopy.length; j++) {
      drawnCards.push(deckCopy[j]);
      console.log("Drawn Cards: " + drawnCards);

      if (
        drawnCards[0].includes("Rolling") &&
        drawnCards[1].includes("Rolling")
      ) {
        console.log("They're Both Rolling!");
      } else if (
        deckCopy[0].includes("Rolling") ||
        deckCopy[1].includes("Rolling")
      ) {
        console.log("Only One Rolling!");
      } else {
        deckCopy.forEach(element => {
          parseInt(element);

          console.log(
            "This is the total!: " + drawnCards.length //.reduce((a, b) => a + b, 0)
          );
          return;
        });
      }

      //so the card won't get compared against itself
      // if (i !== j) {
      //   if (charDeck[j] == "Bless") {
      //     thisNum2 = 2;
      //   }
      //   if (charDeck[j] == "Curse") {
      //     thisNum2 = -2;
      //   }
      //   if (charDeck[j] == "x2") {
      //     thisNum2 = 2;
      //   }
      //   if (charDeck[j] == "Miss") {
      //     thisNum2 = -2;
      //   }

      //thisNum && thisnum2 contain Rolling
      //call loopAgain()  should loopAgain be where it checks and keep calling itself?
      //else if one of the two contains Rolling add their numbers together
      //but need to be able to add in all of them
      //else just pick the highest

      // if (thisNum > thisNum2) {
      //   total += thisNum;
      // } else {
      //   total += thisNum2;
      // }

      //totcards += 1;
      //}
    }
  }

  function loopAgain() {
    for (k = 0; k < charDeck.length; k++) {
      thisNum2 = parseInt(charDeck[k]);

      //so the card won't get compared against itself
      if (k !== j /*Array of every card drawn so far*/) {
        if (charDeck[k] == "Bless") {
          thisNum2 = 2;
        }
        if (charDeck[k] == "Curse") {
          thisNum2 = -2;
        }
        if (charDeck[k] == "x2") {
          thisNum2 = 2;
        }
        if (charDeck[k] == "Miss") {
          thisNum2 = -2;
        }

        //if the card it drew this loop is rolling add it to the array and loop again
        //then I will return the array and add it all together
        if (thisNum > thisNum2) {
          total += thisNum;
        } else {
          total += thisNum2;
        }
      }
    }
  }

  let avg = total / totcards;
  avg = Math.floor(avg * 1000) / 1000;

  if (isNaN(avg)) {
    avg = "";
  }

  return avg;
}

function calculateDisadvantage() {
  let total = 0;
  let totcards = 0;
  for (i = 0; i < charDeck.length; i++) {
    if (charDeck[i].includes("Rolling")) {
      continue;
    }

    thisNum = parseInt(charDeck[i]);

    //convert the nonnumerical cards tht parseInt doesn't
    if (charDeck[i] == "Bless") {
      thisNum = 2;
    }
    if (charDeck[i] == "Curse") {
      thisNum = -2;
    }
    if (charDeck[i] == "x2") {
      thisNum = 2;
    }
    if (charDeck[i] == "Miss") {
      thisNum = -2;
    }

    for (j = 0; j < charDeck.length; j++) {
      if (charDeck[j].includes("Rolling")) {
        continue;
      }

      thisNum2 = parseInt(charDeck[j]);

      //so the card won't get compared against itself
      if (i !== j) {
        if (charDeck[j] == "Bless") {
          thisNum2 = 2;
        }
        if (charDeck[j] == "Curse") {
          thisNum2 = -2;
        }
        if (charDeck[j] == "x2") {
          thisNum2 = 2;
        }
        if (charDeck[j] == "Miss") {
          thisNum2 = -2;
        }

        if (thisNum < thisNum2) {
          total += thisNum;
        } else {
          total += thisNum2;
        }

        totcards += 1;
      }
    }
  }
  let avg = total / totcards;
  avg = Math.floor(avg * 1000) / 1000;

  if (isNaN(avg)) {
    avg = "";
  }

  return avg;
}

/**
 * @param {object} thisPerk
 * Removes thisPerk.rcard from the deck
 * thisPerk.rnumber amount of times
 */
function remove(thisPerk) {
  if (thisPerk.checked == true) {
    for (let i = 0; i < thisPerk.dataset.rnumber; i++) {
      if (charDeck.includes(thisPerk.dataset.rcard)) {
        let remove = charDeck.indexOf(thisPerk.dataset.rcard);
        charDeck.splice(remove, 1);
      }
    }
  }
  if (thisPerk.checked == false) {
    for (let i = 0; i < thisPerk.dataset.rnumber; i++) {
      charDeck.push(thisPerk.dataset.rcard);
    }
  }
  calculatePercents();
  document.getElementById("modifieraverage").innerHTML =
    "Average Modifier: " + calculateAverageModifier();
}

/**
 * @param {object} thisPerk
 * Adds thisPerk.addcard to the deck
 * thisPerk.addnumber amount of times
 */
function add(thisPerk) {
  if (thisPerk.checked == true) {
    for (let i = 0; i < thisPerk.dataset.addnumber; i++) {
      charDeck.push(thisPerk.dataset.addcard);
      if (thisPerk.dataset.isrolling == "true") {
        numOfRollingCards += 1;
        RollingCardsInDeck += 1;
      }
    }
  }
  if (thisPerk.checked == false) {
    for (let i = 0; i < thisPerk.dataset.addnumber; i++) {
      if (charDeck.includes(thisPerk.dataset.addcard)) {
        let remove = charDeck.indexOf(thisPerk.dataset.addcard);
        charDeck.splice(remove, 1);
      }
      if (thisPerk.dataset.isrolling == "true") {
        numOfRollingCards -= 1;
        RollingCardsInDeck -= 1;
      }
    }
  }
  calculatePercents();
  document.getElementById("modifieraverage").innerHTML =
    "Average Modifier: " + calculateAverageModifier();
}

function replace(thisPerk) {
  add(thisPerk);
  remove(thisPerk);
}

/* These four functions are for the perks that add more than one type of card,
so they won't work with the above functions */

function addOneRollingEarthAir(thisPerk) {
  if (thisPerk.checked == true) {
    charDeck.push("+0 Earth Rolling", "+0 Air Rolling");
    numOfRollingCards += 2;
  }
  if (thisPerk.checked == false) {
    if (charDeck.includes("+0 Earth Rolling")) {
      let remove = charDeck.indexOf("+0 Earth Rolling");
      charDeck.splice(remove, 1);
      numOfRollingCards -= 1;
    }
  }
  if (thisPerk.checked == false) {
    if (charDeck.includes("+0 Air Rolling")) {
      let remove = charDeck.indexOf("+0 Air Rolling");
      charDeck.splice(remove, 1);
      numOfRollingCards -= 1;
    }
  }
  calculatePercents();
  document.getElementById("modifieraverage").innerHTML =
    "Average Modifier: " + calculateAverageModifier();
}

function addOneRollingLightDark(thisPerk) {
  if (thisPerk.checked == true) {
    charDeck.push("+0 Light Rolling", "+0 Dark Rolling");
    numOfRollingCards += 2;
  }
  if (thisPerk.checked == false) {
    if (charDeck.includes("+0 Light Rolling")) {
      let remove = charDeck.indexOf("+0 Light Rolling");
      charDeck.splice(remove, 1);
      numOfRollingCards -= 1;
    }
  }
  if (thisPerk.checked == false) {
    if (charDeck.includes("+0 Dark Rolling")) {
      let remove = charDeck.indexOf("+0 Dark Rolling");
      charDeck.splice(remove, 1);
      numOfRollingCards -= 1;
    }
  }
  calculatePercents();
  document.getElementById("modifieraverage").innerHTML =
    "Average Modifier: " + calculateAverageModifier();
}

function addRollingDisarmMuddle(thisPerk) {
  if (thisPerk.checked == true) {
    charDeck.push("+0 Disarm Rolling", "+0 Muddle Rolling");
    numOfRollingCards += 2;
  }
  if (thisPerk.checked == false) {
    if (charDeck.includes("+0 Disarm Rolling")) {
      let remove = charDeck.indexOf("+0 Disarm Rolling");
      charDeck.splice(remove, 1);
      numOfRollingCards -= 1;
    }
  }
  if (thisPerk.checked == false) {
    if (charDeck.includes("+0 Muddle Rolling")) {
      let remove = charDeck.indexOf("+0 Muddle Rolling");
      charDeck.splice(remove, 1);
      numOfRollingCards -= 1;
    }
  }
  calculatePercents();
  document.getElementById("modifieraverage").innerHTML =
    "Average Modifier: " + calculateAverageModifier();
}

function addOne2AndTwo2s(thisPerk) {
  if (thisPerk.checked == true) {
    charDeck.push("+2", "+2", "-2");
  }

  if (thisPerk.checked == false) {
    for (let i = 0; i < 2; i++) {
      if (charDeck.includes("+2")) {
        let remove = charDeck.indexOf("+2");
        charDeck.splice(remove, 1);
      }
    }
    if (charDeck.includes("-2")) {
      let remove = charDeck.indexOf("12");
      charDeck.splice(remove, 1);
    }
  }
  calculatePercents();
  document.getElementById("modifieraverage").innerHTML =
    "Average Modifier: " + calculateAverageModifier();
}

//So they will be there when the page loads
calculatePercents();
