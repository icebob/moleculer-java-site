## About Moleculer Services

The `Service` is a basic component in the Moleculer Ecosystem.
`Services` may have `Actions` that other `Services` can invoke locally or over the network.
`Services` can also define event `Listeners` that can react to events created in the Moleculer Cluster.
Using the Moleculer Framework, `Services` written in
[different languages](https://github.com/moleculerjs/awesome-moleculer#polyglot-implementations)
can work effectively with each other.

Moleculer can be integrated with the [Spring Framework](https://spring.io/).
In the Spring Environment, Moleculer `Services` and `ServiceBroker` are Spring Beans.
This will allow Moleculer `Services` to access the other Spring Components
(eg. [DAO](https://en.wikipedia.org/wiki/Data_access_object) classes for access the backend).

The [WEB API Gateway](moleculer-web.html#about-api-gateway)
module enables the Moleculer `Services` to function as REST/HTML services
generating HTML pages using server-side Template Engines.
In addition, they can receive / send large files or send WebSocket packets to browsers.

## Actions

The actions are the callable/public methods of a `Service`.
They are callable with "broker.call()" or "ctx.call()" methods.

**Example**

A `Service` schema of adding and subtracting two numbers (the example defines two `Actions`):

```java{4,9}
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

The "@Name" attribute isn't a mandatory property, if missing,
MessageBroker will generate the `Service` name from the Class name.
The algorithm used to create `Services` names is similar to when Spring registers Beans;
the first letter will be lowercase, the rest will not change
(for example, `MathService` registers as "mathService").
This rule also applies to `Action` names;
you can specify the name with the "@Name" annotation;
if missing, the Java field name will be the action name (eg. "add" `Action` registers as "add").

To register the `MathService` in a MessageBroker, use the "createService" method:

```java{2}
MessageBroker broker = MessageBroker.builder().build();
broker.createService(new MathService());
broker.start();
```

To call the `Service`, use the "call" method:

```java{3,8}
// in thread-blocking style:

Tree rsp = broker.call("math.add", "a", 5, "b", 3).waitFor();
System.out.println("Response: " + rsp.asInteger());

// ...or, in non-blocking style:

broker.call("math.sub", "a", 5, "b", 3).then(rsp -> {
    System.out.println("Response: " + rsp.asInteger());
});
```

From the caller perspective does not matter the physical location of the `Service`.
The "math.add" and "math.sub" `Actions` can be on other machine,
written in a different programming language.  
[Read more about Actions.](actions.html)

## Versioned Services

```java{2}
@Name("math")
@Version("2")
public class MathV2Service extends Service {

    // Modified "add" and "sub" Actions...    
}
```

To call the versioned `Service`, use the "v2." prefix:

```java
broker.call("v2.math.add", "a", 5, "b", 3);
```

::: tip REST call
Via [WEB API Gateway](moleculer-web.html#about-api-gateway), make a request to GET /v2/math/add.
:::

## Events

`Services` can monitor events.
Events can come from local but also from remote nodes.
The content of the event is a "JSON structure" (ctx.params) inside a `Context` object.

**Example**

```java{3,4}
public class PaymentService extends Service {

    @Subscribe("order.created")
    Listener orderCreated = ctx -> {
        logger.info("Received data:", ctx.params);
    };
}
```

[Read more about event handling.](events.html)

## Lifecycle handlers

There are some lifecycle service events, that will be triggered by the `ServiceBroker`.

```java{3,9}
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

These are called when `ServiceBroker` starts or stops the `Services`.  
[Read more about lifecycle of Services.](lifecycle.html)

Other system-level events can be handled by event `Listeners`
(eg. another Node joining the cluster or a change in the `Service` list).  
[Read more about internal events.](events.html)

## Dependencies

If a `Service` depends on other `Services`, use the "@Dependencies" annotation to denote dependencies.
The service waits for dependent services before calls the "started" lifecycle event handler. 

```java{1}
@Dependencies({"logService", "backendService"})
public class RestService extends Service {
    // ...
}
```

The main difference between the "@Dependencies" annotation and Spring "@DependsOn" annotation
is that "@Dependencies" monitors the entire Moleculer Cluster.
In the example above, "logService" or "backendService" can be a **remote** `Service`.
The Spring "@DependsOn" annotation only monitors the local `ApplicationContext`.

## Wait for services via ServiceBroker

To wait for services, you can also use the "waitForServices" method of `ServiceBroker`.
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

::: warning
Do not use the "waitForServices" method to block the Spring initialization process (for example, while creating Beans).
`ServiceBroker` starts completely after Spring initialization is complete.
:::