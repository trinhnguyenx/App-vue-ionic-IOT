#include <ESP8266WiFi.h>
#include <Servo.h>

const char* ssid     = "THAO VINH T2";
const char* password = "88888888";

WiFiServer server(80);
String header;

unsigned long currentTime = millis();
unsigned long previousTime = 0; 
const long timeoutTime = 2000;


int ledPin1 = D1;
int ledPin2 = D2;
bool lightState = false;

int pinFan1 = D5;
int pinFan2 = D6;
int enFan = D7;
bool fanState = false;

Servo myDoor;
int pinDoor = D8;
bool doorState = false;


void startWifi(){

  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

}


void setUpFirstStart(){

  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  digitalWrite(ledPin1, LOW);
  digitalWrite(ledPin2, LOW);

  pinMode(enFan, OUTPUT);
  pinMode(pinFan1, OUTPUT);
  pinMode(pinFan2, OUTPUT);
  analogWrite(enFan, 0);
  digitalWrite(pinFan1, LOW);
  digitalWrite(pinFan2, LOW);

  myDoor.attach(pinDoor); 
  myDoor.write(0);

}


void setup() {

  Serial.begin(115200);
  delay(100);

  setUpFirstStart();
  delay(500);

  startWifi();
  delay(100);

  server.begin();
  delay(100);

}


void controlLed(bool controlState){

  if (lightState == false && controlState == true){
    Serial.println("Light on");
    lightState = true;
    digitalWrite(ledPin1, HIGH);
    digitalWrite(ledPin2, HIGH);
  }
  else if (lightState == true && controlState == false){
    Serial.println("Light off");
    lightState = false;
    digitalWrite(ledPin1, LOW);
    digitalWrite(ledPin2, LOW);
  }

}

void controlDoor(bool controlState){
  
  if (doorState == false && controlState == true){
    Serial.println("Door open");
    doorState = true;
    myDoor.write(150);
  }
  else if (doorState == true && controlState == false){
    Serial.println("Door close");
    doorState = false;
    myDoor.write(0);
  }

  delay(500);

}

void controlFan(bool controlState){
  
  if (fanState == false && controlState == true){
    Serial.println("Fan on");
    fanState = true;

    digitalWrite(pinFan1, HIGH);
    digitalWrite(pinFan2, LOW);
    analogWrite(enFan, 150);

  }
  else if (fanState == true && controlState == false){
    Serial.println("Fan off");
    fanState = false;

    digitalWrite(pinFan1, LOW);
    digitalWrite(pinFan2, LOW);
    analogWrite(enFan, 0);
  }

}


void loop(){

  WiFiClient client = server.available();   

  if (client) {     

    Serial.println("New Client");

    String currentLine = "";                
    currentTime = millis();
    previousTime = currentTime;

    while (client.connected() && currentTime - previousTime <= timeoutTime) {

      currentTime = millis(); 

      if (client.available()) {   

        char c = client.read();             
        Serial.write(c);                    
        header += c;

        if (c == '\n') {                    

          if (currentLine.length() == 0) {

            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println("Connection: close");
            client.println();
            
            if (header.indexOf("GET /light-on") >= 0) {
              controlLed(true);
            } 
            else if (header.indexOf("GET /light-off") >= 0) {
              controlLed(false);
            }
            else if (header.indexOf("GET /door-open") >= 0) {
              controlDoor(true);
            }
            else if (header.indexOf("GET /door-close") >= 0) {
              controlDoor(false);
            }
            else if (header.indexOf("GET /fan-on") >= 0) {
              controlFan(true);
            }
            else if (header.indexOf("GET /fan-off") >= 0) {
              controlFan(false);
            }
            else if (header.indexOf("GET /devices-on") >= 0){
              controlDoor(true);
              controlLed(true);
              controlFan(true);
            }
            else if (header.indexOf("GET /devices-off") >= 0){
              controlDoor(false);
              controlLed(false);
              controlFan(false);
            } 
            
            break;

          } 
          else currentLine = "";

        } 
        else if (c != '\r') currentLine += c;

      }

    }

    header = "";
    client.stop();
    Serial.println("Client disconnected.");
    Serial.println("");

  }

}