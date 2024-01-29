<template>
  <ion-page style="background-color: rgb(65, 65, 65);">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title class="ion-text-center" style="font-size: 1em;">PANORAMIC PAGE</ion-title>
      </ion-toolbar>
    </ion-header>
    <div style="display: flex; margin-top: 50px; margin-left: 20px; margin-right: 20px; position: relative; margin-bottom: 50px;">
      <div style="display: flex; position: relative;">
        <img :src="imagenURL" v-if="imagenURL" style="position: relative; width: 100%; height: 90%; top: -120px;" />
      </div>
    </div>
    <div class="descarga" style="display:flex; justify-content: center; height: 300px;">
      <div style ="display: flex; justify-content: center;">
        <ion-button fill ="solid" style="border-style: default; width: 220px; height: 40px;" @click="descargarImagen">Descargar Panoramica</ion-button>
      </div>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonIcon} from '@ionic/vue';
import { useMQTT } from 'mqtt-vue-hook';
import { ref, inject, onMounted, defineComponent} from 'vue';

export default defineComponent({
  name: 'PanoramicPage',
  components: {  
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonIcon
  },

  setup() {
    const mqttHook = useMQTT();
    const count = ref(0);
    const imagenURL = ref('/public/entrada.png');
    //const imagenURL = ref<string | null>(null);

    const mostrarImagen = () => {
      console.log('mostrar');
    
      mqttHook.subscribe(["PanoramicaAnna"],0);
      console.log('suscribe panoramic')
      mqttHook.registerEvent('PanoramicaAnna', (topic, message) => {
        console.log("Received image from MQTT");
        console.log(message)
        const imageUrl = "data:image/jpg;base64," + message;
        imagenURL.value = imageUrl;
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

    onMounted(() => {
      console.log('empieza')
      mostrarImagen();
      console.log('acaba')
    });

    return {
      mqttHook,
      count,
      imagenURL,
      descargarImagen,
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

.descarga{
  position: absolute;
  top:550px;
  left:100px;
}
</style>