
const { kafka } = require('./client')


async function init() {
    const admin = kafka.admin()
    console.log("Admin connected")
    admin.connect()
    console.log("Admin connection success")


    console.log("Creating Topics")
    await admin.createTopics({
        topics: [
            {
                topic: 'rider-updated',
                numPartitions: 2
            }

        ]
    })
    console.log("Topic crated success [rider-updated]")
    console.log("Admin disconnected")
    await admin.disconnect()
}

init()