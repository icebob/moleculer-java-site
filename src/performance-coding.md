## Coding style

This chapter outlines some important Moleculer-specific coding suggestions that can affect speed or reliability.

### Frequently used parameters should be local variables

If you need to get the same field **more than once** from a `Tree` structure (~=JSON),
you should rather assign it to a local variable.
The code will be more readable and the program will be faster.
So, do not use the "copy-paste" function in such cases, and instead of this...

```java
if (ctx.params.get("addresses[0].zip", (String) null) != null &&
	ctx.params.get("addresses[0].zip").asString().length() > 0 &&
	ctx.params.get("addresses[0].zip").asString().startsWith("xyz")) {
		store(user, ctx.params.get("addresses[0].zip").asString());
}
```

... write something like this:

```java{1}
String zip = ctx.params.get("addresses[0].zip", "");
if (!zip.isEmpty() && zip.startsWith("xyz")) {
    store(user, zip);
}
```

### Use shorter JSON Paths

Using such long JSON Path values will consume resources unnecessarily:

```java
String firstName = ctx.params.get("transaction.customer.personalProperties.firstName", "");
String lastName  = ctx.params.get("transaction.customer.personalProperties.lastName",  "");
String address   = ctx.params.get("transaction.customer.personalProperties.address",   "");
```

It is better to extract the root of the query into a separate sub-structure.
The "customer" Tree is just a pointer to a sub-element of the root Tree,
the following operation does not involve extra data copying or other resource intensive operation:

```java
Tree personalProperties = ctx.params.get("transaction.customer.personalProperties");

String firstName = personalProperties.get("firstName", "");
String lastName  = personalProperties.get("lastName",  "");
String address   = personalProperties.get("address",   "");
```

### Use Moleculer's caching capability

Take some time to learn about Molecular's [caching capabilities](caching.html#caching-action-calls).
Well-designed caching, using cache keys, can multiply the performance of a `Service`.

### Call local methods in "traditional way"

If a Service is definitely a local Service (always located in the local JVM),
it can also be accessed through Spring Context (eg. using the `@Autowired` annotation).
Local Service methods can be called directly without EventBus or Transporter.
For the most important functions, it is worth creating "traditional" Java methods that are not "network-ready" `Actions`,
and can be easily called from other Services/Components without an intermediate layer.

> An exception to the above is when a local Service is called through ServiceBroker for caching purposes.

### Do not block

Blocking is not forbidden in Moleculer environment, but it wastes resources.
If you need to access the full hardware performance,
as much of the program as possible must be coded in a non-blocking manner.
Unfortunately, not all backend services have a non-blocking API in Java,
but if you have one, use it and don't block the Thread.
If there is a non-blocking API for a backend service, it can be
[converted to Moleculer Promise](concepts.html#converting-callback-to-promise).