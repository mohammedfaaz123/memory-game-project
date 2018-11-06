/*
 * Create a list that holds all of your cards
 */
let arrayOfCards = [
	"fa-diamond",
	//"fa-diamond",
	"fa-paper-plane-o",
	//"fa-paper-plane-o",
	"fa-anchor",
	//"fa-anchor",
	"fa-bolt",
	//"fa-bolt",
	"fa-cube",
	//"fa-cube",
	"fa-leaf",
	//"fa-leaf",
	"fa-bicycle",
	//"fa-bicycle",
	"fa-bomb",
	//"fa-bomb"
	];

	let cards = arrayOfCards.concat(arrayOfCards);

  
  function generateCard(card) {
	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
  }
  
  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */
  
  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
	var currentIndex = array.length,
	  temporaryValue,
	  randomIndex;
  
	while (currentIndex !== 0) {
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex -= 1;
	  temporaryValue = array[currentIndex];
	  array[currentIndex] = array[randomIndex];
	  array[randomIndex] = temporaryValue;
	}
  
	return array;
  }
  
  /*
   * set up the event listener for a card. If a card is clicked:
   *  - display the card's symbol (put this functionality in another function that you call from this one)
   *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
   *  - if the list already has another card, check to see if the two cards match
   *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
   *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
   *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
   *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
   */
  
  // Generates the cards and shuffles them
  function initGame() {
	var deck = document.querySelector(".deck");
	//shuffle(cards);
	var cardHTML = shuffle(cards).map(function(card) {
	  return generateCard(card);
	});
	deck.innerHTML = cardHTML.join("");
  }
  
  initGame();
  
  // Function to update the time in the DOM
  function incrementTime() {
	timer++;
  
	const numOfMinutes = Math.floor(timer / 60);
  
	const numOfSeconds = timer % 60;
  
	minuteshtml.innerHTML = " " + numOfMinutes;
  
	secondshtml.innerHTML = " " + numOfSeconds;
  }
  
  // Function to start the timer
  function startTimer() {
	if (isRunning) return;
  
	isRunning = true;
	interval = setInterval(incrementTime, 1000);
  }
  
  // Function to stop the timer
  function stopTimer() {
	if (!isRunning) return;
  
	isRunning = false;
	clearInterval(interval);
  }
  
  let allCards = document.querySelectorAll(".card");
  let openCards = [];
  let moves = 0;
  let movehtml = document.querySelector(".moves");
  let star = document.querySelectorAll(".fa-star");
  let restartbtn = document.querySelector(".restart");
  let timer = 0;
  let isRunning = false;
  let interval;
  let minuteshtml = document.querySelector(".minutes");
  let secondshtml = document.querySelector(".seconds");
  let matched = 0;
  let modal = document.getElementById("popup");
  let container = document.querySelector(".container");
  let score = document.querySelector(".stars");
  let time = document.querySelector(".time");
  let resetGame = document.querySelector("#btn");
  
  let score_panel = document.querySelector(".score-panel");
  allCards.forEach(function(card) {
	// When a card is clicked
	card.addEventListener("click", function cardClicker(event) {
	  // Starts the timer
	  startTimer();
  
	  // Only execute if the 3 classes (open, show, match) are not there
	  if (
		!card.classList.contains("open") &&
		!card.classList.contains("show") &&
		!card.classList.contains("match")
	  ) {
		// Opens only 2 cards at a time
		if (openCards.length < 2) {
		  card.classList.add("open", "show");
		  openCards.push(card);
		  //console.log(openCards);
		}
  
		// check the cards if they match
		if (openCards.length === 2) {
		  if (openCards[0].dataset.card == openCards[1].dataset.card) {
			openCards[0].classList.add("match", "open", "show");
			openCards[1].classList.add("match", "open", "show");
			matched++;
			openCards = [];
			moves++;
		  }
  
		  // If cards doesn't match
		  else {
			setTimeout(function() {
			  openCards.forEach(function(card) {
				card.classList.remove("open", "show");
			  });
			  openCards = [];
			}, 500);
			moves++;
		  }
		}
	  }
  
	  movehtml.innerHTML = moves;
  
	  const modalfunction = () => {
		modal.style.display = "block";
		container.classList.add("display-none");
		stopTimer();
		document.querySelector("#star").appendChild(score);
		document.querySelector("#timer").appendChild(time);
  
		// Restarts the game when the button is clicked
		resetGame.addEventListener("click", function() {
		  matched = 0;
		  modal.style.display = "none";
		  container.classList.remove("display-none");
		  timer = 0;
		  minuteshtml.innerHTML = " " + 0;
  
		  secondshtml.innerHTML = " " + 0;
  
		  allCards.forEach(function(card) {
			card.classList.remove("open", "show", "match");
		  });
		  moves = 0;
		  movehtml.innerHTML = moves;
		  star.forEach(function(star) {
			star.classList.remove("fa-star-o");
		  });
  
		  score_panel.insertBefore(score, movehtml);
		  score_panel.insertBefore(time, restartbtn);
		});
	  };
  
	  if (matched === 8) {
		setTimeout(modalfunction, 500);
	  }
  
	  // Gives ratings according to the no.of moves
	  if (moves > 14) {
		//star[2].classList.remove('fa-star');
		star[2].classList.add("fa-star-o");
	  }
	  if (moves > 20) {
		//star[1].classList.remove('fa-star');
		star[1].classList.add("fa-star-o");
	  }
	});
  });
  
  // Resets the game when the button is clicked
  restartbtn.addEventListener("click", function() {
	stopTimer();
  
	minuteshtml.innerHTML = " " + 0;
  
	secondshtml.innerHTML = " " + 0;
  
	allCards.forEach(function(card) {
	  card.classList.remove("open", "show", "match");
	});
  
	moves = 0;
	movehtml.innerHTML = moves;
	star.forEach(function(star) {
	  star.classList.remove("fa-star-o");
	});
  });
  