<template>
  <ion-page class="bg-white">
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar class="tabbar-custom" slot="bottom">
        <ion-tab-button tab="tabs" href="/tabs/voice">
          <ion-icon class="custom-icon" aria-hidden="true" :icon="homeOutline" />
        </ion-tab-button>
        <ion-tab-button tab="tab5" href="/tabs/settings">
          <ion-icon  aria-hidden="true" :icon="settings" class="custom-icon" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs,IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { micCircle,homeOutline, settings } from 'ionicons/icons';
</script>

<style>
.tabbar-custom {
  --background: #FC6564;
  --border-color: #cbcbcb;
  --border-style: solid;
  --border-width: 1px;
  border: 1px solid #cbcbcb;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  overflow: hidden;
}

.add-btn {
  --background: #cbcbcb;
  border-radius: 10px;
  width: 40px;
  max-width: 40px;
  height: 40px;
  overflow: hidden;
  color: #000000;
  background-color: #cbcbcb;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5em;
  font-weight: 800;
}
.tab-selected .add-btn {
  color: #ffffff;
}
.button-inner{
  color: #ffffff;
}
.custom-icon {
  font-size: 2em;
  color: #ffffff;
}
</style>