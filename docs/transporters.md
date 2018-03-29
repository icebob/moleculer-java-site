title: Transporters
---
Transporter is an important module if you are running services on multiple nodes. Transporter communicates with other nodes. It transfers events, calls requests and processes responses ...etc. If a service runs on multiple instances on different nodes, the requests will be load-balanced among live nodes.

## Built-in transporters

### TCP transporter ![Experimental transporter](https://img.shields.io/badge/status-experimental-orange.svg)
This is a no-dependency, zero-configuration TCP transporter. It uses [Gossip protocol](https://en.wikipedia.org/wiki/Gossip_protocol) to disseminate node statuses, service list and heartbeats. It contains an integrated UDP discovery feature to detect new and disconnected nodes on the network.
If the UDP is prohibited on your network, you can use `urls` option. It is a list of remote endpoints (host/ip, port, nodeID). It can be a static list in your configuration or a file path which contains the list.

>Please note, it is an **experimental** transporter. **Do not use it in production yet!**


<!-- **This TCP transporter is the default transporter in Moleculer**.
It means, you don't have to configure any transporter, just start the brokers/nodes, use same namespaces and the nodes will find each others.
>If you don't want to use transporter, set `transporter: null` in broker options.
-->

**Use TCP transporter with default options**
```js
const broker = new ServiceBroker({
    transporter: "TCP"
});
```

**All TCP transporter options with default values**
```js
const broker = new ServiceBroker({
    logger: true,
    transporter: {
        type: "TCP",
        options: {
            // Enable UDP discovery
            udpDiscovery: true,
            // Reusing UDP server socket
            udpReuseAddr: true,

            // UDP port
            udpPort: 4445,
            // UDP bind address (if null, bind on all interfaces)
            udpBindAddress: null,
            // UDP sending period (seconds)
            udpPeriod: 30,

            // Multicast address.
            udpMulticast: "239.0.0.0",
            // Multicast TTL setting
            udpMulticastTTL: 1,

            // Send broadcast (Boolean, String, Array<String>)
            udpBroadcast: false,

            // TCP server port. Null or 0 means random port
            port: null,
            // Static remote nodes address list (when UDP discovery is not available)
            urls: null,
            // Use hostname as preffered connection address
            useHostname: true,

            // Gossip sending period in seconds
            gossipPeriod: 2,
            // Maximum enabled outgoing connections. If reach, close the old connections
            maxConnections: 32,
            // Maximum TCP packet size
            maxPacketSize: 1 * 1024 * 1024            
        }
    }
});
```

**TCP transporter with static endpoint list**
```js
const broker = new ServiceBroker({
    nodeID: "node-1",
    logger: true,
    transporter: {
        type: "TCP",
        options: {
            udpDiscovery: false,
            urls: [
                "172.17.0.1:6000/node-1",
                "172.17.0.2:6000/node-2",
                "172.17.0.3:6000/node-3"                
            ],
        }
    }
});
```
_You don't need to set `port` because it find & parse the self TCP port from URL list._

**TCP transporter with shorthand static endpoint list**
It needs to start with `tcp://`.
```js
const broker = new ServiceBroker({
    nodeID: "node-1",
    transporter: "tcp://172.17.0.1:6000/node-1,172.17.0.2:6000/node-2,172.17.0.3:6000/node-3"
});
```

**TCP transporter with static endpoint list file**
```js
const broker = new ServiceBroker({
    nodeID: "node-1",
    transporter: "file://./nodes.json"
});
```

```js
// nodes.json
[
	"127.0.0.1:6001/client-1",
	"127.0.0.1:7001/server-1",
	"127.0.0.1:7002/server-2"
]
```

{% note info Serviceless node %}
Please note, you don't need to list all remote nodes. It's enough at least one node which is online. For example, you can create a "serviceless" gossiper node, which does nothing, just shares other remote nodes addresses by gossip messages. So all nodes need to know only the gossiper node address to be able to communicate with all other nodes.
{% endnote %}

### NATS Transporter ![Stable transporter](https://img.shields.io/badge/status-stable-green.svg)
Built-in transporter for [NATS](http://nats.io/).
> NATS Server is a simple, high performance open source messaging system for cloud-native applications, IoT messaging, and microservices architectures.

```js
let { ServiceBroker } = require("moleculer");

const broker = new ServiceBroker({
    nodeID: "server-1",
    transporter: "nats://nats.server:4222"
});
```

{% note info Dependencies %}
To use this transporter install the `nats` module with `npm install nats --save` command.
{% endnote %}

#### Examples
```js
// Connect to 'nats://localhost:4222'
const broker = new ServiceBroker({
    transporter: "NATS"
});

// Connect to a remote NATS server
const broker = new ServiceBroker({
    transporter: "nats://nats-server:4222"
});

// Connect with options
const broker = new ServiceBroker({
    transporter: {
        type: "NATS",
        options: {
            url: "nats://localhost:4222"
            user: "admin",
            pass: "1234"
        }
});

// Connect with TLS
const broker = new ServiceBroker({
    transporter: {
        type: "NATS",
        options: {
            url: "nats://localhost:4222"
            // More info: https://github.com/nats-io/node-nats#tls
            tls: {
                key: fs.readFileSync('./client-key.pem'),
                cert: fs.readFileSync('./client-cert.pem'),
                ca: [ fs.readFileSync('./ca.pem') ]
            }
        }
});
```

### Redis Transporter ![Stable transporter](https://img.shields.io/badge/status-stable-green.svg)
Built-in transporter for [Redis](http://redis.io/).

```js
let { ServiceBroker } = require("moleculer");

const broker = new ServiceBroker({
    nodeID: "server-1",
    transporter: "redis://redis.server:6379"
});
```
{% note info Dependencies %}
To use this transporter install the `ioredis` module with `npm install ioredis --save` command.
{% endnote %}

#### Examples
```js
// Connect with default settings
const broker = new ServiceBroker({
    transporter: "Redis"
});

// Connect with connection string
const broker = new ServiceBroker({
    transporter: "redis://localhost:6379"
});

// Connect with options
const broker = new ServiceBroker({
    transporter: {
        type: "Redis",
        options: {
            host: "redis-server",
            db: 0
        }
});
```

### MQTT Transporter ![Stable transporter](https://img.shields.io/badge/status-stable-green.svg)
Built-in transporter for [MQTT](http://mqtt.org/) protocol *(e.g.: [Mosquitto](https://mosquitto.org/))*.

```js
let { ServiceBroker } = require("moleculer");

const broker = new ServiceBroker({
    nodeID: "server-1",
    transporter: "mqtt://mqtt-server:1883"
});
```
{% note info Dependencies %}
To use this transporter install the `mqtt` module with `npm install mqtt --save` command.
{% endnote %}

#### Examples
```js
// Connect with default settings
const broker = new ServiceBroker({
    transporter: "MQTT"
});

// Connect with connection string
const broker = new ServiceBroker({
    transporter: "mqtt://mqtt-server:1883"
});

// Connect with options
const broker = new ServiceBroker({
    transporter: {
        type: "MQTT",
        options: {
            host: "mqtt-server",
            port: 1883,
        }
});
```

### AMQP Transporter ![Stable transporter](https://img.shields.io/badge/status-stable-green.svg)
Built-in transporter for [AMQP](https://www.amqp.org/) protocol *(e.g.: [RabbitMQ](https://www.rabbitmq.com/))*.

```js
let { ServiceBroker } = require("moleculer");

const broker = new ServiceBroker({
    nodeID: "server-1",
    transporter: "amqp://rabbitmq-server:5672"
});
```
{% note info Dependencies %}
To use this transporter install the `amqplib` module with `npm install amqplib --save` command.
{% endnote %}

#### Transporter options
You can pass options to `amqp.connect()` method.

```js
// Connect to 'amqp://guest:guest@localhost:5672'
const broker = new ServiceBroker({
    transporter: "AMQP"
});

// Connect to a remote server
const broker = new ServiceBroker({
    transporter: "amqp://rabbitmq-server:5672"
});

// Connect to a remote server with options & credentials
const broker = new ServiceBroker({
    transporter: {
        type: "AMQP",
        options: {
            url: "amqp://user:pass@rabbitmq-server:5672",
            eventTimeToLive: 5000,
            prefetch: 1
        }
});
```

### Kafka Transporter ![Experimental transporter](https://img.shields.io/badge/status-experimental-orange.svg)
Built-in transporter for [Kafka](https://kafka.apache.org/). It is a very simple implementation. It transfers Moleculer packets to consumers via pub/sub. There are not implemented offset, replay...etc features.

>Please note, it is an **experimental** transporter. **Do not use it in production yet!**

{% note info Dependencies %}
To use this transporter install the `kafka-node` module with `npm install kafka-node --save` command.
{% endnote %}

**Connect to Zookeeper**
```js
const broker = new ServiceBroker({
    logger: true,
    transporter: "kafka://192.168.51.29:2181"
});
```

**Connect to Zookeeper with custom options**
```js
const broker = new ServiceBroker({
    logger: true,
    transporter: {
        type: "kafka",
        options: {
            host: "192.168.51.29:2181",

            // KafkaClient options. More info: https://github.com/SOHU-Co/kafka-node#clientconnectionstring-clientid-zkoptions-noackbatchoptions-ssloptions
            client: {
                zkOptions: undefined,
                noAckBatchOptions: undefined,
                sslOptions: undefined
            },

            // KafkaProducer options. More info: https://github.com/SOHU-Co/kafka-node#producerclient-options-custompartitioner
            producer: {},
            customPartitioner: undefined,

            // ConsumerGroup options. More info: https://github.com/SOHU-Co/kafka-node#consumergroupoptions-topics
            consumer: {
            },

            // Advanced options for `send`. More info: https://github.com/SOHU-Co/kafka-node#sendpayloads-cb
            publish: {
                partition: 0,
                attributes: 0
            }               
        }
    }

});
```
### NATS Streaming (STAN) Transporter ![Experimental transporter](https://img.shields.io/badge/status-experimental-orange.svg)
Built-in transporter for [NATS Streaming](https://nats.io/documentation/streaming/nats-streaming-intro/). It is a very simple implementation. It transfers Moleculer packets to consumers via pub/sub. There are not implemented offset, replay...etc features.

>Please note, it is an **experimental** transporter. **Do not use it in production yet!**

```js
let { ServiceBroker } = require("moleculer");

const broker = new ServiceBroker({
    nodeID: "server-1",
    transporter: "stan://nats-streaming-server:4222"
});
```

{% note info Dependencies %}
To use this transporter install the `node-nats-streaming` module with `npm install node-nats-streaming --save` command.
{% endnote %}

#### Examples
```js
// Connect with default settings
const broker = new ServiceBroker({
    transporter: "STAN"
});

// Connect with connection string
const broker = new ServiceBroker({
    transporter: "stan://nats-streaming-server:4222"
});

// Connect with options
const broker = new ServiceBroker({
    transporter: {
        type: "STAN",
        options: {
            url: "stan://127.0.0.1:4222",
            clusterID: "my-cluster"
        }
});
```

### Custom transporter
You can also create your custom transporter module. We recommend to copy the source of [NatsTransporter](https://github.com/moleculer-java/moleculer-java/blob/master/src/transporters/nats.js) and implement the `connect`, `disconnect`, `subscribe` and `publish` methods.

#### Use custom transporter

```js
const { ServiceBroker } = require("moleculer");
const MyAwesomeTransporter = require("./my-transporter");

const broker = new ServiceBroker({
    transporter: new MyAwesomeTransporter()
});
```

## Disabled balancer
Some transporter server has built-in balancer solution. E.g.: RabbitMQ, NATS, NATS-Streaming. If you want to use the transporter balancer instead of Moleculer balancer, use the `disableBalancer` broker option.

**Example**
```js
const broker = new ServiceBroker({
    disableBalancer: true,
    transporter: "nats://some-server:4222"
});
```

{% note info Please note %}
If you disable the built-in Moleculer balancer, all requests & events will be transferred via transporter (including local requests). E.g. you have a local math service and you call `math.add` locally, the request is transferred via transporter.
{% endnote %}
