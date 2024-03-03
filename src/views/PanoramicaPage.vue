<template>
  <ion-page style="background-color: rgb(65, 65, 65);">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title class="ion-text-center" style="font-size: 1em;">PANORAMIC PAGE</ion-title>
      </ion-toolbar>
    </ion-header>
      <div v-if = "recibido" style="display: flex; position: relative;">
        <img :src="imagenURL"  class = "rotate90"/>
      </div>
      <div v-if = "!recibido" style="display: flex; position: relative;">
        <img :src="imagenURL"/>
      </div>

      <div style ="display: flex; justify-content: center">
        <ion-button v-if = "recibido" fill="solid" expand = 'full' color='success' @click="descargarImagen">Descargar foto de grupo</ion-button>
        <ion-button v-if = "!recibido"  fill="solid" expand = 'full'>Esperando foto de grupo</ion-button>
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
    let recibido = ref (false);
    let imagenURL = ref('/public/entrada.png');
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
        recibido.value = true
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
        recibido.value = false
        imagenURL.value = '/public/entrada.png';
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
      recibido
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
.rotate90 {
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
}
</style>
