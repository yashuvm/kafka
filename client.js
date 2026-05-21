const { Kafka } = require("kafkajs")

const kafka = new Kafka({
    brokers: ["192.168.1.2:9092"],
    clientId: "zomato-app"
})

module.exports = {
    kafka: kafka
}