title: Strategies
---

## Built-in strategies

ServiceBroker can resolve the `strategy` from a string or set a `BaseStrategy` class to the `strategy` property.

```js
let broker = new ServiceBroker({
    registry: {
        strategy: "Random"
    }
});
```

## RoundRobin strategy
This strategy selects a node based on RoundRobin algorithm.

**Usage**
```js
let broker = new ServiceBroker({
    registry: {
        strategy: "RoundRobin"
    }
});
```

## Random strategy
This strategy selects a node randomly.

**Usage**
```js
let broker = new ServiceBroker({
    registry: {
        strategy: "Random"
    }
});
```
## CPU usage-based strategy
This strategy selects a node which has the lowest CPU usage. Due to the node list can be very long, it gets samples and selects the node with the lowest CPU usage from only samples instead of the whole node list.

**Usage**
```js
let broker = new ServiceBroker({
    registry: {
        strategy: "CpuUsage"
    }
});
```

**Strategy options**

| Name | Type | Default | Description |
| ---- | ---- | --------| ----------- |
| `sampleCount` | `Number` | `3` | the number of samples. |
| `lowCpuUsage` | `Number` | `10` | the low CPU usage percent (%). The node which has lower CPU usage than this value is selected immediately. |

**Usage with custom options**
```js
let broker = new ServiceBroker({
    registry: {
        strategy: "CpuUsage",
        strategyOptions: {
            sampleCount: 3,
            lowCpuUsage: 10
        }
    }
});
```
