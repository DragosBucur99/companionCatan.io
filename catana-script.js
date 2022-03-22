// Creation of the board geometry ⬇

const firstRow = document.getElementById('first-row')
const secondRow = document.getElementById('second-row')
const thirdRow = document.getElementById('third-row')
const fourthRow = document.getElementById('fourth-row')
const fifthRow = document.getElementById('fifth-row')


function createDivs(row, numbersOfHex) {

    for (let i = 0; i < numbersOfHex; i++) {
        const divEl = document.createElement('div');
        divEl.classList.add('hexContainer');
        divEl.innerHTML = `
        <svg viewBox="0 0 328 378.74">
            <polygon
              points="326 282.9 326 95.84 164 2.31 2 95.84 2 282.9 164 376.43 326 282.9"
            />
      </svg>
      <div class = "textHex">
      <p class="text"></p>
      <span></span>
      </div>
      <div class="selections selection${i}">
      
      <ul class="list">

      <li class='fan'>Fan</li>
      <li class='oaie'>Oaie</li>
      <li class='lemne'>Lemne</li>
      <li class='argila'>Argila</li>
      <li class='piatra'>Piatra</li>
      <li class='desert'>Desert</li>
      
      
      </ul>

      </div>
        
        `
        row.appendChild(divEl);

    }
}

createDivs(firstRow, 3);
createDivs(secondRow, 4);
createDivs(thirdRow, 5);
createDivs(fourthRow, 4);
createDivs(fifthRow, 3);

// Algorithm for generating the random numbers ⬇
let playButton = document.querySelector(".play");
let text = document.querySelectorAll("p");
// let p = document.querySelectorAll('p');
let arrayOfPossibleNumbers = [12, 10, 6, 4, 8, 11, 5, 6, 11, 10, 8, 3, 9, 3, 4, 5, 2, 9]; // All the numbers in the board game
let x = [];

function removeNumber() {
    while (arrayOfPossibleNumbers.length > 0) { // We loop untill the initial array is reduced to 0 elements
    let randomNumber = arrayOfPossibleNumbers[Math.floor(Math.random() * arrayOfPossibleNumbers.length)]; // Picks a random number from the initial array
    x.push(randomNumber);
    let index = arrayOfPossibleNumbers.indexOf(randomNumber); // Finds the index of the random number selected
        if (index > -1) {
        arrayOfPossibleNumbers.splice(index, 1); // Deletes the random number from the initial array
        }
    }
  }

removeNumber();

// Pass the random numbers inside the hexes ⬇

function insertNumberInHex() {
      for (let i = 0; i < x.length; i++) {
        if (!text[i].classList.contains("desertSelection")) { // Don't insert a number in a "desert" hex.
          text[i].innerText = x[i];
        } else {
          text[18].innerText = x[i];
        }
      }
    
    }


// Show/Hide selection div ⬇

let containers = document.querySelectorAll(".hexContainer");
let selections = document.querySelectorAll(".selections");
for (let i = 0; i < 19; i ++) {
containers[i].addEventListener('click', () => {
selections[i].classList.toggle('showHide');
lineThrough('fan', 4, fan);
lineThrough('oaie', 4, oaie);
lineThrough('lemne', 4, lemne);
lineThrough('argila', 3, argila);
lineThrough('piatra', 3, piatra);
lineThrough('desert', 1, desert);
// Blur effect + Make so that you cannot have two selection divs on the screen at the same time:
  for (let x = 0; x < i; x++) {
    svg[x].classList.toggle('blur');
    containers[x].classList.toggle('pointerEvents')
  }
  for (let y = 18; y > i; y--) {
    svg[y].classList.toggle('blur');
    containers[y].classList.toggle('pointerEvents')
  }
})
}

// ---------- X ------------


// Make a selection and add it to the hex ⬇

const fan = document.querySelectorAll('.fan');
const oaie = document.querySelectorAll('.oaie');
const lemne = document.querySelectorAll('.lemne');
const argila = document.querySelectorAll('.argila');
const piatra = document.querySelectorAll('.piatra');
const desert = document.querySelectorAll('.desert');
const svg = document.querySelectorAll('svg');
const span = document.querySelectorAll('span');

function makeSelection(name1, name2) {

  for (let i = 0; i < 19; i++) {
    svg[i].style.stroke = 'rgb(168, 45, 45)';
    name1[i].addEventListener('click', () => {
    span[i].innerText = name2;
    text[i].classList.add(name2+"Selection");
    containers[i].style.pointerEvents = "none";
    svg[i].style.stroke = 'green';
    })
    }
}

makeSelection(fan, "fan");
makeSelection(oaie, "oaie");
makeSelection(lemne, "lemne");
makeSelection(argila, "argila");
makeSelection(piatra, "piatra");
makeSelection(desert, "desert");

// Only be able to press the "Play" button, once all the hex are green ⬇

function checkSelection() {
  let x = [];

  for (let i = 0; i < 19; i++) {
    if (svg[i].style.stroke === 'rgb(168, 45, 45)') {
      x.push(i);
      } 
    }
    if (x.length > 1) {
      alert("Incomplete selection!")
    } else {
      insertNumberInHex();
    }


}

playButton.addEventListener('click', checkSelection)

// Line-through selection once it reaches maximum number ⬇
// Fan:4 , Oaie:4 , Lemne:4 , Argila:3 , Piatra:3 , Desert:1
function lineThrough(name, maxNumber, name2) {

  let classSelections = document.querySelectorAll("."+name+"Selection");

  if (classSelections.length === maxNumber) {

    for (let i = 0; i < 19; i++) {

      name2[i].style.textDecoration = "line-through";
      name2[i].style.pointerEvents = "none";
      name2[i].style.opacity = "0.8";
      name2[i].style.cursor = "default";

    }

  }

}


// Add players to the game

const form = document.getElementById('addPlayers');
const input = document.getElementById('inputPlayer');
const players = document.querySelector('.players')
const addButton = document.getElementById('submit')
const allCharacters = ['char1.png', 'char2.png', 'char3.png', 'char4.png']

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const player = input.value;
  if (player) {
    const playerEl = document.createElement('div');
    const img = document.createElement('img')
    players.appendChild(playerEl)
    playerEl.classList.add('player')
    playerEl.innerHTML = `
    <div class="playerName">${player}</div>
    `
playerEl.style.backgroundImage = `url('img/${allCharacters[Math.floor(Math.random() * allCharacters.length)]}')`
    if (players.childElementCount >= 4) {
    // form.style.display = 'none';
    form.innerHTML = `
    <h1>The number of maximum players has been reached!</h1>
    `
      function hideMessage() {
        form.style.display = 'none';
        players.style.top = '10%';
      }
    setTimeout(hideMessage, 2500);
  }
    }

  input.value = '';
})
