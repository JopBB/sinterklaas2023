mediumGeluidGehoord = false;
hardGeluidGehoord = false;
currentSpeechPart = 0;
langGenoegGeluisterd = 0;
speechPart = {};
opdracht=[];
fillOpdracht();
navigator.mediaDevices.getUserMedia({
  audio: true,
  video: false
})
  .then(function(stream) {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
    showWhenTooSoft = $("#showWhenTooSoft");
    showWhenLittleBitOfSound = $("#showWhenLittleBitOfSound");
    showWhenHardEnough = $("#showWhenHardEnough");

    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);
    scriptProcessor.onaudioprocess = function() {
      const array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      const arraySum = array.reduce((a, value) => a + value, 0);
      const average = arraySum / array.length;
      const geluid = Math.round(average) 
      colorPids(geluid);
       if(geluid>=60){
        hardGeluidGehoord=true;
        langGenoegGeluisterd++;
        console.log(langGenoegGeluisterd)
        if(langGenoegGeluisterd>50){
          showWhenTooSoft.css("display", "none");
          showWhenLittleBitOfSound.css("display", "none");
  		    showWhenHardEnough.css("display", "inline-block");
        }
       }else if(geluid >= 20 && !hardGeluidGehoord){
        mediumGeluidGehoord=true;
        setTimeout(function(){ 
          mediumGeluidGehoord=false;
        }, 3000);
        showWhenTooSoft.css("display", "none");
        showWhenHardEnough.css("display", "none");
        showWhenLittleBitOfSound.css("display", "inline-block");
       }else if(geluid >= 5 && !mediumGeluidGehoord && !hardGeluidGehoord){
        showWhenLittleBitOfSound.css("display", "none");
        showWhenHardEnough.css("display", "none");
        showWhenTooSoft.css("display", "inline-block");
       }else if(geluid === 0 && !mediumGeluidGehoord && !hardGeluidGehoord){
        showWhenLittleBitOfSound.css("display", "none");
        showWhenHardEnough.css("display", "none");
        showWhenTooSoft.css("display", "inline-block");
       }
    };
  })
  .catch(function(err) {
    /* handle the error */
    console.error(err);
  });


function colorPids(vol) {
  const allPids = [...document.querySelectorAll('.pid')];
  const numberOfPidsToColor = Math.round(vol / 5);
  const pidsToColor = allPids.slice(0, numberOfPidsToColor);
  for (const pid of allPids) {
    pid.style.backgroundColor = "#e6e7e8";
  }
  for (const pid of pidsToColor) {
    // console.log(pid[i]);
    pid.style.backgroundColor = "#69ce2b";
  }
}

function fillOpdracht(){
  speechPart = speechParts[currentSpeechPart];
  opdracht = speechPart.antwoordPart.split(" ");
  const originalText = document.getElementById("original__text");
  originalText.innerHTML = '';
  for (let i = 0; i < opdracht.length; i++) {
    const spanNode = document.createElement("span");
    spanNode.textContent = opdracht[i];
    originalText.appendChild(spanNode);
  }
}

function loadSpeechPart(){
  if(currentSpeechPart!==3){
    currentSpeechPart++;
    showWhenLittleBitOfSound.css("display", "none");
    showWhenHardEnough.css("display", "none");
    showWhenTooSoft.css("display", "none");
    langGenoegGeluisterd=0;
    fillOpdracht();
  }else{
    alert("van harte gefeliciteerd! Je hebt goed genoeg geoefend!")
  }
}