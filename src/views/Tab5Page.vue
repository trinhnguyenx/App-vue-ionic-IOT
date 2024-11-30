<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title>Settings</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <ion-button expand="block" @click="handleshowAlert">Log Out</ion-button>

        <IonAlert
      :isOpen="showAlert"
      onDidDismiss="() => showAlert.value = false"
      header="Notification"
      message="Do you want shutdown application ?"
      :buttons="[ 
        {
          text: 'OK',
          handler: () => {
            handleLogout();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            router.push('/tabs/settings');
          }
        }
      ]"
    />
      </ion-content>
    </ion-page>
  </template>


  <style scoped>
    ion-button {
    --background: #fc6564;
    --background-hover: #9ce0be;
  }
    icon-title {
      font-size: 1.5em;
      font-weight: 800;
    }
</style>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IonPage, IonButton, IonAlert, IonContent, IonTitle } from '@ionic/vue';
  import { useRouter} from 'vue-router';
  const router = useRouter();

  
  const showAlert = ref(false);
  
  const handleLogout = () => {
    localStorage.clear();
    router.push('/auth/login');
};
const handleshowAlert = () => {
    showAlert.value = !showAlert.value;
};
</script>