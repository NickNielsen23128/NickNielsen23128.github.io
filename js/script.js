import { words } from "./words.js";

const guessNum = 6;
let guessesRemaining = guessNum;
let guessArr = [];
let letterPos = 0;
let chosenWord = words[Math.floor(Math.random() * words.length)];
console.log(chosenWord);
console.log(chosenWord.length);
function gameBoardSetup() {
	let board = document.getElementById("board");

	for (let i = 0; i < guessNum; i++) {
		let row = document.createElement("div");
		row.className = "letterRow";

		for (let j = 0; j < chosenWord.length; j++) {
			let square = document.createElement("div");
			square.className = "letterBox";
			row.appendChild(square);
		}
		board.appendChild(row);
	}
}

document.addEventListener("keyup", (k) => {
	if (guessesRemaining == 0) {
		return;
	}
	let pressedKey = String(k.key);

	if (pressedKey === "Backspace" && letterPos !== 0) {
		deleteLetter();
		return;
	}
	if (pressedKey === "Enter") {
		checkGuess();
		return;
	}

	if (String(k.key))
		if (String(k.key).length > 1) {
			return;
		} else {
			insertLetter(pressedKey);
		}

	console.log(pressedKey);
});

function insertLetter(pressedKey) {
	if (letterPos === chosenWord.length) {
		return;
	}
	pressedKey = pressedKey.toLowerCase();
	let row = document.getElementsByClassName("letterRow")[6 - guessesRemaining];
	let box = row.children[letterPos];
	box.textContent = pressedKey;
	guessArr.push(pressedKey);
	console.log("Current guess: " + guessArr);
	letterPos++;
}

function deleteLetter() {
	let row = document.getElementsByClassName("letterRow")[6 - guessesRemaining];
	let box = row.children[letterPos - 1];
	box.textContent = "";
	guessArr.pop();
	letterPos--;
}
function checkGuess() {
	let row = document.getElementsByClassName("letterRow")[6 - guessesRemaining];
	let guessString = "";
	let rightGuess = Array.from(chosenWord);
	console.log(rightGuess);

	for (const val of guessArr) {
		guessString += val;
	}
	console.log(guessString);

	if (guessString.length != chosenWord.length) {
		row.classList.add("shake-horizontal");
		setTimeout(() => {
			row.classList.remove("shake-horizontal");
		}, 800);

		return;
	}

	for (let i = 0; i < chosenWord.length; i++) {
		let letterColor = "";
		let box = row.children[i];
		let letter = guessArr[i];

		let letterPosition = rightGuess.indexOf(guessArr[i]);
		console.log(letterPosition);

		if (letterPosition == -1) {
			letterColor = "#21262c";
		} else {
			if (guessArr[i] === rightGuess[i]) {
				letterColor = "#228636";
			} else {
				letterColor = "#1f6feb";
			}
		}

		let delay = 400 * i;
		setTimeout(() => {
			box.classList.add("flip-horizontal-bottom");
			box.style.backgroundColor = letterColor;
			console.log(letterColor);
		}, delay);
	}
	if (guessString == chosenWord) {
		for (let i = 0; i < guessArr.length; i++) {
			let box = row.children[i];
			let delay = 400 * i;
			setTimeout(() => {
				box.classList.add("flip-horizontal-bottom");
			}, delay);
		}

		setTimeout(() => {
			for (let i = 0; i < guessArr.length; i++) {
				let box = row.children[i];
				let delay = 400 * i;
				setTimeout(() => {
					box.classList.add("jello-horizontal");
				}, delay);
			}
		}, 1500)
			

		guessesRemaining = 0;
		return;
	} else {
		guessesRemaining--;
		guessArr = [];
		letterPos = 0;

		if (guessesRemaining === 0) {
			for (let i = 0; i < guessArr.length; i++) {
				let box = row.children[i];
				let delay = 400 * i;
				setTimeout(() => {
					box.classList.add("flip-horizontal-bottom");
				}, delay);
			}
			setTimeout(() => {
				alert("You have ran out of guesses! Game over!");
				alert("The right word was: " + chosenWord);
			}, 2000)

			
		}
	}
}

gameBoardSetup();
