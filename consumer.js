const { kafka } = require("./client")
const group = process.argv[2]


async function init() {
    const consumer = kafka.consumer({ groupId: group })
    await consumer.connect()
    console.log("Consumer connected successfully")

    await consumer.subscribe({ topics: ['rider-updated'], fromBeginning: false })
    console.log("Consumer subscribe successfully")
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`Group: ${group} [${topic}]: PART: [${partition}] DATA:`, message.value.toString())
            // console.log({
            //     key: message.key.toString(),
            //     value: message.value.toString(),
            //     headers: message.headers,
            // })
        },
    })

    // await consumer.disconnect()
    // console.log("Consumer disconnected successfully")
}

init()