document.getElementsByClassName("container")[0].addEventListener("click", function(e){
  if(e.target.parentElement.classList.contains("card")){
    e.target.parentElement.classList.toggle("flip");
  }
});
