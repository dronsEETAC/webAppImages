<template>
    <ion-page style="background-color: rgb(65, 65, 65);">
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title class="ion-text-center">CONTROL PAGE</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="takeoff" style="display:flex; justify-content: center; height: 300px; ">
        <div style ="display: flex; justify-content: center;">
          <ion-button fill="solid"  style="border-style: default; width: 100px; height: 40px;">TAKEOFF</ion-button>
        </div>
      </div>
      <div class="panoramic" style="display:flex; justify-content: center; height: 300px;">
        <div style ="display: flex; justify-content: center;">
          <ion-button fill ="solid" style="border-style: default; width: 200px; height: 40px;">TAKE PANORAMIC</ion-button>
        </div>
      </div>
      <div class="landing" style="display:flex; justify-content: center; height: 300px;">
        <div style ="display: flex; justify-content: center;">
          <ion-button fill ="solid" style="border-style: default; width: 100px; height: 40px;">LANDING</ion-button>
        </div>
      </div>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonIcon} from '@ionic/vue';
  import { useMQTT } from 'mqtt-vue-hook';
  import * as cv from 'opencv.js';
  import { ref, inject, onMounted, defineComponent} from 'vue';
  import { arrowBackCircleOutline, arrowForwardCircleOutline } from 'ionicons/icons';
  
  export default defineComponent({
    name: 'ControlPage',
    components: {  
      IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonIcon
    },
  
    setup() {
      const mqttHook = useMQTT();
      const count = ref(0);
      const videoURL = ref('/entrada.mp4');
      const videoList = ref<string[]>([]);
      const showGal = ref(false);
      const currentVideoIndex = ref(0); 
  
      const mostrarVideo = () => {
        mqttHook.subscribe(["VideoAnna"],0);
        mqttHook.registerEvent('VideoAnna', (topic, message) => {
          console.log(message)
          const videoUrl = "data:video/jpg;base64," + message;
          videoURL.value = videoUrl;
          videoList.value.push(videoUrl);
          console.log("Video recibido")
        })
      };
  
      const descargarVideo = () => {
        if (videoURL.value) {
          const a = document.createElement('a');
          a.href = videoURL.value;
          a.download = 'video' + count.value + '.mp4';
          a.click();
          count.value++;
          console.log("Video descargado")
        }
      };
  
      onMounted(() => {
        mostrarVideo();
      });
  
      return {
        mqttHook,
        count,
        videoURL,
        descargarVideo,
        mostrarVideo,
        videoList,
        arrowBackCircleOutline,
        arrowForwardCircleOutline,
      };
    }
  });
  </script>
  
  <style scoped>
  #container {
    text-align: center;
    position: absolute;
    top: 400px;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  
  
  #container strong {
    font-size: 20px;
    line-height: 26px;
  }
  
  #container p {
    font-size: 16px;
    line-height: 22px;
    
    color: #8c8c8c;
    
    margin: 0;
  }
  
  #container a {
    text-decoration: none;
  }
  
  .buttons_forback{
    display: flex;
    justify-content: space-between;
  }
  
  .takeoff{
    position: absolute;
    top:200px;
    left:70px;
  }
  
  .landing{
    position: absolute;
    top:200px;
    left:250px;
  }
  
  .panoramic{
    position: absolute;
    top:540px;
    left:100px;
  }
  

</style>