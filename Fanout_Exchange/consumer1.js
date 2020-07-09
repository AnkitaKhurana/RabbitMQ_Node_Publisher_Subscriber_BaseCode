const amqp = require('amqplib') ;//Advance message queue protocol 

// make connection to rabbitmq server 
connect();
async function connect(){
    try{
        let queueName = 'fanoutQueue2';
        let exchange = 'fanoutExchange';
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName);
        await channel.assertExchange(exchange, 'fanout', {
            durable: false
        });
        await channel.bindQueue(queueName, exchange, '');
        await channel.consume(queueName, function(msg) {
            if(msg.content) {
                console.log(" [x] %s", msg.content.toString());
              }
          }, {
            noAck: true
        });

    }
    catch(ex){
        console.log(ex);
    }
}