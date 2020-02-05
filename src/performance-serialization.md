## Serialization and parsing

Moleculer allows you to select the JSON API to use for serialization and deserialization.
[See this section on how to set the JSON API type.](serializers.html#json-serializer)
A couple of
[Performance tests](https://github.com/berkesa/datatree-adapters/tree/master/src/test/java/io/datatree)
were made for JSON APIs with
[with this test file](https://github.com/berkesa/datatree-adapters/blob/master/src/test/resources/sample-small.json).
There is quite a difference in speed between the various JSON and binary APIs.

### Deserialization

The graph below shows the speed of the various JSON parsers.
The vertical axis is the parsed/deserialized JSON packets per second per CPU core.
The highest value is better.
There is more than a 10-fold difference between the slowest and fastest APIs.
The three fastest APIs are "**Boon**", "**Jodd**" and "**Jackson**" parsers:

<div align="center">
    <img src="perf/json-readers.png" alt="JSON Parsers / Deserializers" />
</div>

### Serialization

The graph below shows the speed of the various JSON writers.
The vertical axis is the generated/serialized JSON packets per second per CPU core.
The highest value is better.
There is more than a 6x difference between the slowest and fastest APIs.
The two fastest APIs are "**Jackson**" and "**FastJson**" serializators:

<div align="center">
    <img src="perf/json-writers.png" alt="JSON Generators / Serializers" />
</div>

### Conclusion

The fastest JSON APIs are faster than most binary APIs, at least for smaller files.
Among the JSON APIs, the performance of the Jackson API is outstanding when looking at the average read-write.
If you want to use one JSON API, same for writing and reading, use Jackson:

```java
ServiceBroker broker = ServiceBroker.builder()
                                    .nodeID("server-1")
                                    .transporter(transporter)
                                    .readers("jackson")
                                    .writers("jackson")
                                    .build();
```

If you want to configure different JSON APIs for reading and writing,
use the Boon API for reading, and the Jackson API for writing:

```java
ServiceBroker broker = ServiceBroker.builder()
                                    .nodeID("server-1")
                                    .transporter(transporter)
                                    .readers("boon,jackson") // Use "Boon", fallback API is "Jackson"
                                    .writers("jackson")      // Always use "Jackson" as serializer
                                    .build();
```

::: warning Add dependencies
Remember to add the
[dependencies](serializers.html#json-serializer)
of the selected JSON API to "pom.xml" or "build.gradle".
:::

::: warning Test the selected API
Not only are there differences in speed between JSON APIs, there is a huge difference in their knowledge.
For this reason, other aspects are worth considering. This chapter just focused on speed, not capabilities.
:::