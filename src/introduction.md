## What is Moleculer Java?

Java implementation of the [Moleculer microservices framework](http://moleculer.services/).
Moleculer Ecosystem is designed to facilitate the development of non-blocking distributed applications.
The Java-based Moleculer is completely compatible with the Node.js-based Moleculer.

## Features

- Polyglot (implemented in [multiple languages](https://github.com/moleculerjs/awesome-moleculer#polyglot-implementations))
- Moleculer apps implemented in different languages are compatible with each other
- Request-reply concept (uses high-performance, non-blocking API)
- Support streams (for transferring large files, media content)
- Load balanced requests & events (round-robin, random, cpu-usage, network latency)
- Fault tolerant (circuit breaker, retry, request timeout)
- Pluggable transporters (TCP, NATS, MQTT, Redis, AMQP, Kafka, JMS, Google Pub/Sub, Ably.io)
- Pluggable serializers (JSON, MessagePack, BSON, CBOR, Ion, Smile)
- Built-in caching solution (memory cache, Redis cache, off-heap cache, JCache)
- [Promise](https://berkesa.github.io/datatree-promise/)-based solution (waterfall logic can be used to process asynchronous events)
- Built-in service registry & dynamic service discovery
- Supports middlewares (for using arbitrary cache, encryption or logging modules)
- Supports services with version identifiers
- Supports various template-engines for generating server side HTML
- Interactive developer console (REPL) with custom commands
- Open source - Moleculer is 100% open source and free of charge

## Requirements

Moleculer Java requires Java 8.

## Download

The Molecular core package can be downloaded from the central Maven repository.

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

## Short Example

The simplest way to create a REST service using Moleculer is the following:

```java
import services.moleculer.*;
import services.moleculer.service.*;
import services.moleculer.web.netty.NettyServer;

public class Sample {
  public static void main(String[] args) throws Exception {
    new ServiceBroker()
      .createService(new NettyServer(8080))
      .createService(new ApiGateway("*"))
      .createService(new Service("math") {
        Action add = ctx -> {
          return ctx.params.get("a", 0) +
                 ctx.params.get("b", 0);
          };
        }).start();
  }
}
```

To translate the example above,
you also need the "moleculer-web" package because of the Netty-based HTTP server.
The complete dependency list is as follows:

```gradle
dependencies {
    compile group: 'com.github.berkesa', name: 'moleculer-java',     version: '1.2.4'
    compile group: 'com.github.berkesa', name: 'moleculer-java-web', version: '1.2.6' 
}
```

After starting the program, enter the following URL into your browser:  
`http://localhost:8080/math/add?a=3&b=6`

The response will be "9" (because 3 and 6 are the values of the "a" and "b" parameters).
The above service can also be invoked using a POST method.
To do this, submit the `{"a":3,"b":5}` JSON (as POST body) to this URL:  
`http://localhost:8080/math/add`

## Detailed Example

[This demo project](https://moleculer-java.github.io/moleculer-spring-boot-demo/)
demonstrating the basic capabilities of a Moleculer-based web application. 
The project can be imported into the Eclipse IDE or IntelliJ IDEA.
The brief examples illustrate the following:

- Integration of Moleculer API into the Spring Boot Framework
- Configuring HTTP Routes and Middlewares
- Creating non-blocking Moleculer Services
- Publishing and invoking Moleculer Services as REST Services
- Generating HTML pages in multiple languages using Template Engines
- Using WebSockets (sending real-time server-side events to browsers)
- Using file upload and download
- Video streaming and server-side image generation
- Creating a WAR from the finished project (Servlet-based runtime)
- Run code without any changes in "standalone mode" (Netty-based runtime)

## Subprojects

* [High-performance Web API for Moleculer Apps](https://moleculer-java.github.io/moleculer-java-web/)
* [Interactive Developer Console](https://moleculer-java.github.io/moleculer-java-repl/)
* [JMX Service for Moleculer](https://moleculer-java.github.io/moleculer-java-jmx/)
* [MongoDB API for Moleculer](https://moleculer-java.github.io/moleculer-java-mongo/)

## License

This project is available under the [MIT license](https://tldrlegal.com/license/mit-license).