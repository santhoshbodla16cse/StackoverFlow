const express = require('express')
const app = express()
const { sequelize } = require("./models/mysql/index");
const dotenv = require('dotenv')

dotenv.config();

const PORT = process.env.PORT || 8585

app.use(express.json())

const mongoDbUrl = "mongodb+srv://stackoverflow:stackoverflow@cluster0.rukm9.mongodb.net/stackoverflow?retryWrites=true&w=majority";
const mongoose = require('mongoose');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 50
};

mongoose.connect(mongoDbUrl, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

const kafkaConection = require('./kafka/KafkaConnect')
const kafkaTopics = require('../util/kafkaTopics.json')
const UserService = require('./services/UserService')
const PostService = require('./services/PostService')
const MessageService = require("./services/MessageService")
const BadgeService = require('./services/BadgeService')
const TagService = require('./services/TagService')

function handleTopicRequest(topic_name, serviceObject) {
    kafkaConection.getConsumer(topic_name, (consumer) => {
        var producer = kafkaConection.getProducer()

        consumer.on('message', function (message) {
            var data = JSON.parse(message.value)
            const { payload, correlationId } = data
            console.log("1. Consumed Data at backend...")

            serviceObject.handle_request(payload, (err, res) => {
                let payload = {
                    correlationId: correlationId
                }
                if (err) {
                    console.log("Service failed with Error: ", err);
                    payload.status = 400;
                    payload.content = err;
                }

                if (res) {
                    payload.status = 200;
                    payload.content = res;
                }

                //Send Response to acknowledge topic
                let payloadForProducer = [
                    {
                        topic: kafkaTopics.ACKNOWLEDGE_TOPIC,
                        messages: JSON.stringify({ "acknowledgementpayload": true, payload }),
                        partition: 0
                    }
                ];
                producer.send(payloadForProducer, (err, data) => {
                    if (err) throw err
                    console.log("2. Sent Acknowledgement ...\n", data)
                })
            })
        })
    })
}

handleTopicRequest(kafkaTopics.USERS_TOPIC, UserService);
handleTopicRequest(kafkaTopics.POSTS_TOPIC, PostService);
handleTopicRequest(kafkaTopics.MESSAGES_TOPIC, MessageService);
handleTopicRequest(kafkaTopics.TAGS_TOPIC, TagService);

BadgeService.startBadgeConsumer();

app.listen(PORT, (req, res) => {
    console.log("Server running on port - ", PORT);
});