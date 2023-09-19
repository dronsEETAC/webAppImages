<template>
    <ion-page>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar>  
    
          <ion-tab-button tab="HomePage" href='/home'>
              <ion-icon :icon="homeOutline" />
          <ion-label>Home Page</ion-label>
          </ion-tab-button>
            
          <ion-tab-button tab="Video" href='/video'>
            <ion-icon :icon="videocamOutline" />
            <ion-label>Video Page</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="Photo" href='/photo'>
            <ion-icon :icon="cameraOutline" />
            <ion-label>Photo Page</ion-label>
          </ion-tab-button>
  
        </ion-tab-bar>
      </ion-tabs>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
  import { homeOutline, cameraOutline, videocamOutline} from 'ionicons/icons';
  
  export default defineComponent({
    name: 'TabsPage',
    components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
    setup() {
      return {
        homeOutline,
        cameraOutline, 
        videocamOutline
      }
    }
  });
  </script>