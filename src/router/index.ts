import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import PanoramicaPage from '../views/PanoramicaPage.vue';
import VideoPage from '../views/VideoPage.vue';
import PhotoPage from '../views/PhotoPage.vue';
import TabsPage from '../views/TabsPage.vue';
import FilePage from '../views/VideoFile.vue';
import ControlPage from '../views/ControlPage.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: TabsPage,
    children: [
      {
        path: '/panoramica',
        name: 'panoramica',
        component: PanoramicaPage,
      },
      {
        path: '/video',
        name: 'video',
        component: VideoPage,
      },
      {
        path: '/photo',
        name: 'photo',
        component: PhotoPage,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
