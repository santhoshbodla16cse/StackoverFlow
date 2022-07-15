const kafkaRequestResponse = require('./kafkaRequestResponse.js')
const kafka = new kafkaRequestResponse()

exports.sendKafkaRequest = (topicName, payload, cb) => {
    console.log("1. Sending request to kafka for topic: ", topicName)
    kafka.kafkaRequest(topicName, payload, (err, res) => {
        if (err) return cb(err, null)
        return cb(null, res)
    })
}