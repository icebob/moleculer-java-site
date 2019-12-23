title: Services
---

The `Service` is the top-level component in the Moleculer Ecosystem.
Services may have Actions that other Services can invoke locally or over the network.
Services can also define Event Listeners that can react to events created in the Moleculer Cluster.
Using the Moleculer Framework, Services written in different (Java, JavaScript or Go)
languages can work effectively with each other.

## Simple example

A `Service` schema of adding and subtracting two numbers (the example defines two `Actions`):

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

The `@Name` attribute isn't a mandatory property, if missing, MessageBroker will generate the Service name from the Class name.
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
```

To call the Service, use the `call` method:

```java
Tree rsp = broker.call("math.add", "a", 5, "b", 3).waitFor();
System.out.println("Response: " + rsp.asInteger());

// ...or, in non-blocking style:

broker.call("math.sub", "a", 5, "b", 3).then(rsp -> {
    System.out.println("Response: " + rsp.asInteger());
});
```

The "math.add" and "math.sub" Actions can be on another machine,
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

{% note info REST call %}
Via [API Gateway](moleculer-web.html), make a request to `GET /v2/math/add`.
{% endnote %}

## Converting Java Annotations to platform-independent properties

> The `settings` is also obtainable on remote nodes. It is transferred during service discovering.

## Actions

The actions are the callable/public methods of the service. They are callable with `broker.call` or `ctx.call`.

## Events

You can subscribe to events under the `events` key. For more information check the [events documentation](events.html).

## Lifecycle Events

There are some lifecycle service events, that will be triggered by broker. They are placed in the root of schema.

```java
module.exports = {
    name: "www",
    actions: {...},
    events: {...},
    methods: {...},

    created() {
        // Fired when the service instance created (with `broker.loadService` or `broker.createService`)
    },

    async started() {
        // Fired when broker starts this service (in `broker.start()`)
    }

    async stopped() {
        // Fired when broker stops this service (in `broker.stop()`)
    }
};
```
## Dependencies

If your service depends on other services, use the `dependencies` property in the schema.
The service waits for dependent services before calls the `started` lifecycle event handler. 

```java
module.exports = {
  name: "posts",
  settings: {
      $dependencyTimeout: 30000 // Default: 0 - no timeout
  },
  dependencies: [
      "likes", // shorthand w/o version
      { name: "users", version: 2 }, // with numeric version
      { name: "comments", version: "staging" } // with string version
  ],
  async started() {
      this.logger.info("It will be called after all dependent services are available.");
      const users = await this.broker.call("users.list");
  }
  ....
}
```

The `started` service handler is called once the `likes`,
`users` and `comments` services are available (either the local or remote nodes).

### Wait for services via ServiceBroker

To wait for services, you can also use the `waitForServices` method of `ServiceBroker`.
It returns a `Promise` which will be resolved, when all defined services are available & started.

**Parameters**

| Parameter | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| `services` | `String` or `Array` | - | Service list to waiting |
| `timeout` | `Number` | `0` | Waiting timeout. `0` means no timeout. If reached, a `MoleculerServerError` will be rejected. |
| `interval` | `Number` | `1000` | Frequency of watches in milliseconds |

**Example**

```java
broker.waitForServices(["posts", "users"]).then(() => {
    // Called after the `posts` & `users` services are available
});
```

**Set timeout & interval**

```java
broker.waitForServices("accounts", 10 * 1000, 500).then(() => {
    // Called if `accounts` service becomes available in 10 seconds
}).catch(err => {
    // Called if service is not available in 10 seconds
});
```
