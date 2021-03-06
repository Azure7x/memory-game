let cardMatches = [];
let initialCards = [];
let finalCards =[];
let startTime;
let numberOfCards = 16;
let movesNum = 0;
let mistakes = 0;
let winNumber = 0;
let twoStars = 2;
let oneStar = 3;
const cardGrid = document.getElementById("card-grid");
const modal = document.getElementsByClassName("modal")[0];

cardGrid.addEventListener("click", function(e){
  //checks to see if a card is clicked
  if(e.target.parentElement.classList.contains("card")
      //checks that the card isn't already flipped
      && !e.target.parentElement.classList.contains("flip")
      //prevents another card from being clicked if theres 2 being matched
      && cardMatches.length < 2){
    const card = e.target.parentElement;

    card.classList.toggle("flip");
    cardMatches.push(card);
    checkForMatch(cardMatches);
  }
});

//displays modal to start a new game
document.getElementById("new-game").addEventListener("click",function(){modal.style.display = "block";});

//clicking a number determines the number of cards for the game
document.getElementsByClassName("num-container")[0].addEventListener("click",function(e){
  if(e.target.classList.contains("card-num")){
    let el = document.getElementsByClassName("card-num");
    for(let i = 0; i < el.length; i++){
      el[i].classList.remove("selected");
    }

    //highlights selected number
    e.target.classList.add("selected");
    numberOfCards = e.target.innerHTML;
  }
});

//begins the game when the start button is clicked
document.getElementsByClassName("start")[0].addEventListener("click",function(){
  modal.style.display = "none";
  document.getElementsByClassName("modal-victory")[0].style.display = "none";
  setCards();
  startTime = new Date().getTime();
  //determines the number of mistakes, based of number of cards, before star ratings drop
  switch(parseInt(numberOfCards)) {
    case 12:
      twoStars = 4;
      oneStar =6;
      break;
    case 16:
        twoStars = 6;
        oneStar = 8;
        break;
    case 20:
      twoStars = 9;
      oneStar = 11;
      break;
    default:
    twoStars = 2;
    oneStar = 3;
  }
  //updates the displayed time every second
  setInterval(function(){
      let endTime = new Date().getTime();
      endTime = endTime - startTime;
      let min = Math.floor(endTime/60000);
      if(min<=9){
        min = "0"+min;
      }
      let sec = ((endTime%60000)/1000).toFixed(0);
      if(sec<=9){
        sec = "0"+sec;
      }
      document.getElementsByClassName("set-time")[0].innerHTML = min + ":" + sec;
  },1000);
});

//resets the current game
document.getElementById("restart").addEventListener("click", function(){
  setCards();
  startTime = new Date().getTime();
});

//readjusts card height when window is resized
window.addEventListener('resize', function(){
  if(finalCards.length>0){
    for(let i=0; i<finalCards.length; i++){
      setCardHeight(finalCards[i]);
    }
  }
});

function checkForMatch(cards){
  //only called when 2 cards have been clicked
  if(cardMatches.length >=2){
    movesNum++;
    document.getElementById("moves-num").innerHTML = movesNum + " moves";
    //doesn't check to see if the cards match until the flip animation is over
    setTimeout(function(){
      cards[0].dataset.number==cards[1].dataset.number ? cardsDoMatch(cards) : cardsDoNotMatch(cards);
    cardMatches = [];
  },1000);
  }
}

function cardsDoMatch(cards){
  winNumber++;
  //changes color of card to green to show it is correct
  cards[0].children[1].classList.toggle("correct");
  // cards[0].classList.toggle("spin-win");
  cards[1].children[1].classList.toggle("correct");
  //game victory
  if(winNumber>=numberOfCards/2){
    //shows victory modal
    setTimeout(function(){
      modal.style.display = "block";
      document.getElementsByClassName("modal-victory")[0].style.display = "block";
      document.getElementById("turns").innerHTML = movesNum;
      let endTime = new Date().getTime();
      endTime = endTime - startTime;
      let min = Math.floor(endTime/60000);
      let sec = ((endTime%60000)/1000).toFixed(0);
      document.getElementById("time").innerHTML = min + ":"+ sec;
      document.getElementById("modal-stars").innerHTML = document.getElementById("stars").innerHTML;
    },500);
  }
}

function cardsDoNotMatch(cards){
  mistakes++;
  if(mistakes>=twoStars){
    document.getElementById("star-three").src = "img/empty-star.png";
  }
  if(mistakes>=oneStar){
    document.getElementById("star-two").src = "img/empty-star.png";
  }
  //changes color of card to red to show its incorrect
  cards[0].children[1].classList.toggle("incorrect");
  cards[1].children[1].classList.toggle("incorrect");
  //slow the match message a bit for better timing with correct color change
  setTimeout(function(){
  cards[0].classList.toggle("flip");
  cards[1].classList.toggle("flip");
  cards[0].children[1].classList.toggle("incorrect");
  cards[1].children[1].classList.toggle("incorrect");},500);
}

function makeCard(number){
  let card = document.createElement('div');
  card.classList.add("card-wrapper");
  //credit for card flip https://medium.com/designer-recipes/understanding-card-flip-animation-using-css-391c40ed3136
  card.innerHTML = '<div class="card" data-number='+number+'><div class="back"></div><div class="front">'+number+'</div></div>';
  setCardHeight(card);
  return card;
}

//sets the card width to match the card width
function setCardHeight(card){
  let cardHeight;
  if(window.innerWidth < 750){
    cardHeight = ((window.innerWidth * .9) - 40) / 4;
  } else {
    cardHeight = (750 - 80) / 4;
  }
  card.style.height = cardHeight+"px";
}

function setCards(){
  //resets game elements
  cardMatches = [];
  mistakes = 0;
  winNumber = 0;
  movesNum = 0;
  finalCards = [];
  document.getElementById("moves-num").innerHTML = movesNum + " moves";
  document.getElementById("star-three").src = "img/full-star.png";
  document.getElementById("star-two").src = "img/full-star.png";

  //removes the cards that are on the board
  while(cardGrid.hasChildNodes()){
    cardGrid.removeChild(cardGrid.lastChild);
  }

  //creates cards in pairs and adds them to temp array
  for(let i = 0;i<numberOfCards/2;i++){
    initialCards.push(makeCard(i));
    initialCards.push(makeCard(i));
  }

  //randomly adds cards from temp array into new array
  while(initialCards.length>0){
    let ranNum = Math.floor(Math.random()*initialCards.length);
    finalCards.push(initialCards[ranNum]);
    if(ranNum>-1){
      initialCards.splice(ranNum,1);
    }
  }

  for(let i = 0;i<finalCards.length;i++){
    cardGrid.appendChild(finalCards[i]);
  }
}
