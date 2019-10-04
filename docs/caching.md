title: Caching
---

Moleculer has a built-in caching solution to cache responses of service actions.

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
// The params is { id: 2,
                   title: "New post",
                   content: "It can be very very looooooooooooooooooong content.
                             So this key will also be too long"
                 }
cacher.getCacheKey("posts.find", params);
// Key: 'posts.find:id|2|title|New post|content|It can be very very looooooooooooooooooong content.
         So this key will also be too long'
```

**Generate a limited-length key**

```java
RedisCacher cacher = new RedisCacher("redis://localhost/");
cacher.setMaxParamsLength(60);
ServiceBroker broker = ServiceBroker.builder().cacher(cacher).build();

// The params is { id: 2,
                   title: "New post",
                   content: "It can be very very looooooooooooooooooong content.
                             So this key will also be too long"
                 }
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

// Remove all 'mykey' entries
cacher.clean("mykey.**");

// Remove all entries from all cache regions
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
@Name("users")
@Controller
public class UserService extends Service {

    @Autowired
    UserDAO userDAO;

    public Action create = ctx -> {

        // Create new user entity
        Promise res = userDAO.createNewUser(ctx.params);

        // Clear cache
        cleanCache();

        // Return a response
        return res;
    };

    @Subscribe("cache.clean.users")
    public Listener userListener = payload -> {
    
        // Remove all cached entries from the "users" cache region
        broker.getConfig().getCacher().clean("users.**");
    };
    
    public void cleanCache() {

        // Broadcast the event, so all service instances
        // receive it (including this instance). 
        broker.broadcast("cache.clean.users");
    }
    
}
```

## Built-in cachers

### Memory cacher

The "Memory Cacher" works with each node having its own local heap-based cache.
This is the fastest cache, but the programmer has to take care of emptying the cache with event broadcasting.
Memory cache is not a distributed cache, it works like a local Map in the VM's memory.
But the number of queries can be millions per second,
because repetitive queries do not generate network traffic.
Supports global and entry-level TTL.
ServiceBroker uses MemoryCacher by default.

**Configure memory cacher**

```java
MemoryCacher cacher = new MemoryCacher();
cacher.setTtl(60);
cacher.setCleanup(10);
cacher.setCapacity(2048);
ServiceBroker broker = ServiceBroker.builder().cacher(cacher).build();
```

**Options**

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `ttl` | `int` | `0` | Default time-to-live in SECONDS (0 = no TTL) |
| `capacity` | `int` | `2048` | Maximum number of entries per cache region |
| `useCloning` | `boolean` | `true` | Make clone from the returned values |
| `cleanup` | `int` | `5` | Cleanup period time in SECONDS |

### Off-heap memory cacher

Off-heap cache is similar to MemoryCacher, but stores entries in the off-heap RAM.
This cache is slower than MemoryCacher, but it stores entries in compressed form.
OHCacher is the solution to store huge amount of data in memory;
if you plan to store few thousands (or less) entries in the cache,
use the faster MemoryCacher, otherwise use OHCacher.
Supports global and entry-level TTL.

**Required dependency**

Off-heap cacher requires [OHC dependencies](https://mvnrepository.com/artifact/org.caffinitas.ohc/ohc-core-j8).

**Configure off-heap cacher**

```java
OHCacher cacher = new OHCacher();
cacher.setTtl(60);
cacher.setCleanup(10);
cacher.setCapacity(2048);
ServiceBroker broker = ServiceBroker.builder().cacher(cacher).build();
```

**Options**

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `ttl` | `int` | `0` | Default time-to-live in SECONDS (0 = no TTL) |
| `capacity` | `int` | auto | Capacity for data over the whole cache in MEGABYTES |
| `segmentCount` | `int` | `number-of-cores * 2` | Number of segments (must be a power of 2) |
| `hashTableSize` | `int` | `8192` | HashTable size (must be a power of 2) |
| `compressAbove` | `int` | `1024` | Compress key and/or value above this size (BYTES) |
| `compressionLevel` | `int` | `1` | Compression level (best speed = 1, best compression = 9) |

### JCache cacher

JSR-107 JCache is a standardized caching API.
Core JCache API does NOT support entry-level TTL parameter.
If you need this feature use RedisCacher, MemoryCacher, or Off-heap Cacher.
JCache is implemented by various caching solutions:
- Apache Ignite
- Hazelcast
- Oracle Coherence
- Terracotta Ehcache
- Infinispan
- Blazing Cache
- Cache2k
- Caffeine
- Etc.

**Required dependency**

JCache cacher requires [JCache API](https://mvnrepository.com/artifact/javax.cache/cache-api)
and it is also necessary to put the dependencies of the JCache implementation in the classpath.

**Configure JCache cacher**

Using the JVM's default JCache implementation:

```java
ServiceBroker broker = ServiceBroker.builder()
                                    .cacher(new JCacheCacher())
                                    .build();
