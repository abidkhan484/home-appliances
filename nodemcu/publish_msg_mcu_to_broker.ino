#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// define the GPIO connected with Relays and switches
#define LED_LIGHT 4 // GPIO 4 D2
#define LED_FAN 0 // GPIO 0 D3

// WiFi
const char *ssid = "wifi_user"; // Enter your WiFi name
const char *password = "password";  // Enter WiFi password

// MQTT Broker
const char *mqtt_broker = "3.1.83.232";
const char *topic_light = "home/light";
const char *topic_fan = "home/fan";
const char *mqtt_username = "polymath";
const char *mqtt_password = "pass word";
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  // Set software serial baud to 115200;
  Serial.begin(115200);
  // connecting to a WiFi network
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
  //connecting to a mqtt broker
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);
  while (!client.connected()) {
      String client_id = "esp8266-client-";
      client_id += String(WiFi.macAddress());
      Serial.printf("The client %s connects to the public mqtt broker\n", client_id.c_str());
      if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
          Serial.println("connected, mqtt broker: "+ String(mqtt_broker));
      } else {
          Serial.print("failed with state ");
          Serial.print(client.state());
          delay(2000);
      }
  }
  // publish and subscribe from topic_light
  client.publish(topic_light, "hi, broker from topic home/light");
  client.subscribe(topic_light);
  // publish and subscribe from topic_fan
  client.publish(topic_fan, "hi, broker from topic home/fan");
  client.subscribe(topic_fan);
}

void callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message:");

  String message;
  for (int i = 0; i < length; i++) {
    message = message + (char) payload[i]; // convert *byte to char
  }
  int commandTopic;
  if (String(topic) == String(topic_light)) {
    commandTopic = LED_LIGHT;
  }
  else if (String(topic) == String(topic_fan)) {
    commandTopic = LED_FAN;
  }

  Serial.print(message);
  if (message == "on") { digitalWrite(commandTopic, LOW); }   // LED on
  if (message == "off") { digitalWrite(commandTopic, HIGH); } // LED off
  Serial.println();
  Serial.println("-----------------------");
}

void loop() {
  client.loop();
}
