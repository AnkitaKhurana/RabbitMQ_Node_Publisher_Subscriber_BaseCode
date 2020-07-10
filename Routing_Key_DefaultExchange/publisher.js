
const amqp = require('amqplib') ;//Advance message queue protocol 

connect();
async function connect(){
    try{
        let exchange = 'routing_DirectExchange';
        let queueName1 = 'routing_Direct_q1';
        let queueName2 = 'routing_Direct_q2';

        let msg = process.argv.slice(2).join(' ') || 'Hello World!';

        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
         
        await channel.assertExchange(exchange, 'direct', {
            durable: false
        });

        await channel.bindQueue(queueName1, exchange, 'key1');
        await channel.bindQueue(queueName2, exchange, 'key2');

        channel.publish(exchange, 'key1', Buffer.from(msg+'1'));
        channel.publish(exchange, 'key2', Buffer.from(msg+'2'));

    }
    catch(ex){
        console.log(ex);
    }
}