## Thread pools

`ServiceBroker` uses an `ExecutorService` and a `ScheduledExecutorService` to run the tasks.
The default `ExecutorService` is the common `ForkJoinPool`.
The default `ScheduledExecutorService` is a `ScheduledThreadPool` with the same size (same number of `Threads`).
This setup is fast enough, but uses few `Threads` for some cases.
Both pool types and sizes can be configured when creating `ServiceBroker`, via `ServiceBrokerConfig` or `Builder`:

```java{5,6}
// Create Service Broker config
ServiceBrokerConfig cfg = new ServiceBrokerConfig();

// Set executors
cfg.setExecutor(Executors.newFixedThreadPool(8));			
cfg.setScheduler(Executors.newScheduledThreadPool(4));

// Set other broker properties
cfg.setNodeID("node1");
cfg.setTransporter(...);
		
// Create Service Broker by config
ServiceBroker broker = new ServiceBroker(cfg);
```

Experience has shown that an **outsized pool is slower** than a pool that is exactly the size of the load.
There are several graphical utilities to match the pool type and size.
One of these is
[VisualVM](https://visualvm.github.io/)
, which can accurately track the number of `Threads` running and their load.
[Apache JMeter](http://jmeter.apache.org/)
can be used to generate the appropriate high load.