
const mqtt = require("mqtt");

// MQTT broker
const MQTT_BROKER = "mqtt://broker.hivemq.com:1883";

// Topic for therapy commands
const MQTT_TOPIC = "theraease/therapy";

const client = mqtt.connect(MQTT_BROKER);

client.on("connect", () => {
  console.log("MQTT Connected successfully!");
});

client.on("error", (error) => {
  console.error("MQTT Connection Error:", error.message);
});

client.on("reconnect", () => {
  console.log("MQTT reconnecting...");
});

function publishTherapy(data) {
  if (!client.connected) {
    console.log("MQTT is not connected");
    return false;
  }

  client.publish(
    MQTT_TOPIC,
    JSON.stringify(data),
    { qos: 0 },
    (error) => {
      if (error) {
        console.error("MQTT Publish Error:", error.message);
      } else {
        console.log("MQTT Published:", data);
      }
    }
  );

  return true;
}

module.exports = {
  client,
  publishTherapy,
  MQTT_TOPIC,
};
