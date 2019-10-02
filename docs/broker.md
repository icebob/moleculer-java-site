title: Broker
---
The `ServiceBroker` is the main component of Moleculer.
It handles services, calls actions, emits events and communicates with remote nodes. 
You must create a `ServiceBroker` instance for every node.

## Create Service Broker

**Create Broker with default settings:**

```java
ServiceBroker broker = new ServiceBroker();

// Create a service
broker.createService(new Service("test") {
    public Action action = ctx -> {
        return ctx.params.get("a", 0) +
               ctx.params.get("b", 0);
    };
});

// Call the service
broker.call("test.action",
            "a", 3,
            "b", 4)
        .then(rsp -> {
            System.out.println(rsp);
        });
```

**Create Broker with custom settings:**

There are two ways to create a `ServiceBroker`; using either `ServiceBrokerConfig` or `ServiceBroker.builder`.

```java
// Using ServiceBrokerConfig
ServiceBrokerConfig config = new ServiceBrokerConfig();
config.setNodeID("node1");
config.setTransporter(new RedisTransporter("redis://host"));
config.setStrategyFactory(new CpuUsageStrategyFactory());
config.setCacher(new MemoryCacher());
ServiceBroker broker = new ServiceBroker(config);

// Using ServiceBroker.builder
ServiceBroker broker = ServiceBroker.builder()
                                    .nodeID("node1")
                                    .transporter(...)
                                    .strategy(...)
                                    .cacher(...)
                                    .build();
```

**Create Broker using "classic" Spring XML config:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
	   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
	   http://www.springframework.org/schema/context
	   http://www.springframework.org/schema/context/spring-context-3.0.xsd">

	<!-- ENABLE ANNOTATION PROCESSING -->

	<context:annotation-config />

	<!-- PACKAGE OF THE MOLECULER SERVICES -->
	
	<context:component-scan base-package="my.services" />

	<!-- SPRING REGISTRATOR FOR MOLECULER SERVICES -->

	<bean id="registrator" class="services.moleculer.config.SpringRegistrator" depends-on="broker" />

	<!-- SERVICE BROKER INSTANCE -->

	<bean id="broker" class="services.moleculer.ServiceBroker"
		init-method="start" destroy-method="stop">
		<constructor-arg ref="brokerConfig" />
	</bean>

	<!-- SERVICE BROKER SETTINGS -->

	<bean id="brokerConfig" class="services.moleculer.config.ServiceBrokerConfig">
		<property name="nodeID" value="node-1" />
		<property name="transporter" ref="transporter" />
	</bean>

	<!-- CONFIGURE TRANSPORTER -->

	<bean id="transporter" class="services.moleculer.transporter.TcpTransporter" />

</beans>
```

With this setting, Spring will dynamically load Moleculer Services from the "my.services" package.
A simple, Spring-compatible Moleculer Service looks like this:

```java
package my.services;

import org.springframework.stereotype.Controller;
import services.moleculer.service.*;

@Name("service1")
@Controller
public class TestService extends Service {

	@Name("action1")
	public Action testAction = ctx -> {
		return ctx.params.get("a").asInteger()
			 + ctx.params.get("b").asInteger();
	};
	
}
```

**Create broker with Spring Boot:**

The following example code shows Spring Boot-based initialization without XML configuration:

```java
import org.springframework.boot.autoconfigure.*;
import org.springframework.context.annotation.*;
import services.moleculer.config.*;
import services.moleculer.*;

@SpringBootApplication
@ComponentScan("my.services")
public class MoleculerApplication {

	// --- CREATE AND CONFIGURE SERVICE BROKER ---

	@Bean(initMethod = "start", destroyMethod = "stop")
	public ServiceBroker getServiceBroker() {
		ServiceBrokerConfig config = new ServiceBrokerConfig();
		config.setNodeID("node1");
		config.setTransporter(...);
		config.setStrategyFactory(...);
		config.setCacher(...);

		return new ServiceBroker(config);
	}

	// --- SPRING REGISTRATOR (REQUIRED) ---

