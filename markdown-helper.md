# Title

## Subtitle

### Subtitle #2

#### Subtitle #3

Normal content.
Multiple lines are rendered to one line.

Press at least 2 enters to break a line.

It support **bold**, *italic* and ***bold italic*** formats.
For constants or variables use `this` format.

>It is a quoated text. (for info blocks)

## Code blocks

**Javascript example**
```js
const { ServiceBroker } = require("moleculer");
const broker = new ServiceBroker({
    logger: console,
    logLevel: "info"
});
```

**Java example**
```java
@Name("service2")
@Dependencies({ "service3" })
public static class Service2Service extends Service {

    @Name("test")	
    public Action test = ctx -> {
        System.out.println("CALL 2->3");
        return ctx.call("service3.test", ctx.params);
    };

};
```

**XML example**
```xml
<bean id="cacher" class="services.moleculer.cacher.MemoryCacher">

    <!-- Maximum number of entries per partition -->	
    <property name="capacity" value="2048" />
    
    <!-- Default expiration time, in SECONDS (0 = never) -->
    <property name="ttl"      value="0" />
    
    <!-- Cleanup period time, in SECONDS -->
    <property name="cleanup"  value="5" />
    
</bean>
```

-------------------

## Lists

* Item 1
* Item 2
    * Sub-item 1

## Ordered list

1. Item 1
2. Item 2


## Table

| Name | Type | Description |
| ---- | ---- | ----------- |
| `nodeID` | `String` | Local Node ID |
| `namespace` | `String` | Namespace |

 ## Images

 ![Alt Text](https://moleculer.services/0.12/docs/assets/repl/nodes.png)


## Hexo specific stuffs

**Info block**

{% note info Some extra information %}
It is important to be aware that you can't use variable name which is reserved for service or coincides with your method names! E.g. `this.name`, `this.version`, `this.settings`, `this.schema`...etc.  
{% endnote %}

{% note warn Warning info block %}
It is important to be aware that you can't use variable name which is reserved for service or coincides with your method names! E.g. `this.name`, `this.version`, `this.settings`, `this.schema`...etc.  
{% endnote %}