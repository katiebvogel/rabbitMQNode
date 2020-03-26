This project contains javascript files from 
https://github.com/rabbitmq/rabbitmq-tutorials 

To run the files: 

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
``` node send.js ```
``` node receive.js ```

### Example Two: "Work Queues":
``` node new_task.js "This task takes two seconds.." ``` 
Or
``` node new_task.js "this task takes four seconds...." ```
``` node worker.js ```

### Example Three: "Pub/Sub":
``` node receive_logs.js ```
``` node emit_logs.js "info: this is a message log" ```

### Example Four: "Routing":
``` node receive_directLogs.js info ``` 
Or 
``` node receive_directLogs.js error ```

``` node emit_directLogs.js info "here is an info message" ```
OR 
``` node emit_directLogs.js error "here is an error msg " ```

### Example Five: "Topics":
``` node receive_log_topic.js "*.rabbit" ```
See comments in file for more examples
``` node emit_log_topic.js red.rabbit Hello ```

### Example Six: "RPC":
``` node rpc_server.js ```
``` node rpc_client.js ```