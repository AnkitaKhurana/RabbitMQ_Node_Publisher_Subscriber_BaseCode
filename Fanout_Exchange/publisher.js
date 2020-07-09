
const amqp = require('amqplib') ;//Advance message queue protocol 

connect();
async function connect(){
    try{
        let exchange = 'fanoutExchange';
        let msg = process.argv.slice(2).join(' ') || 'Hello World!';

        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
         
        await channel.assertExchange(exchange, 'fanout', {
            durable: false
        });
        let queueName = 'fanoutQueue';

        // await channel.bindQueue(queueName, exchange, '');

        channel.publish(exchange, '', Buffer.from(msg));
    }
    catch(ex){
        console.log(ex);
    }
}