	@Bean
	public SpringRegistrator getSpringRegistrator() {
		return new SpringRegistrator();
	}

}
```

{% note info Moleculer runner %}
You don't need to create manually ServiceBroker in your project.
Use the [Moleculer Runner](runner.html) to create and execute a broker and load services.
[Read more about Moleculer Runner](runner.html).
{% endnote %}

## ServiceBrokerConfig options

List of all available broker options:

| Name | Type | Default | Description |
| ------- | ----- | ------- | ------- |
| `namespace` | `String` | `""` | Namespace of nodes to segment your nodes on the same network. |
| `nodeID` | `String` | hostname + PID | Unique node identifier. Must be unique in a namespace. If not the broker will throw a fatal error and stop the process.|
| `internalServices` | `boolean` | `true` | Register [internal services](services.html#Internal-Services). |
| `jsonReaders` | `String` | `null` | Comma-separated list of the preferred JSON deserializer APIs ("jackson", "boon", "fastjson", "genson", etc.). |
| `jsonWriters` | `String` | `null` | Comma-separated list of the preferred JSON serializer APIs ("jackson", "boon", "fastjson", "genson", etc.). |
| `uidGenerator` | `UidGenerator` | `IncrementalUidGenerator` | Implementation of the UID generator. |
| `strategyFactory` | `StrategyFactory` | `RoundRobinStrategyFactory` | Implementation of the Invocation Strategy. |
| `contextFactory` | `ContextFactory` | `DefaultContextFactory` | Implementation of the Context Factory. |
| `eventbus` | `Eventbus` | `DefaultEventbus` | Implementation of the Event Bus. |
| `serviceRegistry` | `ServiceRegistry` | `DefaultServiceRegistry` | Implementation of the [Service Registry](registry.html). |
| `cacher` | `Cacher` | `MemoryCacher` | Implementation of the service-level Cache. [Read more](caching.html) |
| `serviceInvoker` | `ServiceInvoker` | `DefaultServiceInvoker` | Implementation of the [Service Invoker](fault-tolerance.html#Circuit-Breaker). |
| `transporter` | `Transporter` | `null` | Transporter settings. [Read more](networking.html). |
| `monitor` | `Monitor` | `SigarMonitor` | CPU monitor. [Read more](balancing.html). |
| `shutDownThreadPools` | `boolean` | `true` | Shut down thread pools during the shutdown stage |
```

## Service Broker methods

| Name | Response |  Description |
| ------- | ----- | ------- |
| `broker.getConfig()` | `ServiceBrokerConfig` | Returns the Broker's configuration and module container |
| `broker.getNodeID()` | `String` | Returns the Broker's unique identifier. |
| `broker.start()` | `ServiceBroker` | Starts broker. Blocks until the end of the boot. |
| `broker.stop()` | `ServiceBroker` | Stops broker. Blocks until the end of the shutdown process. |
| `broker.getLogger()` | `Logger` | Return's the Broker's logger. |
| `broker.getLogger(class)` | `Logger` | Returns a logger named corresponding to the class passed as parameter. |
| `broker.getLogger(name)` | `Logger` | Return a logger named according to the name parameter. |
| `broker.createService(service)` | `ServiceBroker` | Installs a new service instance and notifies other nodes about the service. |
| `broker.createService(name, service)` | `ServiceBroker` | Installs a new service with the specified name (eg. "user" service). |
| `broker.getLocalService(name)` | `Service` | Returns a local service by name (eg. "user" service). |
| `broker.use(middlewares)` | `ServiceBroker` | Installs a collection (or array) of Middlewares. |
| `broker.getAction(name)` | `Action` | Returns a local or remote Action by name. |
| `broker.getAction(name, nodeID)` | `Action` | Returns an Action by name and nodeID. |
| `broker.call(actionName, params)` | `Promise` | Call an action of the specified service (eg. "service.action"). |
| `broker.waitForServices(services)` | `Promise` | Waits for one (or an array of) service(s) to be created. |
| `broker.waitForServices(timeout, services)` | `Promise` | Wait for the specified services to be created within the specified time. |
| `broker.ping(nodeID)` | `Promise` | Sends a PING message to the specified node. The ping timeout is 3 seconds. |
| `broker.ping(timeout, nodeID)` | `Promise` | Sends a PING message to the specified node with the specified timeout. |
| `createStream()` | `PacketStream` | Creates a stream what is suitable for transferring large files between the nodes |
| `broker.repl()` | - | Start Interactive Developer Console. |
| `broker.emit(name, params)` | - | Emit a balanced event. |
| `broker.broadcast(name, params)` | - | Broadcast an event. |
| `broker.broadcastLocal(name, params)` | - | Broadcast an event to local services. |
