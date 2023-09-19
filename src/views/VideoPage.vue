<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title color="white">Camera actions</ion-title>
      </ion-toolbar>
    </ion-header> 
    <ion-content>
      <ion-row>
        <ion-col col-1>
          <ion-button style="width:100%" color="primary" @click="startVideoStream" v-if="capturing">Start video stream</ion-button>
        </ion-col>
        <ion-col col-2>
          <ion-button style="width:100%" color="danger" @click="stopVideoStream" v-if="!capturing">Stop video stream</ion-button>
        </ion-col>
        <ion-col col-3>
          <video ref="videoElement" style="width: 100%; height: auto;"></video>
        </ion-col>
      </ion-row>
      <canvas style = "margin-left: 5%; margin-top: 5%; width: 60%; height: 70%; border-style: solid" id = "output"></canvas>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonItem, IonSelect, IonSelectOption, IonList, IonButton } from '@ionic/vue';
import { defineComponent, ref, onMounted } from 'vue';
import cv from 'opencv.js';
import { useMQTT } from 'mqtt-vue-hook';

const mqttHook = useMQTT() 
export  default defineComponent({
  name: 'Tab2Page',
  components:{
    IonContent,IonHeader,IonPage,IonTitle,IonToolbar, IonRow, IonCol, IonItem, IonSelect, IonSelectOption, IonList, IonButton
  }, 

  data() {        
    return{
      capturing: false,
    }
  }, 

  setup() {

    onMounted(() => {

      let camera = undefined 
      
      // tenemos que registrar eventos en especifico
      mqttHook.registerEvent('cameraService/IonicTutorial/videoFrame', (topic, message) => {
        
        console.log ('recibo frame')

        const img = new Image();
        img.src = "data:image/jpg;base64,"+message;

        img.onload = () =>{
          let dst = new cv.Mat();
          dst = cv.imread(img);

          cv.imshow('output', dst);
        };

        img.onerror = (error) => {
          console.error('Error al cargar la imagen:', error);
        };        
      })
    })

    function startVideoStream(){
      mqttHook.subscribe(["cameraService/IonicTutorial/videoFrame"], 1);
      mqttHook.publish("IonicTutorial/cameraService/startVideoStream", "",1);
    
    
    }

    function stopVideoStream(){
      mqttHook.publish("IonicTutorial/cameraService/stopVideoStream", "",1)
    }

    return {
      startVideoStream, stopVideoStream
    }
  } 
});

</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
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
</style>
