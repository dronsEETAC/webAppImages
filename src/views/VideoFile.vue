<template>
    <ion-page style="background-color: rgb(65, 65, 65);">
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title class="ion-text-center">FILE PAGE</ion-title>
        </ion-toolbar>
      </ion-header>
      <div v-if="showGal" class="gallery-container">
        <div v-for="(video, index) in videoList" :key="index" class="video-item">
          <video :src="video" class="thumbnail" controls></video>
        </div>
      </div>
      <div style="display: flex; margin-top: 20px; margin-left: 20px; margin-right: 20px; position: relative;">
        <div style="display: flex; position: relative;" v-if = "!showGal">
          <video :src="videoURL" v-if="videoURL" style="position: relative; width: 100%; height: 100%; top: -150px;" controls></video>
        </div>
      </div>
      <div class = 'buttons_forback'>
        <ion-button class="buttonBack" fill="clear" size="large" v-if = "!showGal" @click="showPrevious">
          <ion-icon :icon="arrowBackCircleOutline" class = 'custom-icon'></ion-icon>
        </ion-button>
        <ion-button class="buttonForward" fill="clear" size="large" v-if = "!showGal" @click="showNext">
          <ion-icon :icon="arrowForwardCircleOutline" class = 'custom-icon'></ion-icon>
        </ion-button>
      </div>
      <div class="gallery" style="display:flex; justify-content: center; height: 300px; ">
        <div style ="display: flex; justify-content: center;">
          <ion-button v-if = "!showGal" fill="solid"  style="border-style: default; width: 100px; height: 40px;" @click="showGallery">Gallery</ion-button>
          <ion-button v-if = "showGal"  fill="solid" style="border-style: default; width: 100px; height: 40px;" @click="goBack">Back</ion-button>
        </div>
      </div>
      <div class="descarga" v-if = "!showGal" style="display:flex; justify-content: center; height: 300px;">
        <div style ="display: flex; justify-content: center;">
          <ion-button fill ="solid" style="border-style: default; width: 200px; height: 40px;" @click="descargarVideo">Descargar Video</ion-button>
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
    name: 'FilePage',
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
  
      const showGallery = () => {
        showGal.value = true;
      }
  
      const goBack = () => {
        showGal.value = false; // Ocultar la galería al presionar el botón "Back"
      };
  
      const showPrevious = () => {
        if (currentVideoIndex.value > 0) {
          currentVideoIndex.value--;
        videoURL.value = videoList.value[currentVideoIndex.value];
      }
      };
  
      const showNext = () => {
        if (currentVideoIndex.value < videoList.value.length - 1) {
          currentVideoIndex.value++;
        videoURL.value = videoList.value[currentVideoIndex.value];
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
        showGallery,
        goBack,
        mostrarVideo,
        showPrevious,
        showNext,
        videoList,
        arrowBackCircleOutline,
        arrowForwardCircleOutline,
        showGal,
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
  
  .custom-icon{
    font-size: 4ex;
  }
  
  .descarga{
    position: absolute;
    top:600px;
    left:100px;
  }
  
  .gallery{
    position: absolute;
    top:540px;
    left:150px;
  }
  
  .buttonBack{
    position: absolute;
    top:500px;
    left: 50px;
    width: 100px;
    height: 100px;
  }
  
  .buttonForward{
    position: absolute;
    top: 500px;
    left: 240px;
    width: 100px;
    height: 100px;
  }
  
  .gallery-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); /* Define columnas automáticas */
    justify-content: center; /* Centra el contenido horizontalmente */
    gap: 10px; /* Espaciado entre imágenes */
    margin: 20px; /* Márgenes externos */
  }
  
  .video-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .thumbnail {
    max-width: 100px; /* Tamaño máximo de las miniaturas */
    max-height: 100px; /* Tamaño máximo de las miniaturas */
  }
  </style>