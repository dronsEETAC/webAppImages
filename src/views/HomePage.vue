<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title class="ion-text-center">HOME PAGE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
       <ion-button  v-if = "broker == 'hivemq'" expand="full" color="danger"  @click="changeBroker">Cambia a dronseetac</ion-button>
       <ion-button  v-if = "broker == 'dronseetac'"  expand="full" color="danger"  @click="changeBroker">Cambia a hivemq</ion-button>
    </ion-content>


     
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton,IonInput } from '@ionic/vue';
import { useMQTT } from 'mqtt-vue-hook';
import { defineComponent, ref, onMounted } from 'vue';

export  default defineComponent({
  name: 'HomePage',
  components:{  
    IonContent,IonHeader,IonPage,IonTitle,IonToolbar, IonButton, IonInput
  },
  setup(){
    const mqttHook = useMQTT()
    let broker = ref('dronseetac');
    onMounted(() =>{
      //mqttHook.publish("IonicTutorial/gate/connectPlatform","")
    })
    function changeBroker() {
      mqttHook.disconnect()
    
      if (broker.value == "dronseetac") {
        mqttHook.connect(`ws://broker.hivemq.com:8000/mqtt`, {
          clean: false,
          keepalive: 60,
          clientId: `mqtt_client_${Math.random().toString(16).substring(2, 10)}`,
          connectTimeout: 8000,
        })
        broker.value = "hivemq";
      } else {
        mqttHook.connect(`ws://dronseetac.upc.edu:8000/mqtt`, {
          clean: false,
          keepalive: 60,
          clientId: `mqtt_client_${Math.random().toString(16).substring(2, 10)}`,
          connectTimeout: 8000,
          username: 'dronsEETAC',
          password: 'mimara1456.'
        })
        broker.value = "dronseetac";

      }

    }   



    return{
       broker,
       changeBroker

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
