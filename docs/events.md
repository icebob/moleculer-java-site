title: Events
---

Molculer Service Broker has a built-in event bus for sending events to local and remote services.
Events can be used to create event-driven,
runtime scalable applications from services
deployed on different operating systems and implemented in different languages.

Events can be grouped; events can be sent to
- a specific node
- to all listeners
- to a group of listeners
- or to one member from all groups

# Balanced events

The event listeners are arranged to logical groups.
It means that only one listener is triggered in every group.

> **Example:** An application contains 2 main services: `users` & `payments`.
> Both subscribe to the `user.created` event.
> 3 instances of `users` service and 2 instances of `payments` service run.
> If the `user.created` event is emitted, only one `users` and one `payments` service will receive this event.

<div align="center">
    <img src="assets/balanced-events.gif" alt="Balanced events diagram" />
</div>

The group name comes from the service name, but it can be overwritten in event definition in services.

**Example**
```java
@Name("payment")
public class PaymentService extends Service {

    @Subscribe("order.created")
    @Group("other")
    Listener orderCreated = ctx -> {
        logger.info("Payload:", ctx.params);
        logger.info("Sender:", ctx.nodeID);
        logger.info("Metadata:", ctx.params.getMeta());
        logger.info("The called event name:", ctx.name);            
    };

}
```

## Emit balanced events

Send balanced events with `broker.emit` function.
The first parameter is the name of the event, the second parameter is the payload. 
_To send multiple/hierarchical values, wrap them into a `Tree` object._

```java
// The `user` is a `Tree` object (~=JSON structure)
// that will be serialized for transport.
Tree user = new Tree();
user.put("firstName", "John");
user.put("lastName", "Doe");

// Emit event
broker.emit("user.created", user);
```

Specify which groups/services shall receive the event:

```java
// Only the `mail` & `payments` services receive this event
broker.emit("user.created", user, Groups.of("mail", "payments"));
```

Simplified syntax for sending key-value pairs

If the data structure to be sent consists only of **key-value pairs**,
it is not necessary to create a `Tree` object.
It is enough to list the key-value pairs after the event name:

```java
ctx.emit("user.created",
         "firstName", "John",
         "lastName", "Doe",
         Groups.of("mail", "payments"));
```

Creating a Tree object is required when passing more complex data structures between Nodes,
which contain sub-structures (~=hierarchical JSON objects and JSON arrays).

# Broadcast event

The broadcast event is sent to all available local & remote services.
It is not balanced, all event listener instances receive this event.

<div align="center">
    <img src="assets/broadcast-events.gif" alt="Broadcast events diagram" />
</div>

Send broadcast events with `broker.broadcast` method.

```java
// The `config` is a hierarchical (~=JSON) structure
Tree config = new Tree();
config.put("key", "value");
config.putList("anArray").add(1).add(2).add(3);

// Send "config" to all listeners
broker.broadcast("config.changed", config);
```

Specify which groups/services shall receive the event:

```java
// Send to all "mail" service instances
broker.broadcast("user.created", user, Groups.of("mail"));

// Send to all "user" & "purchase" service instances.
broker.broadcast("user.created", user, Groups.of("user", "purchase"));

// Same thing, but with simplified syntax
ctx.broadcast("user.created",
              "firstName", "John",
              "lastName", "Doe",
              Groups.of("user", "purchase"));
```

## Local broadcast event

Send broadcast events only to all local services with `broker.broadcastLocal` method.
```java
broker.broadcastLocal("config.changed", config);
```

# Subscribe to events

The contents of the events are wrapped in an object called Event Context to receive the message.
The Event Context is very similar to Action Context.

**Context-based event handler & emit a nested event**

```java
@Name("accounts")
public class AccountService extends Service {

    @Subscribe("user.created")
    Listener userCreated = ctx -> {
        logger.info("Payload:", ctx.params);
        logger.info("Sender:", ctx.nodeID);
        logger.info("Metadata:", ctx.params.getMeta());
        logger.info("The called event name:", ctx.name);

        // Emit a new, nested Event
        Tree payload = new Tree();
        payload.copyFrom(ctx.params, "user");
        ctx.emit("accounts.created", payload);
    };

}
```

Subscribe to events in ['events' property of services](services.html#events).
Use of wildcards (`?`, `*`, `**`) is available in event names.

```java
public class MyService extends Service {

    // Subscribe to `user.created` event
    @Subscribe("user.created")
    Listener userCreated = ctx -> {
        logger.info("User created event received:", ctx.params);
    };

    // Subscribe to all `user` events
    @Subscribe("user.*")
    Listener userEvents = ctx -> {
        logger.info("User event event received:", ctx.params);
    };
        
    // Subscribe to all internal events
    // (internal event names start with "$" prefix)
    @Subscribe("$**")
    Listener internalEvents = ctx -> {
        logger.info("Event " + ctx.name + " received:", ctx.params);
    };
        
}
```

# Context

When you emit an event, the broker creates a `Context` instance which contains all request information and passes it to the event handler as a single argument.

**Available properties & methods of `Context`:**

| Name | Type |  Description |
| ------- | ----- | ------- |
| `ctx.id` | `String` | Unique Context ID. |
| `ctx.name` | `String` | Name of the event. |
| `ctx.params` | `Tree` | Request params. Contains meta-data (`ctx.params.getMeta()`). |
| `ctx.level` | `int` | Request level (in nested-calls). The first level is `1`. |
| `ctx.nodeID` | `String` | The caller or target Node ID. |
| `ctx.parentID` | `String` | Parent context ID (in nested-calls). |
| `ctx.requestID` | `String` | Request ID (does not change during the call chain). |
| `ctx.stream` | `PacketStream` | Streamed content. |
| `ctx.opts` | `Options` | Calling options. |
| `ctx.call()` | `Method` | Make nested-calls. Same arguments like in `broker.call` |
| `ctx.emit()` | `Method` | Emit an event, same as `broker.emit` |
| `ctx.broadcast()` | `Method` | Broadcast an event, same as `broker.broadcast` |

# Internal events

The broker broadcasts some internal events.
Internal events always starts with `$` prefix.

## `$services.changed`

The broker sends this event if the local node or a remote node loads or destroys services.

**Payload**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `localService ` | `boolean` | True if a local service changed. |

## `$node.connected`

The broker sends this event when a node connected or reconnected.

**Payload**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `node` | `Tree` | Node info object |
| `reconnected` | `boolean` | Is reconnected? |

## `$node.updated`

The broker sends this event when it has received an INFO message from a node
(ie. a service is loaded or destroyed).

**Payload**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `node` | `Tree` | Node info object |

## `$node.disconnected`

The broker sends this event when a node disconnected (gracefully or unexpectedly).

**Payload**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `node` | `Tree` | Node info object |
| `unexpected` | `boolean` | `true` - Not received heartbeat, `false` - Received `DISCONNECT` message from node. |

## `$broker.started`

The broker sends this event once `broker.start()` is called and all local services are started.

## `$broker.stopped`

The broker sends this event once `broker.stop()` is called and all local services are stopped.

## `$transporter.connected`

The transporter sends this event once the transporter is connected.

## `$transporter.disconnected`

The transporter sends this event once the transporter is disconnected.

