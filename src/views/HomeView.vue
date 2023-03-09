<script setup>
import { ref, onMounted } from "vue";
const constraints = {
  audio: true,
  video: false,
}

const getMedia = () => {
  navigator.mediaDevices.getUserMedia(constraints)
  .then(async function (stream) {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
        console.log('device', devices);
    }).catch(function(err) {
        console.log(err.name + ": " + err.message);
    });
    const audioContext = window.AudioContext

    const context = new audioContext();
    const audioInput = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    audioInput.connect(analyser);
  
    analyser.fftSize = 2048;
    analyser.minDecibels = -100;
    analyser.maxDecibels = 100;
    analyser.smoothingTimeConstant = 0;
    let maxDecibels = 0;
//     setInterval(() => {
//     const dataArr = new Uint8Array(analyser.frequencyBinCount);
//     analyser.getByteFrequencyData(dataArr);
//     console.log(analyser.frequencyBinCount)
//     const mcVolume = dataArr.reduce(function(a, b) {
//         return a + b;
//     }) / analyser.frequencyBinCount;
//     maxDecibels = maxDecibels > mcVolume ? maxDecibels : mcVolume;
//     console.log(mcVolume,maxDecibels)
//     var p = parseInt(mcVolume / maxDecibels * 100);
//     console.log(p+'%')
// }, 800);
  })
  .catch(function (error) {
    console.log(error, "error")
  // 如果有錯誤發生
  });
}
getMedia()
onMounted(() => {

})
</script>

<template>
  <main>
    <p class="text-[52px] font-bold">123</p>
    <video src="" class="h-[200px] w-[300px] border"></video>
  </main>
</template>
