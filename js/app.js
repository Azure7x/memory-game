let card1;
let card2;

let cardStorage = [];

document.getElementsByClassName("container")[0].addEventListener("click", function(e){
  // console.log(performance.now()+"x")
  if(e.target.parentElement.classList.contains("card")
      && !e.target.parentElement.classList.contains("flip")
      && cardStorage.length < 2){
    const card = e.target.parentElement;

    card.classList.toggle("flip");
    cardStorage.push(card);
    checkForMatch(cardStorage);
  }
  // console.log(performance.now()+"y")
});

function checkForMatch(cards){
  if(cardStorage.length >=2){
    // console.log("two cards");
    setTimeout(function(){
      if(cards[0].dataset.number==cards[1].dataset.number){
      alert("they matched");
    } else{
      alert("they didnt match");
      cards[0].classList.toggle("flip");
      cards[1].classList.toggle("flip");
    }
    cardStorage = [];
    },1000);
  }
}
