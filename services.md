---
title: Services
---

The `Service` is the top-level component in the Moleculer Ecosystem.
Services may have Actions that other Services can invoke locally or over the network.
Services can also define Event Listeners that can react to events created in the Moleculer Cluster.
Using the Moleculer Framework, Services written in different (Java,
[JavaScript](https://moleculer.services/) or [Go](https://moleculer-go-site.herokuapp.com/))
languages can work effectively with each other.

Moleculer can be integrated with the Spring Framework.
In the Spring Environment, Moleculer Services and ServiceBroker are Spring Beans.
This will allow Moleculer Services to access the other Spring Components.

The [WEB API Gateway](moleculer-web.html)
module enables the Moleculer Services to function as REST/HTML services
generating HTML pages using server-side Template Engines.
In addition, they can receive / send large files or send WebSocket packets to browsers.

## Actions

The actions are the callable/public methods of a Service.
They are callable with `broker.call` or `ctx.call` methods.  
[Read more about Actions.](actions.html)

**Example**

A Service schema of adding and subtracting two numbers (the example defines two Actions):

```java
@Name("math")
public class MathService extends Service {

    Action add = ctx -> {
        return ctx.params.get("a", 0) + 
               ctx.params.get("b", 0);
    };
    
    Action sub = ctx -> {
        return ctx.params.get("a", 0) -
               ctx.params.get("b", 0);
    };
    
}
```

The `@Name` attribute isn't a mandatory property, if missing,
MessageBroker will generate the Service name from the Class name.
The algorithm used to create Services names is similar to when Spring registers Beans;
the first letter will be lowercase, the rest will not change
(for example, `MathService` registers as "mathService").
This rule also applies to Action names;
you can specify the name with the "@Name" attribute;
if missing, the Java field name will be the action name (eg. `add` Action registers as "add").
To register the `MathService` in a MessageBroker, use the `createService` method:

```java
MessageBroker broker = MessageBroker.builder().build();
broker.createService(new MathService());
broker.start();
```

To call the Service, use the `call` method:

```java
// in thread-blocking style:

Tree rsp = broker.call("math.add", "a", 5, "b", 3).waitFor();
System.out.println("Response: " + rsp.asInteger());

// ...or, in non-blocking style:

broker.call("math.sub", "a", 5, "b", 3).then(rsp -> {
    System.out.println("Response: " + rsp.asInteger());
});
```

From the caller perspective does not matter the physical location of the Service.
The "math.add" and "math.sub" Actions can be on other machine,
written in a different programming language.

## Services with different versions

```java
@Name("math")
@Version("2")
public class MathV2Service extends Service {

    // Modified "add" and "sub" Actions...    
}
```

To call the versioned Service, use the "v2." prefix:

```java
broker.call("v2.math.add", "a", 5, "b", 3);
```

::: tip REST call
Via [WEB API Gateway](moleculer-web.html), make a request to `GET /v2/math/add`.
:::

## Converting Java Annotations to platform-independent properties

ServiceBroker converts Java Annotations of Actions into JSON format,
therefore, they can be parsed on remote nodes.
The programming language doesn't matter, such as those available on JavaScript based nodes.
These properties are passed on as the service is discovered.

It is advisable to process these properties using (Java or JavaScipt-based)
[Middlewares](middlewares.html), and based on the values of the properties,
Middlewares may change the way the services work.

The following example shows three types of Annotation conversions.
The first one (the `@Deprecated`) is an Annotation without parameters.
Such Annotations are passed as logical values with a "true" value.
The second Annotation (the `@SingleValue`) can have only one value.
Such Annotations are passed as a key-value pair.
The third Annotation (the `@MultiValue`) contains more values.
Such Annotations are converted into a JSON structures by the ServiceBroker.
It is important to note that only Annotations with a `RetentionPolicy` value of `RUNTIME`
will be available in the Service Descriptor
(for example, `@SuppressWarnings` is not visible on remote nodes
because it exists only at the source level).

```java
@Name("service")
public class TestService extends Service {

    @Deprecated
    @SingleValue("test")
    @MultiValue(key1:"value", key2: 123)
    Action action = ctx -> {
        // ...
    };

}
```

Generated service description, also available on remote nodes:

```json
"service.action":{
    "name": "service.action",
    "deprecated": true,
    "singleValue": "test",
    "multiValue": {
        "key1": "value",
        "key2": 123
    }
}
```

The Service Descriptor is received by all remote nodes and can be processed,
regardless of the programming language.
Sample Middleware that checks the configuration of a Java (or JavaScript) Action:

```java
public class DeprecationChecker extends Middleware {

    public Action install(Action action, Tree config) {

        // Get value of the property (false = default value)
        boolean deprecated = config.get("deprecated", false);

        // Print warning if the Action is deprecated 
        if (deprecated) {
            logger.warn(config.get("name", "") + " action is deprecated!");
        }
        return null;
    }
}
```

To install the above Middleware, call the ServiceBroker `use` function:

```java
broker.use(new DeprecationChecker());
```

## Events

Services can monitor Events.
Events can come from local but also from remote nodes.
The data content of Events, like Action's, is a JSON structure.
[Read more about event handling.](events.html)

**Example**

```java
public class PaymentService extends Service {

    @Subscribe("order.created")
    Listener orderCreated = ctx -> {
        logger.info("Received data:", ctx.params);
    };
}
```

## Lifecycle handlers

There are some lifecycle service events, that will be triggered by the ServiceBroker.
These are called when ServiceBroker starts or stops the Services.  
[Read more about lifecycle of Services.](lifecycle.html)

```java
public class TestService extends Service {

    public void started(ServiceBroker broker) throws Exception {
        super.started(broker);
        // Custom initialization functions
    }

    @Override
    public void stopped() {
        // Closing resources, stopping timers
    }
    
} 
```

Other system-level events can be handled by Event Listeners
(eg. another Node joining the cluster or a change in the Service list).  
[Read more about internal events.](events.html)

## Dependencies

If a Service depends on other Services, use the `@Dependencies` Annotation to denote dependencies.
The service waits for dependent services before calls the `started` lifecycle event handler. 

```java
@Dependencies({"logService", "backendService"})
public class RestService extends Service {
    // ...
}
```

The main difference between the `@Dependencies` Annotation and Spring `@DependsOn` Annotation
is that `@Dependencies` monitors the entire Moleculer Cluster.
In the example above, "logService" or "backendService" can be a **remote** Service.
The Spring `@DependsOn` Annotation only monitors the local `ApplicationContext`.

### Wait for services via ServiceBroker

To wait for services, you can also use the `waitForServices` method of `ServiceBroker`.
It returns a `Promise` which will be resolved when all defined services are available & started.

**Example**

```java
broker.waitForServices("posts", "users").then(rsp -> {
    // Called after the "posts" and "users" services are available
});
```

**Handle timeout**

```java
broker.waitForServices(10 * 1000, "accounts").then(rsp -> {
    // Call it when the "accounts" service becomes available within 10 seconds
}).catchError(err -> {
    // Called if the wait time is more than 10 seconds
});
```
