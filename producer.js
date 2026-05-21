const { kafka } = require("./client")
const readline = require('readline')


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})



async function init() {
    const producer = kafka.producer()

    console.log("Connecting producer")
    await producer.connect()
    console.log("Producer Connected Successfully")

    console.log("Producer send message")

    rl.setPrompt(">")
    rl.prompt()

    rl.on('line', async function (line) {
        const [riderName, location] = line.split(" ")

        await producer.send({
            topic: 'rider-updated',
            messages: [
                {
                    partition: location.toLowerCase() === 'north' ? 0 : 1,
                    key: "location-update",
                    value: JSON.stringify({ name: riderName, loc: location })
                },
            ]
        })

    }).on('close', async () => {
        console.log("Producer message send successfully")
        await producer.disconnect()
        console.log("Producer disconnected successfully")
    })





}

init()