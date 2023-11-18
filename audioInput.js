navigator.mediaDevices.getUserMedia({
  audio: true,
  video: false
})
  .then(function(stream) {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

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
      const geluid = Math.round(average*2) 
      console.log(geluid);
       if(didHeArticulateWell(geluid)){
       	showWhenHardEnough = $("#showWhenHardEnough");
		showWhenHardEnough.css("display", "inline-block")
       }
    };
  })
  .catch(function(err) {
    /* handle the error */
    console.error(err);
  });

function didHeArticulateWell(geluid) {
	return geluid >= 60;
}