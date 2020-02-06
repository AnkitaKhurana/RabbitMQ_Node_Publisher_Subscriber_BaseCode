const amqp = require('amqplib') ;//Advance message queue protocol 

// make connection to rabbitmq server 
connect();
async function connect(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        
        console.log('Waiting for messages....')
        channel.consume("jobs", msg=>{
            console.log(msg.content.toString());
            
            // Acknowledge the consumer received the msg, now remove from queue
            channel.ack(msg);
        });
    }
    catch(ex){
        console.log(ex);
    }
}