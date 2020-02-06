const amqp = require('amqplib') ;//Advance message queue protocol 

const msg = {
    data:"some data...."
};
// make connection to rabbitmq server 
connect();
async function connect(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();

        // publish to queue 
        const result = await channel.assertQueue("jobs");
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        // can close the connection here -- after jobs sent successfully 
        console.log('Job sent successfully');

    }
    catch(ex){
        console.log(ex);
    }
}