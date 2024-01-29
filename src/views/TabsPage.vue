<template>
    <ion-page>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar>  

          <ion-tab-button tab="Photo" href='/photo'>
            <ion-icon :icon="cameraOutline" />
            <ion-label>Photo</ion-label>
          </ion-tab-button>
    
          <ion-tab-button tab="Panoramica" href='/panoramica'>
              <ion-icon :icon="imagesOutline" />
          <ion-label>Panoramic</ion-label>
          </ion-tab-button>
            
          <ion-tab-button tab="Video" href='/video'>
            <ion-icon :icon="videocamOutline" />
            <ion-label>Video</ion-label>
          </ion-tab-button>
  
        </ion-tab-bar>
      </ion-tabs>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
  import { imagesOutline, cameraOutline, videocamOutline} from 'ionicons/icons';
  
  export default defineComponent({
    name: 'TabsPage',
    components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
    setup() {
      return {
        imagesOutline,
        cameraOutline, 
        videocamOutline, 
      }
    }
  });
  </script>