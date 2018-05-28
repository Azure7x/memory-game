let cardMatches = [];
let initialCards = [];
let finalCards =[];
let movesNum = 0;
let mistakes = 0;
const twoStars = 2;
const oneStar = 3;
const cardGrid = document.getElementById("card-grid");

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

function checkForMatch(cards){
  //only called when 2 cards have been clicked
  if(cardMatches.length >=2){
    movesNum++;
    document.getElementById("moves-num").innerHTML = movesNum + " moves";
    //doesn't check to see if the cards match until the flip animation is over
    setTimeout(function(){
      if(cards[0].dataset.number==cards[1].dataset.number){
        //changes color of card to green to show it is correct
        cards[0].children[1].classList.toggle("correct");
        cards[1].children[1].classList.toggle("correct");
        //slow the match message a bit for better timing with correct color change
        setTimeout(function(){document.getElementsByClassName("modal")[0].style.display = "block";},500);
    } else{
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
      alert("they didnt match");
      cards[0].children[1].classList.toggle("incorrect");
      cards[1].children[1].classList.toggle("incorrect");},500);
    }
    cardMatches = [];
  },1000);
  }
}

function makeCard(number){
  let card = document.createElement('div');
  card.classList.add("card-wrapper");
  card.innerHTML = '<div class="card" data-number='+number+'><div class="back">back</div><div class="front">'+number+'</div></div>';
  let cardHeight = (window.innerWidth - 40) / 4;
  card.style.height = cardHeight+"px";
  return card;
}

for(let i = 0;i<16/2;i++){
  initialCards.push(makeCard(i));
  initialCards.push(makeCard(i));
}

while(initialCards.length>0){
  let ranNum = Math.floor(Math.random()*initialCards.length);
  // console.log(ranNum);
  finalCards.push(initialCards[ranNum]);
  if(ranNum>-1){
    initialCards.splice(ranNum,1);
  }
}

for(let i = 0;i<finalCards.length;i++){
  cardGrid.appendChild(finalCards[i]);
}



    document.getElementsByClassName("modal")[0].addEventListener("click",function(){document.getElementsByClassName("modal")[0].style.display = "none";});
