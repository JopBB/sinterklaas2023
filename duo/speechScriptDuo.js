//DECLARE HTML CLASS, ID, TAG VARIABLES
const destinationContainer = document.getElementById("destination__container");
const originContainer = document.getElementById("origin__container");
const originalText = document.getElementById("original__text");
const words = document.getElementsByClassName("word");
speechZin = "";
currentSpeechPart=0
speechPart = {};
opdracht=[];
listOfWords=[];
setView();

function setView(){
  speechPart = speechParts[currentSpeechPart];
  opdracht = speechPart.opdrachtPart.split(" ");
  listOfWords = speechPart.list;

  //Print the sentence in the speech bubble
  originalText.innerHTML = '';
  for (let i = 0; i < opdracht.length; i++) {
    const spanNode = document.createElement("span");
    spanNode.textContent = opdracht[i];
    originalText.appendChild(spanNode);
  }

  //Print the list of words to origin
  originContainer.innerHTML = '';
  for (let i = 0; i < listOfWords.length; i++) {
    const wordNode = document.createElement("div");
    wordNode.textContent = listOfWords[i];
    wordNode.classList.add("word");
    wordNode.setAttribute("id", i);
    wordNode.setAttribute("onClick", "wordClicked(this.id)");
    originContainer.appendChild(wordNode);
  }
  destinationContainer.innerHTML='';
  speechZin="";
}


function wordClicked(wordIndex){
  const wordInList = document.getElementById(wordIndex);
  speechZin += (listOfWords[wordIndex] + " ");
  originContainer.removeChild(wordInList);

  const wordInDestination = document.createElement("div");
  wordInDestination.textContent = listOfWords[wordIndex];
  wordInDestination.classList.add("word");
  wordInDestination.classList.add("selected");
  wordInDestination.setAttribute('id', wordIndex)
  destinationContainer.appendChild(wordInDestination);
}

function checkSpeechPart(){
  const zinShouldBe = speechPart.antwoordPart;
  console.log(zinShouldBe)
  console.log(speechZin)
  if(speechZin === zinShouldBe+" "){
    alert("goed gedaan!");
    currentSpeechPart++;
  }else{
    alert("dat klopt niet helemaal. Probeer het opnieuw...")
  }
  setView();
}