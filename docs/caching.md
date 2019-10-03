title: Caching
---

Moleculer has a built-in caching solution to cache responses of service actions.
By default, ServiceBroker uses MemoryCacher.

**Cached action example**

```java
@Name("users")
public class UserService extends Service {

    // Enable caching to this action
    @Cache()
    public Action list = ctx -> {
        logger.info("Handler called!");
            
        // Response structure:
        // [
        //   { id: 1, name: "John" },
        //   { id: 2, name: "Jane" }
        // ]
        Tree root = new Tree();
        Tree list = root.putList("list");
        list.addMap().put("id", 1).put("name", "John");
        list.addMap().put("id", 2).put("name", "Jane");
        return list;
    };
}

// Invoke "users.list" action twice:
Promise.resolve()
    .then(rsp -> {
        
        // The first time the cache is empty, the Service will be invoked.
        return broker.call("users.list");
        
    }).then(rsp -> {
    
        // First result
        logger.info("Users count:" + rsp.size());
    
    }).then(rsp -> {
        
        // Returns from cache, handler won't be invoked.
        return broker.call("users.list");
        
    }).then(rsp -> {

        // Second result
        logger.info("Users count from cache:" + rsp.size());
        
    });
```

**Console messages:**

```
[2017-08-18T13:04:33.845Z] INFO  Broker started.
[2017-08-18T13:04:33.848Z] INFO  Handler called!
[2017-08-18T13:04:33.849Z] INFO  Users count: 2
[2017-08-18T13:04:33.849Z] INFO  Users count from cache: 2
```

The `Handler called` message appears only once because the response of the second call came from the cache.

## Cache keys

The cacher generates key from service name, action name and the params of context.
The syntax of key is:
```
<serviceName>.<actionName>:<parameters or hash of parameters>
```
So if you call the `posts.list` action with params `{ limit: 5, offset: 20 }`,
cacher generates cache key from `params` based on JSON serialization and/or hash algorithm.
So the next time, when you call this action with the same params,
it will find the entry in the cache by key.

**Example hashed cache key for "posts.find" action**

```
posts.find:limit|5|offset|20
```

The `params` structure may contain properties that are not relevant to the cache key.
In addition, it can cause performance problems if the key is too long.
Therefore, we recommend that you set the key properties of the "cache" note, which contains a list of basic parameter names under the "keys" property.

Therefore it is recommended to set the key properties of the `cache` annotation which
contains a list of essential parameter names:

**Strict the list of `params` & `meta` properties for key generation**

```java
@Name("posts")
public class PostService extends Service {

    // Generate cache key from "limit", "offset" params and "user.id" meta
    @Cache(keys = { "limit", "offset", "#user.id" })
    public Action list = ctx -> {
        logger.info("Handler called!");
		// ...
    };
}

// If params is { limit: 10, offset: 30 } and meta is { user: { id: 123 } }, the cache key will be:
// posts.list:10|30|123
```

