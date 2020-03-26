//We're going to use a topic exchange in our logging system. We'll start off with a working assumption that the routing keys of logs will have two words: "<facility>.<severity>".

/* 
to emit a log with a routing key "kern.critical":
$ node emit_log_topic.js "kern.critical" "A critical KERNEL error"

$ node emit_log_topic.js "*.critical" "A critical ANY error"

$ node emit_log_topic.js "cron.critical" "A critical CRON error"


see receive_log_topic.js for other binding examples

*/



var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'topic_logs';
    var args = process.argv.slice(2);
    var key = (args.length > 0) ? args[0] : 'anonymous.info';
    var msg = args.slice(1).join(' ') || 'Hello World!';

    channel.assertExchange(exchange, 'topic', {
      durable: false
    });
    channel.publish(exchange, key, Buffer.from(msg));
    console.log(" [x] Sent %s:'%s'", key, msg);
  });

  setTimeout(function() { 
    connection.close(); 
    process.exit(0) 
  }, 500);
});