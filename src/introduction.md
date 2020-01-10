## What is Moleculer Java?

Java implementation of the [Moleculer microservices framework](http://moleculer.services/).
Moleculer Ecosystem is designed to facilitate the development of multilingual distributed applications.
The Java-based Moleculer is completely compatible with the Node.js-based Moleculer.

## Features

- polyglot (implemented under Node.js, Java and [other](https://github.com/moleculerjs/awesome-moleculer#polyglot-implementations) languages)
- request-reply concept (uses high-performance, non-blocking API)
- support streams (for transferring large files, media content)
- [Promise](https://berkesa.github.io/datatree-promise/)-based solution
- support event-driven architecture with balancing
- built-in service registry & dynamic service discovery
- load balanced requests & events (round-robin, random, cpu-usage, network latency)
- many fault tolerance features (circuit breaker, retry, timeout)
- supports middlewares (for using arbitrary cache, encryption or logging modules)
- supports services with version identifiers
- built-in caching solution (memory cache, Redis cache, off-heap cache, JCache)
- pluggable transporters (TCP, NATS, MQTT, Redis, AMQP, Kafka, JMS, Google Cloud Pub/Sub)
- pluggable serializers (JSON, MsgPack, BSON, CBOR, Ion, Smile)
- multiple services on a node/server
- all nodes are equal, no master/leader node
- official [API gateway module](https://moleculer-java.github.io/moleculer-java-web/) and many other modules
- open source - Moleculer is 100% open source and free of charge

## Requirements

Moleculer Java requires Java 8.

## Download

**Maven**

```xml
<dependencies>
    <dependency>
        <groupId>com.github.berkesa</groupId>
        <artifactId>moleculer-java</artifactId>
        <version>1.2.4</version>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

**Gradle**

```gradle
dependencies {
    compile group: 'com.github.berkesa', name: 'moleculer-java', version: '1.2.4' 
}
```

## Sample project

* [Moleculer Java demo project with Gradle](https://moleculer-java.github.io/moleculer-spring-boot-demo/)

## Subprojects

* [High-performance Web API for Moleculer Apps](https://moleculer-java.github.io/moleculer-java-web/)
* [Interactive Developer Console](https://moleculer-java.github.io/moleculer-java-repl/)
* [JMX Service for Moleculer](https://moleculer-java.github.io/moleculer-java-jmx/)
* [MongoDB API for Moleculer](https://moleculer-java.github.io/moleculer-java-mongo/)

## License

This project is available under the [MIT license](https://tldrlegal.com/license/mit-license).