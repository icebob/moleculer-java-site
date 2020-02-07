## Asynchronous programming concepts

There are basically two kinds of processing; synchronous and asynchronous.
Synchronous processing blocks the current Thread until processing is complete.
Asynchronous processing doesn't block the current Thread,
instead of waiting, Thread will work on other tasks in the mean time.
Asynchronous applications are more difficult to design,
but they can handle thousands of parallel requests,
while synchronous applications are limited by the maximum number of Threads that can be run.
There are many different forms and implementations of asynchronous processing in Java, such as:

- [Quasar](https://github.com/puniverse/quasar): Quasar uses [Lightweight Threads](https://docs.paralleluniverse.co/quasar/) called "Fibers"
- [Reactor](https://projectreactor.io/): Reactor uses [Reactive Streams](https://github.com/reactive-streams/reactive-streams-jvm)
- [Vert.x](https://vertx.io/): The core Vert.x components use [Callbacks](https://en.wikipedia.org/wiki/Callback_(computer_programming))
and there are modules for [RxJava](https://github.com/ReactiveX/RxJava) and Quasar

If we would like to briefly summarize the essence of "Moleculer for Java", we could describe this:

- [Moleculer](https://moleculer-java.github.io/moleculer-java/): Moleculer uses [Promises](https://berkesa.github.io/datatree-promise/)
and manages sequential flow controls through "*then().then().then()*" chaining

The Java-based Molecular logical architecture follows the logical structure of the Node.js-based implementation in detail.
As a result, the Java implementation is more similar to an Node.js application
in its internal architecture than the Java-based asynchronous frameworks above.
Some useful things have been integrated from the Java World (such as J2EE and Spring Framework support),
but most Java objects are copied from JavaScript objects (as much as possible due to differences between the two languages).
Let's look at how the basic "system building blocks" match in Node.js and Java implementations:

| JavaScript-based Moleculer | Java-based Moleculer |
| -------------------------- | -------------------- |
| General JavaScript Object  | `io.datatree.Tree` object |
| ECMAScript 6 Promise       | `io.datatree.Promise` object that returns with a `Tree` object |
| Actions and Events are functions | Actions and Events are Functional Interfaces |
| Runs with the built-in HTTP Server of Node.js | Runs on top of the Netty Server or as a standard Servlet |
| Actions can have JSON settings (visible from the Java side) | Actions can have Java Annotations (visible from the Node.js side) |

## DataTree API for JavaScript Objects

The `Services` send packets of structured hierarchical data to each other during communication.
Because the `Services` can be remotely hosted,
services send and receive JSON data during their communication.
In the Node.js-based Moleculer implementation, the
transferable data corresponds to JavaScript Objects.
A JavaScript Object is a collection of named values, eg.:

```js
// JavaScript code
var params = {param1: "value1",
              param2: "value2",
              param3: 12345678,
              param3: true};
```

There is no similar native support for dynamic creation of JSON objects in Java language.
Because of this, Moleculer uses an
[abstract API](https://berkesa.github.io/datatree/)
instead of a certain JSON implementation.
The `io.datatree.Tree` object is an **abstract layer** that uses an arbitrary JSON implementation.
`Tree` API supports 18 popular
[JSON implementations](serializers.html#json-serializer) (eg. Jackson, Gson, Boon, Jodd, FastJson),
and 10 non-JSON data formats (YAML, ION, BSON, MessagePack, etc.).
Java-based JSON (and non-JSON) APIs are constantly evolving,
so no specific implementation is forced on developers.
The following Java code snippet builds similar JSON structure like the previous JavaScript code:

```java
// Java code
Tree params = new Tree();
params.put("param1", "value1");
params.put("param2", "value2");
params.put("param3", 12345678);
params.put("param4", true);
```

The following Java statement...
```java
System.out.println(params);
```
... will print this:
```json
{
  "param1" : "value1",
  "param2" : "value2",
  "param3" : 12345678,
  "param4" : true
}
```

In addition, the `Tree` API provides some useful features:

- JSON path functions (`tree.get("cities[2].location")`)
- Easy iteration over Java Collections and Maps (`for (Tree child: parent)`)
- Recursive deep cloning (`Tree copy = tree.clone()`)
- Support for all Java types of Appache Cassandra (`BigDecimal`, `UUID`, `InetAddress`, etc.)
- Support for all Java types of MongoDB (`BsonNumber`, `BsonNull`, `BsonString`, `BsonBoolean`, etc.)
- Root and parent pointers, methods to traverse the data structure
- Methods for type-check (`Class valueClass = tree.getType()`)
- Methods for modify the type of the underlying Java value (`tree.setType(String.class)`)
- Method chaining (`tree.put("name1", "value1").put("name2", "value2")`)
- Merging, filtering structures (`tree.copyFrom(source)`, `tree.find(condition)`, etc.)

In summary, Node.js-based Moleculer `Services` sends and receives JavaScript Objects.
The equivalent is the `Tree` object in the Java-based Moleculer.

## Avoid reflection

The Reflection API is a powerful feature of the Java language.
With the API, the Java program can create an object or call a method on the fly.
From execution prospective, the calls to reflection API are quite expensive,
it could have a performance impact on the applications.
Because of this, Moleculer uses the reflection API in very few cases. For example
`Actions` and event `Listeners` are not methods but Functional Interfaces.
Calling them is much faster than calling methods using the Reflection API.

```java
// Actions and Listeners are Functional Interfaces
Action action = ctx -> { ... };
Listener listener = ctx -> { ... };
```

## No object mapping

For the sake of simplicity, and similarity to Node.js version, Moleculer does not use Java Object Mappers.
The data is received, processed and returned in "raw" JSON format.
Object Mapper's are useful when starting the system,
and we process configuration files using the Spring Framework, for example.
However, it is faster at runtime if the incoming data packet is received immediately
after parsing it from the binary (JSON, MessagePack, etc.) format.
The `Tree` data type helps in accurate type conversion, even allowing you to specify default values.

```java
// Input and output data are in "raw" JSON format
Action action = ctx -> {

    // Process input:
    // {
    //     "key1": "abc",
    //     "key2": 12345
    // }
    String value1 = ctx.params.get("key1", "default");
    double value2 = ctx.params.get("key2", 0d);

    // Generate output:
    // {
    //     "result": "ok"
    // }
    Tree out = new Tree();
    out.put("result", "ok");
    return out;
};
```

The input for `Action` and event `Listener` is always a
[Context](actions.html#context)
(which has metadata besides input JSON, such as who sent the message).
The returned value cannot be a POJO (Plain Old Java Object with getter/setter methods),
such values must be converted to a `Tree` object.
The output can be one of the following:

- *null*
- String
- *Numbers:* byte, short, int, long, float, double, `BigDecimal`, `BigInteger`
- boolean
- byte array
- `java.util.Date`
- `java.util.UUID`
- `java.net.InetAddress`
- `Tree` object (hierarchical data structure from the above types)
- `Promise` object (it's like an asynchronous `Tree`)
- `PacketStream` object (when transferring large, binary files)

## Non-blocking JSON processing

Moleculer uses ES6-like
[Promises](https://berkesa.github.io/datatree-promise/)
(based on the Java8's `CompletableFuture` API) to avoid
[callback hell](https://www.google.com/search?q=callback+hell+promise).
An `io.datatree.Promise` is an object that may produce a simple value (or a `Tree` object) some time in the future:
either a resolved value, or a reason that it's not resolved (e.g., a network error occurred).
`Promise` users can attach callbacks to handle the fulfilled `Tree` or the reason for rejection.

The main difference between Promise-based operation of other systems and Moleculer
is that the Moleculer `Promise` object works with "raw" JSON objects.
The value of a Moleculer `Promise`, which you get after the asynchronous processing,
is always a `Tree` object.
This `Tree` structure may come from other `Services` or from asynchronous APIs.

```java
// Sequential "waterfall" processing of Promises
Action createNewUser = ctx -> {

    // Validate user name
    return httpClient.get("http://acl/check").then(rsp -> {

        // Save new user
        return userDAO.createNewUser(rsp);

    }).then(rsp -> {

        // Log info
        String id = rsp.get("_id", "");
        logger.info("New user record: " + rsp);

    }).then(rsp -> {

        // Find email address
        return ctx.call("email.findByID", rsp);

    }).then(rsp -> {

        // Send email to user
        return ctx.call("email.sendVerification", rsp);

    });
}
```

[More coding suggestions can be found here.](performance-tips.html#coding-style)