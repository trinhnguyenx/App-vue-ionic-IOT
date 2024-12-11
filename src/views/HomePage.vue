<template>
  <IonPage class="container">
    <IonContent class="ion-padding">
      <div class="boundary-header">
        <div class="custom-icon">
          <IonLabel class="custom-label"><h1>Control device</h1></IonLabel>
        </div>
      </div>

      <div class="device-container">
        <!-- Điều khiển đèn -->
        <div class="device-card">
          <IonIcon class="device-icon" />
          <div class="device-info">
            <IonLabel class="device-label">Set Light</IonLabel>
            <IonToggle
              v-model="deviceStates.light"
              @ionChange="toggleDeviceState('light')"
            />
          </div>
        </div>

        <!-- Điều khiển quạt -->
        <div class="device-card">
          <IonIcon class="device-icon" />
          <div class="device-info">
            <IonLabel class="device-label">Set Fans</IonLabel>
            <IonToggle
              v-model="deviceStates.fan"
              @ionChange="toggleDeviceState('fan')"
            />
          </div>
        </div>

        <!-- Điều khiển cửa -->
        <div class="device-card">
          <IonIcon class="device-icon" />
          <div class="device-info">
            <IonLabel class="device-label">Set Door</IonLabel>
            <IonToggle
              v-model="deviceStates.door"
              @ionChange="toggleDeviceState('door')"
            />
          </div>
        </div>
        <div class="device-card">
          <IonIcon class="device-icon" />
          <div class="device-info">
            <IonLabel class="device-label">All Device</IonLabel>
            <IonToggle
              v-model="allDevicesState"
              @ionChange="toggleDeviceState('all')"
            />
          </div>
        </div>
      </div>
      <div  class="custom-text-record">
        <p>{{ text_command }}</p>
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
import { VoiceRecorder } from 'capacitor-voice-recorder';
import { notify } from "@/utils/toast";

const deviceStates = ref({
  light: false,
  fan: false,
  door: false,
});
const allDevicesState = ref(false);
const path = ref('https://fbb0-35-229-147-31.ngrok-free.app')

const isRecording = ref(false);
const text_command = ref('Voice command');
let audioFilePath = null;


// Kiểm tra khả năng ghi âm của thiết bị
const canRecordAudio = async () => {
  const response = await VoiceRecorder.canDeviceVoiceRecord();
  return response.value;
};

// Kiểm tra quyền ghi âm
const checkPermissions = async () => {
  const permission = await VoiceRecorder.hasAudioRecordingPermission();
  return permission.value;
};

// Yêu cầu quyền ghi âm nếu chưa có
const requestPermissions = async () => {
  const permission = await VoiceRecorder.requestAudioRecordingPermission();
  return permission.value;
};

// Toggle ghi âm
const toggleRecording = async () => {
  isRecording.value = !isRecording.value;
  if (isRecording.value) {
    const canRecord = await canRecordAudio();
    if (!canRecord) {
      console.log("Device does not support audio recording.");
      return;
    }

    const hasPermission = await checkPermissions();
    if (!hasPermission) {
      const granted = await requestPermissions();
      if (!granted) {
        console.log("Permission denied to access microphone.");
        return;
      }
    }
    
    await startRecording();
    setTimeout(async () => {
      await stopRecording();
      isRecording.value = false;
    }, 2000);
  }
};

// Bắt đầu ghi âm
const startRecording = async () => {
  try {
    const result = await VoiceRecorder.startRecording();
    audioFilePath = result.value.recordDataBase64;
  } catch (error) {
    console.error("Error starting recording:", error.message);
  }
};

const stopRecording = async () => {
  try {
    const result = await VoiceRecorder.stopRecording();
    console.log("Recording stopped:", result);
    
    if (result.value && result.value.recordDataBase64) {
      audioFilePath = result.value.recordDataBase64;  

      // Chuyển base64 thành Blob trước khi gửi lên server
      const audioBlob = base64ToBlob(audioFilePath);

      // Kiểm tra xem audioBlob có phải là một Blob không
      if (audioBlob instanceof Blob) {
        console.log("Successfully created audioBlob:", audioBlob);
        await sendAudioToServer(audioBlob);
      } else {
        console.error("Failed to create a valid audioBlob.");
      }
    } else {
      console.error("No audio data received from recording.");
    }
  } catch (error) {
    console.error("Error stopping recording:", error.message);
  }
};

// Chuyển đổi Base64 thành Blob
const base64ToBlob = (base64Data) => {
  const binaryString = atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return new Blob([bytes], { type: "audio/wav" });
};

// Gửi âm thanh lên server
const sendAudioToServer = async (audioBlob) => {
  const formData = new FormData();
  formData.append('file', audioBlob, 'audio.wav');

  try {
    const response = await fetch(`${path.value}/send-audio-command/`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const responseJson = await response.json();
      handleDeviceCommand(responseJson.command);
      text_command.value = responseJson.you;
    } else {
      const errorText = await response.text();
      console.error('Failed to send audio:', errorText);
    }
  } catch (error) {
    console.error('Error uploading audio:', error);
  }
};

const handleDeviceCommand = (command) => {
  switch (command) {
    case 'light-on':
      deviceStates.value.light = true;
      break;
    case 'light-off':
      deviceStates.value.light = false;
      break;
    case 'fan-on':
      deviceStates.value.fan = true;
      break;
    case 'fan-off':
      deviceStates.value.fan = false;
      break;
    case 'door-open':
      deviceStates.value.door = true;
      break;
    case 'door-close':
      deviceStates.value.door = false;
      break;
    case 'devices-on':
      allDevicesState.value = true;
      deviceStates.value.door = true;
      deviceStates.value.fan = true;
      deviceStates.value.light = true;
      break;
    case 'devices-off':
      allDevicesState.value = false;
      deviceStates.value.door = false;
      deviceStates.value.fan = false;
      deviceStates.value.light = false;
      break;
    default:
      notify.error('Unknown command received:', command);
      return;
  }
  allDevicesState.value = deviceStates.value.light && deviceStates.value.fan && deviceStates.value.door;
};

const toggleDeviceState = async (device) => {
  let command;
  switch (device) {
    case 'light':
      command = deviceStates.value.light ? 'light-on' : 'light-off';
      break;
    case 'fan':
      command = deviceStates.value.fan ? 'fan-on' : 'fan-off';
      break;
    case 'door':
      command = deviceStates.value.door ? 'door-open' : 'door-close';
      break;
    case 'all':
      command = allDevicesState.value ? 'devices-on' : 'devices-off';
      handleDeviceCommand(command);
      break;
    default:
      notify.error('Invalid device state toggle');
      return;
  }

  try {
    const response = await fetch(`https://fbb0-35-229-147-31.ngrok-free.app/manual?raw_command=${command}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      console.log(`${device} state updated successfully`);
    } else {
      const errorText = await response.text();
      console.error('Failed to control device:', errorText);
    }
  } catch (error) {
    console.error('Error calling control device API:', error);
  }
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
