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
    createOriginWord(i);
  }
  destinationContainer.innerHTML='';
  speechZin="";
}

function createOriginWord(wordIndex){
    const wordNode = document.createElement("div");
    wordNode.textContent = listOfWords[wordIndex];
    wordNode.classList.add("word");
    wordNode.setAttribute("id", wordIndex);
    wordNode.setAttribute("onClick", "wordClicked(this.id)");
    originContainer.appendChild(wordNode);
}

function selectedWordClicked(wordIndex){
  const wordInDestination = document.getElementById(wordIndex);
  destinationContainer.removeChild(wordInDestination);
  createOriginWord(wordIndex);
  const wordToReplace = listOfWords[wordIndex] + " ";
  speechZin = speechZin.replace(wordToReplace, '');
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
  wordInDestination.setAttribute("onClick", "selectedWordClicked(this.id)");
  destinationContainer.appendChild(wordInDestination);
}

function checkSpeechPart(){

  const zinShouldBe1 = speechPart.antwoordPart1 + " ";
  const zinShouldBe2 = speechPart.antwoordPart2 + " ";
  const zinShouldBe3 = speechPart.antwoordPart3 + " ";
  if(currentSpeechPart===3){
    if (speechZin===zinShouldBe1 || speechZin===zinShouldBe2 || speechZin === zinShouldBe3 ){
     alert("Hoera! Je hebt een prachtige speech in elkaar gezet. Tijd om te oefenen, en zoals je net in je gedicht hebt gelezen...:let op je articulatie!")
      window.location.assign('articuleren.html');
    }
  }else if(speechZin === zinShouldBe1 || speechZin === zinShouldBe2 || speechZin === zinShouldBe3){
    alert("Prachtig onderdeel van je speech. Op naar het volgende deel!");
    currentSpeechPart++;
  }else if(speechZin === "gelukkig tot nooit "){
    alert("Dat is gemeen! Probeer maar opnieuw...")
  }else{
    alert("dat klopt niet helemaal. Probeer het opnieuw...")
  }
  setView();
}