```

Create Cacher using the specified CacheProvider implementation:

```java
CachingProvider provider = new RICachingProvider();
CacheManager manager = provider.getCacheManager();
JCacheCacher cacher = new JCacheCacher(manager);

ServiceBroker broker = ServiceBroker.builder()
                                    .cacher(cacher)
                                    .build();
```

**Options**

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `maxParamsLength` | `int` | `0` | Maximum length of params in generated keys |
| `closeEmptyPartitions` | `boolean` | `true` | Close and dispose empty caches |

### Redis cacher

Redis-based distributed cache.
Supports SSL, clustering and password authentication.
It's the one of the fastest distributed cache.
Supports global and entry-level TTL configuration.

**Configure Redis cacher**

```java
RedisCacher cacher = new RedisCacher();
cacher.setUrls("localhost");
cacher.setTtl(60);
ServiceBroker broker = ServiceBroker.builder().cacher(cacher).build();
```

**With MessagePack serializer**

```java
RedisCacher cacher = new RedisCacher();
cacher.setSerializer(new MsgPackSerializer())
cacher.setUrls("redis://host1:6380", "redis://host2:6381");
ServiceBroker broker = ServiceBroker.builder().cacher(cacher).build();
```

**Options**

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `urls` | `String[]` | `localhost` | Array of URLs of the Redis servers |
| `ttl` | `int` | `0` | Time-to-live in seconds (0 = disabled) |
| `maxParamsLength` | `int` | `0` | Maximum length of params in generated keys |
| `serializer` | `Serializer` | `JsonSerializer` | Implementation of the serializer/deserializer |
| `password` | `String` | `null` | Configures authentication (URI may contain the password) |
| `secure` | `boolean` | `false` | Sets SSL connection on/off (URI may contain the SSL info) |

**Redis URI syntax**

*Redis Standalone*

_redis_ *://* [*:* _password_@] _host_ [*:* _port_] [*/* _database_][*?* [_timeout=timeout_[_d|h|m|s|ms|us|ns_]] [&_database=database_]]

*Redis Standalone (SSL)*

_rediss_ *://* [*:* _password_@] _host_ [*:* _port_] [*/* _database_][*?* [_timeout=timeout_[_d|h|m|s|ms|us|ns_]] [&_database=database_]]

*Redis Standalone (Unix Domain Sockets)*

_redis-socket_ *://* [*:* _password_@]_path_ [*?*[_timeout=timeout_[_d|h|m|s|ms|us|ns_]][&_database=database_]]

*Redis Sentinel*

_redis-sentinel_ *://* [*:* _password_@] _host1_[*:* _port1_] [, _host2_[*:* _port2_]] [, _hostN_[*:* _portN_]] [*/* _database_][*?*[_timeout=timeout_[_d|h|m|s|ms|us|ns_]] [&_sentinelMasterId=sentinelMasterId_] [&_database=database_]]

## Custom cacher

When you create your own Cacher, the new Cacher class must be inherited from `services.moleculer.cacher.Cacher`.
The get(), set(), del(), clean() functions must be implemented.
You can get ideas for implementation from the contents of the `services.moleculer.cacher` package,
which contains the Cachers already made.

### Use custom cacher

```java
Cacher cacher = new MyCustomCacher();
ServiceBroker broker = ServiceBroker.builder().cacher(cacher).build();
```