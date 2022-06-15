// In seguito l'utente clicca su una cella: se il numero è presente 
// nella lista dei numeri generati - abbiamo calpestato una bomba - 
// la cella si colora di rosso e la partita termina, 
// altrimenti la cella cliccata si colora di azzurro e 
// l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba
//  o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, 
// cioè il numero di volte che l’utente 
// ha cliccato su una cella che non era una bomba.

const contNum = document.getElementById('container');
console.log(contNum);

const selector = document.getElementById('select');

const playBtn = document.getElementById('play');

// Elenco di numeri e array di numeri
let nNumbers;

// array dove andranno le bombe generate casualmente
let nades = [];

let userArray = [];

let newSquare;

let newClass;

// quando clicco play genero square
playBtn.addEventListener("click", gameMode);

//////funzioni DOM/////////////////////////////////////////////////
function gameMode() {

    // reset ad ogni click
    contNum.innerHTML = '';

    contNum.className = '';

    // assegno il selettore alla difficoltà

    let difficulty = parseInt(selector.value);

    // difficoltà
    if (difficulty === 1) {
        nNumbers = 100;
        newClass = 'easy';
    } else if (difficulty === 2) {
        nNumbers = 81;
        newClass = 'normal';
    } else if (difficulty === 3) {
        nNumbers = 49;
        newClass = 'hard';
    }

    // genero numeri random
    nades = nadesGenerator(nNumbers, nades);
    console.log(nades)

    // aggiungo la classe per specificare le dimensioni 
    contNum.classList.add(newClass);

    for(let i = 1; i <= nNumbers; i++) {
        newSquare = document.createElement('div');
        newSquare.innerHTML = `<span>${i}</span>`;
        newSquare.classList.add('square');
        // rendo funzionale il tasto newSquare quindi
        newSquare.addEventListener("click", squareClick);
        contNum.append(newSquare);
    }
}


function squareClick() {
    let userNumber = parseInt(this.querySelector('span').innerHTML);
    console.log(userNumber)

    // numero tentativi possibili
    const numTry = nNumbers - 16; 

    // se è incluso tra le bombe hai perso
    if (nades.includes(userNumber)) {

        this.classList.add('red');
        contNum.classList.add('notclick');
        
        // e se non è inserito tra le bombe lo inserisco nell'array del giocatore, sempre se non è già stato inserito
    } else if (!nades.includes(userNumber) && !userArray.includes(userNumber)) {
        
        this.classList.add('blue');
        userArray.push(userNumber);
        
        // e se ho raggiunto il numero massimo di tentativi ho vinto
        if (userArray.length === numTry) {
            alert('Hai vinto!');
        }
    }

    console.log(userArray)
}

//////////// funzioni //////////////////////////////////////////////
function nadesGenerator(number, Array) {
    while (Array.length !== 16) {
        let randomNum = Math.floor(Math.random() * number) + 1;
        if (!Array.includes(randomNum)) {
        Array.push(randomNum);
       }
    }
    return Array;
}