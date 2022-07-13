const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let cardCounter = 0;
let card1, card2 = undefined;

// Fisher Yates shuffle function
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  // Prevent player from quickly picking many cards
  if (card1 && card2) {
    return
  }

  cardCounter += 1
  let card = event.target

  // Change background color of card
  card.style.backgroundColor = card.className

  // Get identities of card1 and card2
  cardCounter === 1 ? card1 = card : card2 = card

    // Make sure card1 !== card2
    if (card1 === card2){
      cardCounter = 1;
      card2 = undefined;
      return
    }

    if (card1 && card2){
      // Make sure you can't select more cards

      // If cards match, keep them facing up
      if (card1.className === card2.className){
        resetCards()
      }
      // If cards don't match, flip them back over
      else {
        setTimeout(function () {
          card1.style.removeProperty('background-color')
          card2.style.removeProperty('background-color')
          resetCards()
      }, 1000)
      }
    }
  }

// Reset variables between every two picks
function resetCards() {
  cardCounter = 0;
  card1, card2 = undefined;
}

// Restart button
restartBtn = document.querySelector('button')
restartBtn.addEventListener('click', function (){
  gameContainer.innerHTML = '';
  createDivsForColors(shuffledColors)
})

createDivsForColors(shuffledColors);


