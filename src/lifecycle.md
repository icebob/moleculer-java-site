## Broker lifecycle

This section describes what happens when the Service Broker starts or stops.

### Starting logic

When the broker starts
[Transporter](transporters.html)
to connect to other nodes,
does not yet publish the local service list.
It starts all the Services first (calls the `started` handler)
and then publishes the service list to the other nodes.
Hence remote nodes send requests only after all local service are started properly.

::: warning Avoid deadlocks
Dead-locks can be made when two services wait for each other.
For example `users` service has `@Dependencies({"posts"})` and `posts` service has `@Dependencies({"users"})`.
To avoid it, remove the concerned service from `@Dependencies` and use
[waitForServices](services.html#wait-for-services-via-servicebroker)
method in `started` handler.
:::

### Stopping logic

When you call `broker.stop()` the Service Broker sends a `DISCONNECT` message to remote nodes,
so they can route the requests to other instances instead of services under stopping.
Then the ServiceBroker stops all local services and the Transporter.

## Service lifecycle

This section describes what happens when a service is starting & stopping and how you should use the lifecycle event handler.

### `started` event handler

It is triggered when the `broker.start` is called and the broker starts all local services.
Use it to connect to database, listen servers...etc.

```java{17}
import services.moleculer.ServiceBroker;
import services.moleculer.cacher.Cacher;
import services.moleculer.service.*;

@Name("test")
public class TestService extends Service {

    /**
     * Object to initialize
     */
    private Cacher cacher;

    /**
     * Starting the Service instance...
     */
    @Override
    public void started(ServiceBroker broker) throws Exception {
        super.started(broker);

        // Custom initialization code
        cacher = broker.getConfig().getCacher();
        // ...
    }
}
```

To register for the above Service at the Service Broker:

```java
ServiceBrokerConfig cfg = new ServiceBrokerConfig();
cfg.setNodeID("node1");
ServiceBroker broker = ServiceBroker(cfg);
broker.createService(new TestService());
broker.start();
```

### `stopped` event handler

It is triggered when the `broker.stop` is called and the broker starts stopping all local services.
Use it to close database connections, stop Executors and Timers, close sockets...etc.

```java{7}
import services.moleculer.service.*;

@Name("test")
public class TestService extends Service {

    @Override
    public void stopped() {
        super.stopped();
        
        // Release resources...
    }
}
```

If you use Spring, the above `started` and `stopped` functions should not be called by Spring as `init-method` or `destroy-method`).
These functions are invoked in all cases by the Service Broker, not by the Spring Framework.
However, you can create `init` / `destroy` functions for Spring, regardless of the `started` / `stopped` functions.
In this case, the start and stop order is as follows:

```java
import javax.annotation.*;
import org.springframework.stereotype.Controller;
import io.datatree.Tree;
import services.moleculer.ServiceBroker;
import services.moleculer.service.*;

@Name("test")
@Controller
public class TestService extends Service {

    // --- STARTING SERVICE ---
    
    public TestService() {

        // 1.) The constructor is called first
    }

    @PostConstruct
    public void init() throws Exception {

        // 2.) This invoked before the "started" method
    }

    @Override
    public void started(ServiceBroker broker) throws Exception {
        super.started(broker);

        // 3.) Initialize service...
    }

    // --- RUNNING SERVICE ---
    
    public Action action = ctx -> {

        // 4.) This Action is called by other Actions
        int foo = ctx.params.get("foo", 0)
        return new Tree().put("result", foo + 3);
    };

    // --- STOPPING SERVICE ---

    @Override
    public void stopped() {

        // 5.) Invoked by the Service Broker
    }

    @PreDestroy
    public void destroy() throws Exception {

        // 6.) Invoked by Spring after the "stopped" method
    }

    @Override
    protected void finalize() throws Throwable {

        // 7.) This called last by the Garbage Collector
    }
}
```