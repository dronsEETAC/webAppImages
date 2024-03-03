<template>
  <ion-page style="background-color: rgb(65, 65, 65);">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title class="ion-text-center">VIDEO PAGE</ion-title>
      </ion-toolbar>
    </ion-header>
    <div class = 'mensajeRecibido' v-if="estado == 'recibido'">¡Video recibido!</div>
    <div class = 'mensajeRecibido' v-if="estado == 'esperando'">¡Esperando el video!</div>

    <div style="display: flex; margin-top: 50px; margin-left: 20px; margin-right: 20px; position: relative; ">
      <div style="display: flex; position: relative;" v-if = "showGal">
        <video :src="videoURL" v-if="videoURL" style="position: relative; width: 70%; height: 70%; top: -10px; left:60px" controls muted></video>
      </div>
    </div>
    <div class="video-container">
      <div class="video-item" v-if = "!showGal">
        <canvas id="mycanvas" class="thumbnail-video" width="350" height="400"></canvas>
      </div>
    </div>
    <div>
        <ion-button v-if = "estado == 'mostrando'" fill="solid"  expand = 'full'>Mostrando video</ion-button>
        <ion-button v-if = "estado == 'fin'" fill="solid"  expand = 'full'>Esperando envio del video</ion-button>
        <ion-button v-if = "estado == 'recibido'" fill="solid" expand = 'full' color='success' @click="descargarVideo">Descargar video</ion-button>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonIcon} from '@ionic/vue';
import { ref, onMounted, defineComponent } from 'vue';
import { useMQTT } from 'mqtt-vue-hook';
import { arrowBackCircleOutline, arrowForwardCircleOutline } from 'ionicons/icons';
import cv from 'opencv.js'

export default defineComponent({
  name: 'VideoPage',

  components: {  
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonIcon
  },
  
  setup() {
    const mqttHook = useMQTT();
    //const videoURL = ref<string | null>(null);
    const videoURL = ref('/public/entrada.png');
    //const videoURL = ref('/entrada.mp4');
    const videoList = ref<string[]>([]);
    const count = ref(0);
    const videoRecibido = ref(false);
    const esperandoVideo = ref (true);
    const estado = ref ('esperando')
    const mostrarVideo = () => {

      mqttHook.subscribe(['VideoAnna'], 2);
      mqttHook.subscribe(['finVideoAnna'], 2);

      console.log('suscribe');
      mqttHook.registerEvent('finVideoAnna', (topic, message) => {
         console.log ('fin del video');
         estado.value = 'fin';
      });
      mqttHook.registerEvent('VideoAnna', (topic, message) => {
        if (estado.value != 'fin') {
           estado.value = 'mostrando';
           const image = "data:image/jpeg;base64," + message;

           //const canvas = document.createElement('canvas');
           //const canvas = document.getElementById('mycanvas');
           //const canvas = document.querySelector('.thumbnail') as HTMLCanvasElement;
           const canvas = document.getElementById('mycanvas') as HTMLCanvasElement;


           const ctx = canvas.getContext('2d');
           const img = new Image();

           if (!canvas) {
             console.error('Canvas not found');
             return;
           }

           //canvas.width = 350;         
           //canvas.height = 400;

           if (!ctx) {
             console.error('2D context not available');
             return;
           }

           img.onload = () => {
             canvas.width = img.width;         
             canvas.height = img.height;
             ctx.clearRect(0, 0, canvas.width, canvas.height);
             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
             /**setInterval(() => {
               ctx.clearRect(0, 0, canvas.width, canvas.height);
               ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
             },25);*/
           };
           img.src = image;
        }
      });
    };

    const recibirVideo = () => {
      mqttHook.subscribe(["FileAnna"],0);
      mqttHook.registerEvent('FileAnna', (topic, message) => {

        console.log("Empiezo Video recibido")
        //const videoBlob = new Blob([message], { type: 'video/mp4' });
        //const videoUrl = URL.createObjectURL(videoBlob);
        const videoUrl = "data:video/mp4;base64," + message;
        videoURL.value = videoUrl;

        //Velocidad cambio         
        const newVideo = document.createElement('video');
        newVideo.src = videoUrl;
        console.log("Duración del video:", newVideo.duration);

        /**newVideo.addEventListener('loadedmetadata', () => {
          console.log('loadeddata')
          newVideo.playbackRate = 0.25; // Ajusta la velocidad según sea necesario
          //newVideo.play();
        });**/

        //newVideo.playbackRate = 0.25;
        document.body.appendChild(newVideo);
        console.log ('despues del appen')
        //newVideo.play();
        //videoRecibido.value = true;
        //esperandoVideo.value = true;
        estado.value = 'recibido'
        

        //videoList.value.push(videoUrl);
        console.log("File in gallery")
      })
    };

    const descargarVideo = () => {
      if (videoURL.value) {
        const a = document.createElement('a');
        a.href = videoURL.value;
        a.download = 'video' + count.value + '.mp4';

        //Agregar
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        count.value ++;
        console.log("Video descargado")
        const canvas = document.getElementById('mycanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        canvas.width = 350;
        canvas.height = 400;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        estado.value = 'esperando'
      }
    };

    const showVideos = () => {
      showGal.value = true;
    }
  
    const goBack = () => {
      showGal.value = false; // Ocultar la galería al presionar el botón "Back"
      videoRecibido.value = false;
    };

    onMounted(() => {
      console.log('empieza')
      mostrarVideo();
      recibirVideo();
    });


    return {
      arrowBackCircleOutline,
      arrowForwardCircleOutline,
      descargarVideo,
      showVideos,
      goBack,
      recibirVideo,
      count,
      videoURL,
      videoRecibido,
      esperandoVideo,
      estado
    };
  },
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

.mensajeRecibido{
  position: absolute;
  top: 80px; 
  left: 10px; 
  color: white;
  font-size: 24px; 
}

.gallery{
  position: absolute;
  top:600px;
}

.descarga{
  position: absolute;
  top:600px;
  left:100px;
}

.gallery-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); /* Define columnas automáticas */
  justify-content: center; /* Centra el contenido horizontalmente */
  gap: 10px; /* Espaciado entre imágenes */
  margin: 10px; /* Márgenes externos */
}

.video-container{
  margin-bottom: 200px;
}

.video-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

.thumbnail-video {
  max-width: 350px; /* Tamaño máximo de las miniaturas */
  max-height: 450px; /* Tamaño máximo de las miniaturas */
}

.thumbnail-file{
  max-width: 100px; /* Tamaño máximo de las miniaturas */
  max-height: 100px; /* Tamaño máximo de las miniaturas */
}
</style>
