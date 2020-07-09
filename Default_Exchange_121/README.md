-- One to one 




channel.assertQueue('task_queue', {durable: true});
TO MAKE QUEUE DURABLE 


channel.sendToQueue(queue, Buffer.from(msg), {persistent: true});
TO make messages durable 