{% note info Performance %}
This solution is pretty fast, so we recommend to use it in production. ![](https://img.shields.io/badge/performance-%2B20%25-brightgreen.svg)
{% endnote %}

### Cache meta keys

To use meta keys in cache `keys` use the `#` prefix.

```java
@Name("posts")
public class PostService extends Service {

    // Generate cache key from "limit", "offset" params and "user.id" meta,
	// cached responses are stored in the cacher for only 5 seconds (ttl = 5).
    @Cache(keys = { "limit", "offset", "#user.id" }, ttl = 5)
    public Action list = ctx -> {
        logger.info("Handler called!");
		// ...
    };
}
```

### Limiting cache key length

Occasionally, the key can be very long, which can cause performance issues.
To avoid it, maximize the length of concatenated params in the key with `maxParamsLength` cacher option.
When the key is longer than this configured limitvalue,
the cacher calculates a hash (SHA256) from the full key and adds it to the end of the key.

> The minimum of `maxParamsLength` is `44` (SHA 256 hash length in Base64).
> 
> To disable this feature, set it to `0`.

**Generate a full key from the whole params without limit**

```java
// The params is { id: 2, title: "New post", content: "It can be very very looooooooooooooooooong content. So this key will also be too long" }
cacher.getCacheKey("posts.find", params);
// Key: 'posts.find:id|2|title|New post|content|It can be very very looooooooooooooooooong content. So this key will also be too long'
```

**Generate a limited-length key**

```java
RedisCacher cacher = new RedisCacher("redis://localhost/");
cacher.setMaxParamsLength(60);
ServiceBroker broker = ServiceBroker.builder().cacher(cacher).build();

// The params is { id: 2, title: "New post", content: "It can be very very looooooooooooooooooong content. So this key will also be too long" }
cacher.getCacheKey("posts.find", params);
// Key: 'posts.find:id|2|title|New pL4ozUU24FATnNpDt1B0t1T5KP/T5/Y+JTIznKDspjT0='
```

## TTL

Default TTL setting can be overriden in action definition.

```java
MemoryCacher cacher = new MemoryCacher();
cacher.setTtl(10);
ServiceBroker broker = ServiceBroker.builder().cacher(cacher).build();

broker.createService(new Service("posts") {

    @Cache(keys = { "limit", "offset", "#user.id" }, ttl = 5)
    public Action list = ctx -> {
        logger.info("Handler called!");
		// ...
    };

});
```

## Custom key-generator and Cacher

The easiest way to build your own Cacher implementation is to inherit your own from an existing cacher class.
To overwrite the built-in cache key generator,
override the `getCacheKey` function with your implementation.
The implementations of the cachers can be found in the `services.moleculer.cacher` package.

## Manual caching

The cacher module can be used manually. Just call the `get`, `set`, `del` methods of the ServiceBroker's `Cacher`.

```java
Cacher cacher = broker.getConfig().getCacher();

// Save to cache
Tree data = new Tree();
data.putList("array").add(1).add(2).add(3);

cacher.set("mykey.a", data, 60);

// Get from cache
cacher.get("mykey.a").then(rsp -> {
    logger.info("Data: " + rsp);
});

// Remove entry from cache
cacher.del("mykey.a");

// Clean all 'mykey' entries
cacher.clean("mykey.**");

// Clean all entries
cacher.clean();
```

## Clear cache

Sometimes you have to clear the old cached entries
(for example, when you change the records in a database).

**Example to clean the cache inside actions**

```java
// Clear all entries
cacher.clean();

// Clear all entries from the `users` cache region
this.broker.cacher.clean("users.**");

// Delete the specified entries
cacher.del("users.list");
cacher.del("users.model:5");
cacher.del("users.model:8|true|2");
```

### Clear cache among multiple service instances

The best practice to clear cache entries among multiple service instances is that use broadcast events.

**Example**
```java
module.exports = {
    name: "users",
    actions: {
        create(ctx) {
            // Create new user entity
            const user = new User(ctx.params);

            // Clear cache
            this.cleanCache();

            return user;
        }
    },

    methods: {
        cleanCache() {
            // Broadcast the event, so all service instances receive it (including this instance). 
            this.broker.broadcast("cache.clean.users");
        }
    }

    events: {
        "cache.clean.users"() {
            if (this.broker.cacher) {
                this.broker.cacher.clean("users.**");
            }
        }
    }
}
```

### Clear cache among different services

Common way is that your service depends on other ones.
E.g. `posts` service stores information from `users` service in cached entries (in case of populating).

**Example cache entry in `posts` service**

```java
{
    _id: 1,
    title: "My post",
    content: "Some content",
    author: {
        _id: 130,
        fullName: "John Doe",
        avatar: "https://..."
    },
    createdAt: 1519729167666
}
```

The `author` field is received from `users` service.
So if the `users` service clears cache entries,
the `posts` service has to clear own cache entries, as well.
Therefore you should also subscribe to the `cache.clear.users` event in `posts` service.

To make it easier, create a `CacheCleaner` mixin and define in constructor the dependent services.

**cache.cleaner.mixin.js**

```java
module.exports = function(serviceNames) {
    const events = {};

    serviceNames.forEach(name => {
        events[`cache.clean.${name}`] = function() {
            if (this.broker.cacher) {
                this.logger.debug(`Clear local '${this.name}' cache`);
                this.broker.cacher.clean(`${this.name}.*`);
            }
        };
    });

    return {
        events
    };
};
```

**posts.service.js**

```java
const CacheCleaner = require("./cache.cleaner.mixin");

module.exports = {
    name: "posts",
    mixins: [CacheCleaner([
        "users",
        "posts"
    ])],

    actions: {
        //...
    }
};
```

With this solution if the `users` service emits a `cache.clean.users` event, the `posts` service will also clear the own cache entries.

**Example for Redis cacher with `redlock` library**

```java
const broker = new ServiceBroker({
  cacher: {
    type: "Redis",
    options: {
      // Prefix for keys
      prefix: "MOL",
      // set Time-to-live to 30sec.
      ttl: 30,
      // Turns Redis client monitoring on.
      monitor: false,
      // Redis settings
      redis: {
        host: "redis-server",
        port: 6379,
        password: "1234",
        db: 0
      },
      lock: {
        ttl: 15, //the maximum amount of time you want the resource locked in seconds
        staleTime: 10, // If the TTL is less than this number, means that the resources are staled
      },
      // Redlock settings
      redlock: {
        // Redis clients. Support node-redis or ioredis. By default will use the local client.
        clients: [client1, client2, client3],
        // the expected clock drift; for more details
        // see http://redis.io/topics/distlock
        driftFactor: 0.01, // time in ms

        // the max number of times Redlock will attempt
        // to lock a resource before erroring
        retryCount: 10,

        // the time in ms between attempts
        retryDelay: 200, // time in ms

        // the max time in ms randomly added to retries
        // to improve performance under high contention
        // see https://www.awsarchitectureblog.com/2015/03/backoff.html
        retryJitter: 200 // time in ms
      }
    }
  }
});
```

With this solution if the `users` service emits a `cache.clean.users` event, the `posts` service will also clear the own cache entries.

## Built-in cachers

### Memory cacher

`MemoryCacher` is a built-in memory cache module. It stores entries in the heap memory.

**Enable memory cacher**

```java
const broker = new ServiceBroker({
    cacher: "Memory"
});
```
Or
```java
const broker = new ServiceBroker({
    cacher: true
});
```

**Enable with options**

```java
const broker = new ServiceBroker({
    cacher: {
        type: "Memory",
        options: {
            ttl: 30 // Set Time-to-live to 30sec. Disabled: 0 or null
            clone: true // Deep-clone the returned value
        }
    }
});
```

**Options**

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `ttl` | `Number` | `null` | Time-to-live in seconds. |
| `clone` | `Boolean` or `Function` | `false` | Clone the cached data when return it. |
| `keygen` | `Function` | `null` | Custom cache key generator function. |
| `maxParamsLength` | `Number` | `null` | Maximum length of params in generated keys. |

#### Cloning

The cacher uses the lodash `_.cloneDeep` method for cloning. To change it, set a `Function` to the `clone` option instead of a `Boolean`.

**Custom clone function with JSON parse & stringify**
```java
const broker = new ServiceBroker({ 
    cacher: {
        type: "Memory",
        options: {
            clone: data => JSON.parse(JSON.stringify(data))
        }
    }
});
```

### Redis cacher

`RedisCacher` is a built-in [Redis](https://redis.io/) based distributed cache module. It uses [`ioredis`](https://github.com/luin/ioredis) library.
Use it, if you have multiple instances of services because if one instance stores some data in the cache, other instances will find it.

**Enable Redis cacher**
```java
const broker = new ServiceBroker({
    cacher: "Redis"
});
```

**With connection string**

```java
const broker = new ServiceBroker({
    cacher: "redis://redis-server:6379"
});
```

**With options**

```java
const broker = new ServiceBroker({
    cacher: {
        type: "Redis",
        options: {
            // Prefix for keys
            prefix: "MOL",            
            // set Time-to-live to 30sec.
            ttl: 30, 
            // Turns Redis client monitoring on.
            monitor: false 
            // Redis settings
            redis: {
                host: "redis-server",
                port: 6379,
                password: "1234",
                db: 0
            }
        }
    }
});
```

**With MessagePack serializer**

```java
const broker = new ServiceBroker({
    nodeID: "node-123",
    cacher: {
        type: "Redis",
        options: {
            ttl: 30,

            // Using MessagePack serializer to store data.
            serializer: "MsgPack",

            redis: {
                host: "my-redis"
            }
        }
    }
});
```

**With Redis Cluster Client**

```java
const broker = new ServiceBroker({
    cacher: {
        type: "Redis",
        options: {
            ttl: 30, 

            cluster: {
                nodes: [
                    { port: 6380, host: "127.0.0.1" },
                    { port: 6381, host: "127.0.0.1" },
                    { port: 6382, host: "127.0.0.1" }
                ],
                options: { /* More information: https://github.com/luin/ioredis#cluster */ }
            }   
        }
    }
});
```

**Options**

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `prefix` | `String` | `null` | Prefix for generated keys. |
| `ttl` | `Number` | `null` | Time-to-live in seconds. Disabled: 0 or null |
| `monitor` | `Boolean` | `false` | Enable Redis client [monitoring feature](https://github.com/luin/ioredis#monitor). If enabled, every client operation will be logged (on debug level) |
| `redis` | `Object` | `null` | Custom Redis options. Will be passed to the `new Redis()` constructor. [Read more](https://github.com/luin/ioredis#connect-to-redis). |
| `keygen` | `Function` | `null` | Custom cache key generator function. |
| `maxParamsLength` | `Number` | `null` | Maximum length of params in generated keys. |
| `serializer` | `String` | `null` | Name of a built-in serializer. Default: `"JSON"` |
| `cluster` | `Object` | `null` | Redis Cluster client configuration. [More information](https://github.com/luin/ioredis#cluster) |


{% note info Dependencies %}
To be able to use this cacher, install the `ioredis` module with the `npm install ioredis --save` command.
{% endnote %}

### LRU memory cacher

`LRU memory cacher` is a built-in [LRU cache](https://github.com/isaacs/node-lru-cache) module. It deletes the least-recently-used items.

**Enable LRU cacher**

```java
const broker = new ServiceBroker({
    cacher: "MemoryLRU"
});
```

**With options**

```java
let broker = new ServiceBroker({
    logLevel: "debug",
    cacher: {
        type: "MemoryLRU",
        options: {
            // Maximum items
            max: 100,
            // Time-to-Live
            ttl: 3
        }
    }
});
```


{% note info Dependencies %}
To be able to use this cacher, install the `lru-cache` module with the `npm install lru-cache --save` command.
{% endnote %}

## Custom cacher

Custom cache module can be created. We recommend to copy the source of [MemoryCacher](https://github.com/moleculerjs/moleculer/blob/master/src/cachers/memory.js) or [RedisCacher](https://github.com/moleculerjs/moleculer/blob/master/src/cachers/redis.js) and implement the `get`, `set`, `del` and `clean` methods.

### Create custom cacher

```java
const BaseCacher = require("moleculer").Cachers.Base;

class MyCacher extends BaseCacher {
    get(key) { /*...*/ }
    set(key, data, ttl) { /*...*/ }
    del(key) { /*...*/ }
    clean(match = "**") { /*...*/ }
}
```

### Use custom cacher

```java
const { ServiceBroker } = require("moleculer");
const MyCacher = require("./my-cacher");

const broker = new ServiceBroker({
    cacher: new MyCacher()
});
```