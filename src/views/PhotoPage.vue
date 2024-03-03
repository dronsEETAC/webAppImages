<template>
  <ion-page style="background-color: rgb(65, 65, 65);">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title class="ion-text-center" style="font-size: 1em;">PHOTO PAGE</ion-title>
      </ion-toolbar>
    </ion-header>
    <div v-if="showGal" class="gallery-container">
      <div v-for="(image, index) in imageList" :key="index" class="image-item">
        <img :src="image" class="thumbnail"/>
      </div>
    </div>
    <div style="display: flex; margin-top: 80px; margin-left: 40px; margin-right: 10px; position: relative;">
      <div style="display: flex; position: relative;" v-if = "!showGal">
        <img :src="imagenURL" v-if="imagenURL" style="position: relative; width: 100%; height: 90%; top: -120px;" />
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
    <div class="gallery" style="display:flex; justify-content: center; height: 200px; ">
      <div style ="display: flex; justify-content: center;">
        <ion-button v-if = "!showGal" fill="solid"  style="border-style: default; width: 100px; height: 30px;" @click="showGallery">Gallery</ion-button>
        <ion-button v-if = "showGal"  fill="solid" style="border-style: default; width: 100px; height: 30px;" @click="goBack">Back</ion-button>
      </div>
    </div>
    <div class="descarga" v-if = "!showGal" style="display:flex; justify-content: center; height: 300px;">
      <div style ="display: flex; justify-content: center;">
        <ion-button fill ="solid" style="border-style: default; width: 200px; height: 40px;" @click="descargarImagen">Descargar Imagen</ion-button>
      </div>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonIcon} from '@ionic/vue';
import { useMQTT } from 'mqtt-vue-hook';
import { ref, inject, onMounted, defineComponent} from 'vue';
import { arrowBackCircleOutline, arrowForwardCircleOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'PhotoPage',
  components: {  
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonIcon
  },

  setup() {
    const mqttHook = useMQTT();
    const count = ref(0);
    const imagenURL = ref('/public/entrada2.png');
    const imageList = ref<string[]>([]);
    const showGal = ref(false);
    const currentImageIndex = ref(0); 

    const mostrarImagen = () => {
      mqttHook.subscribe(["ImagenAnna"],0);
      mqttHook.registerEvent('ImagenAnna', (topic, message) => {
        console.log(message)
        const imageUrl = "data:image/jpg;base64," + message;
        imagenURL.value = imageUrl;
        imageList.value.push(imageUrl);
        console.log("Imagen recibida")
      })
    };

    const descargarImagen = () => {
      if (imagenURL.value) {
        const a = document.createElement('a');
        a.href = imagenURL.value;
        a.download = 'foto' + count.value + '.png';
        a.click();
        count.value++;
        console.log("Imagen descargada")
      }
    };

    const showGallery = () => {
      showGal.value = true;
    }

    const goBack = () => {
      showGal.value = false; // Ocultar la galería al presionar el botón "Back"
    };

    const showPrevious = () => {
      console.log('currentIndex', currentImageIndex.value)
      if (currentImageIndex.value >= 0) {
        currentImageIndex.value--;
        imagenURL.value = imageList.value[currentImageIndex.value];
      }
    };

    const showNext = () => {
      console.log('currentIndex', currentImageIndex.value)
      if (currentImageIndex.value < imageList.value.length - 1) {
        currentImageIndex.value++;
        imagenURL.value = imageList.value[currentImageIndex.value];
      }
    };

    onMounted(() => {
      mostrarImagen();
    });

    return {
      mqttHook,
      count,
      imagenURL,
      descargarImagen,
      showGallery,
      goBack,
      showPrevious,
      showNext,
      imageList,
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
  top:450px;
  left: 50px;
  width: 100px;
  height: 100px;
}

.buttonForward{
  position: absolute;
  top: 450px;
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

.image-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumbnail {
  max-width: 100px; /* Tamaño máximo de las miniaturas */
  max-height: 100px; /* Tamaño máximo de las miniaturas */
}
</style>