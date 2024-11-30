<template>
  <IonPage class="container">
    <IonContent class="ion-padding">
      <div class="boundary-header">
        <IonLabel class="custom-label"><h1>Control device</h1></IonLabel>
      </div>

      <div class="device-container">
        <!-- Điều khiển đèn -->
        <div class="device-card">
          <IonIcon name="bulb-outline" class="device-icon" />
          <div class="device-info">
            <IonLabel class="device-label">Set Light</IonLabel>
            <IonToggle
              v-model="deviceStates.light"
              @ionChange="toggleDevice('light')"
            />
          </div>
        </div>

        <!-- Điều khiển quạt -->
        <div class="device-card">
          <IonIcon name="fan-outline" class="device-icon" />
          <div class="device-info">
            <IonLabel class="device-label">Set Fans</IonLabel>
            <IonToggle
              v-model="deviceStates.fan"
              @ionChange="toggleDevice('fan')"
            />
          </div>
        </div>

        <!-- Điều khiển cửa -->
        <div class="device-card">
          <IonIcon name="lock-open-outline" class="device-icon" />
          <div class="device-info">
            <IonLabel class="device-label">Set Door</IonLabel>
            <IonToggle
              v-model="deviceStates.door"
              @ionChange="toggleDevice('door')"
            />
          </div>
        </div>
      </div>
      <!-- Ghi âm -->
      <div class="recording-container">
        <button class="recording-button" @click="toggleRecording">
          <IonIcon
            class="custom-icon-record"
            :icon="isRecording ? micCircleOutline : micOffCircleOutline"
          />
        </button>
      </div>
      <div class="custom-text-record">
        <p class="recording-status">
          {{ isRecording ? "Recording..." : "Press the microphone to record" }}
        </p>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { ref } from "vue";
import { IonPage, IonContent, IonIcon, IonLabel, IonToggle } from "@ionic/vue";
import { micCircleOutline, micOffCircleOutline } from "ionicons/icons";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


const deviceStates = ref({
  light: false,
  fan: false,
  door: false,
});
const isRecording = ref(false);
let mediaRecorder = null;
let audioChunks = [];
let mediaStream = null;

const toggleRecording = () => {
  isRecording.value = !isRecording.value;
  if (isRecording.value) {
    startRecording()
    setTimeout(() => {
      stopRecording();
      isRecording.value = false;
    }, 4000);
  }
};
//Ghi âm
const startRecording = async () => {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);  
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    //   sendAudioToServer(audioBlob);  
    downloadAudioApp(audioBlob);
      audioChunks = []; 
    };
    mediaRecorder.start();
  } catch (error) {
    console.error('Lỗi khi bắt đầu ghi âm:', error);
  }
};
//stop
const stopRecording = () => {
  mediaRecorder.stop();
  mediaStream.getTracks().forEach(track => track.stop());
};

const sendAudioToServer = async (audioBlob) => {
  const formData = new FormData();
  formData.append('file', audioBlob, 'audio.wav');

  try {
    const response = await fetch('https://536311625b6f3ae6bd.gradio.live', {
      method: 'GET',
      body: formData,
    });

    if (response.ok) {
      console.log('Gửi thành công');
    } else {
      console.log('Lỗi khi gửi âm thanh');
    }
  } catch (error) {
    console.error('Lỗi khi gửi dữ liệu:', error);
  }
};
//control
const toggleDevice = (device) => {
  console.log(`${device} changed: ${deviceStates.value[device]}`);
};
//download
const downloadAudio = (audioBlob) => {
  const audioUrl = URL.createObjectURL(audioBlob);
  const link = document.createElement('a');  
  link.href = audioUrl;  
  link.download = 'recording.wav';  
  document.body.appendChild(link);
  link.click();  
  document.body.removeChild(link); 
};
  const saveAudioToDevice = async (audioBlob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    const arrayBuffer = await fetch(audioUrl).then(response => response.arrayBuffer());
    const uint8Array = new Uint8Array(arrayBuffer);

    try {
      const fileName = 'recording.wav';
      const result = await Filesystem.writeFile({
        path: fileName,
        data: uint8Array,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      console.log('File saved successfully!', result.uri);
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };
const downloadAudioApp = (audioBlob) => {
  saveAudioToDevice(audioBlob);
};


</script>

<style scoped>
.container {
  background-color: #ffffff !important;
  color: #000;
}

.device-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 50px;
}

.device-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  padding: 12px 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.device-icon {
  font-size: 28px;
  color: #4caf50;
  margin-right: 12px;
}

.device-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.device-label {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.device-toggle {
  --handle-background: #fc6564;
  --background-checked: #fc6564;
}
.custom-label {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
}

ion-toggle {
  --handle-background: #ffffff;
  --handle-background-checked: #eb7769;
  --track-background: #ddd;
  --track-background-checked: #ddd;
}

ion-toggle::part(track) {
  height: 20px;
  width: 40px;

  overflow: visible;
}
.boundary-header {
  background-color: #fc6564;
  padding: 10px;
  border-radius: 30px;
  margin: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

.recording-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}

.recording-button {
  background-color: #f44336;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
}
.custom-text-record {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 600;
}
.custom-icon-record {
  font-size: 40px;
  color: #ffffff;
}
</style>
