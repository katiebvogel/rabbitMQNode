## Getting started with RabbitMQ with Node

#### This project contains javascript files from 
https://github.com/rabbitmq/rabbitmq-tutorials 

### To get started: 

1. RabbitMQ should be installed and running on localhost (port 15672)
- I used Homebrew to install rabbit-mq on MacOS
- Before running: ``` export PATH=$PATH:/usr/local/opt/rabbitmq/sbin ```
- To run: ``` rabbitmq-server ```
- go to: localhost:15672 and login with guest/guest to view 

2. Install amqp.node client library using npm 
- If starting a fresh node project, you can run ```npm install amqlib --save ``` to add to your dependencies
- or if using this repo, run ``` npm install ``` because amqlib is listed in package.json dependencies list

3. There are 6 tutorials represented in the files, which should be run in pairs (using separate terminal window/tabs)


### Example One: "Hello World": 
The producer sends a single message to a named queue, while the consumer receives it from that queue
``` node send.js ```

``` node receive.js ```

### Example Two: "Work Queues":
This example demonstrates how you can set up multiple consumers to run more complex tasks (simply simulated by a setTimeout()). If all the workers are busy, the tasks will keep adding to the queue.
This setup utilizes manual acknowledgement mode. and "The durability options let the tasks survive even if RabbitMQ is restarted."

``` node new_task.js "This task takes two seconds.." ```

Or

``` node new_task.js "this task takes four seconds...." ```

``` node worker.js ```

### Example Three: "Pub/Sub":
In this example, we publish to a named exchange, and include a routing key. This example uses the *fanout* exchange type. 

``` node receive_logs.js ```

``` node emit_logs.js "info: this is a message log" ```

if you want to save logs to a file in your directory: 

``` node receive_logs.js > logs_from_rabbit.log ``` 

Note: you can see the exchanges and bindings that are created when you login to your rabbitMQ web UI running on localhost


### Example Four: "Routing":
Here we see an extension of publish/subscribe where we publish and subscripe to specific subsets of messages by use of the *direct* exchange type.

``` node receive_directLogs.js info ``` 

Or 

``` node receive_directLogs.js error ```


``` node emit_directLogs.js info "here is an info message" ```

OR 

``` node emit_directLogs.js error "here is an error msg " ```

### Example Five: "Topics":
This examples uses a *topic* exchange type, which handles routing based on multiple criteria

``` node receive_log_topic.js "*.rabbit" ```

See comments in file for more examples

``` node emit_log_topic.js red.rabbit Hello ```

### Example Six: "RPC":
Remote Procedure Call (running a function on a remote computer and waiting for a result). This example uses a fibonacci calculator function for the remote procedure.

We want to correlate specific requests with specific responses. So we include a *correlation_id* . We also indicate a *reply_to* property from the client in the request message, so the server/RPC worker knows which queue to send the response back to.

``` node rpc_server.js ```

``` node rpc_client.js ```