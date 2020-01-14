## About API Gateway

Moleculer API Gateway is a Service that makes other Moleculer Services available through REST.
It allows to create high-performance, non-blocking, distributed web applications.
Web request processing can be fine tuned using server-independent middlewares.
Moleculer API Gateway provides full support for high-load React, Angular or VueJS applications.

### Features

- Same code can run as a J2EE Servlet or as a high-performance Netty application without changing a single program line
- WebSocket support (same API for Netty Server and J2EE Servers)
- Supports server-side template engines (FreeMarker, Jade, Pebble, Thymeleaf, Mustache, Velocity)
- Many built-in middlewares (ServeStatic, CORS headers, custom error messages, etc.)

The Moleculer API Gateway is compatible with the following Servlet Containers / J2EE Servers:

- Oracle WebLogic Server V12
- Red Hat JBoss Enterprise Application Platform V7
- WebSphere Application Server V19 Liberty
- GlassFish Server Open Source Edition V4 and V5
- Apache Tomcat V7, V8 and V9
- Eclipse Jetty V9
- Payara Server V5

API Gateway may work with other servers (it's built on the standard Servlet v3.1 API,
but it also includes a fallback implementation for older servers). 

### Download

**Maven**

```xml
<dependencies>
    <dependency>
        <groupId>com.github.berkesa</groupId>
        <artifactId>moleculer-java-web</artifactId>
        <version>1.2.6</version>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

**Gradle**

```gradle
dependencies {
    compile group: 'com.github.berkesa', name: 'moleculer-java-web', version: '1.2.6' 
}
```

### Short Example

The simplest way to create a REST service using Moleculer is the following:

```java
new ServiceBroker()
    .createService(new NettyServer(8080))
    .createService(new ApiGateway("*"))
    .createService(new Service("math") {
       Action add = ctx -> {
         return ctx.params.get("a", 0) +
                ctx.params.get("b", 0);
         };
       }).start();
```
After starting the program, enter the following URL into your browser:  
`http://localhost:8080/math/add?a=3&b=6`

The response will be "9". The above service can also be invoked using a POST method.  
To do this, submit the `{"a":3,"b":5}` JSON (as POST body) to this URL:  
`http://localhost:8080/math/add`

### Detailed Example

[This demo project](https://moleculer-java.github.io/moleculer-spring-boot-demo/)
demonstrating some of the capabilities of APIGateway.  
The project can be imported into the Eclipse IDE or IntelliJ IDEA.
The brief examples illustrate the following:

- Integration of Moleculer API into the Spring Boot Framework
- Configuring HTTP Routes and Middlewares
- Creating non-blocking Moleculer Services
- Publishing and invoking Moleculer Services as REST Services
- Generating HTML pages in multiple languages using Template Engines
- Using WebSockets (sending real-time server-side events to browsers)
- Using file upload and download
- Video streaming and server-side image generation
- Creating a WAR from the finished project (Servlet-based runtime)
- Run code without any changes in "standalone mode" (Netty-based runtime) 

## Routes

## Whitelist

If you don't want to publish all actions, you can filter them with whitelist option.
Use match strings or regexp in list. _To enable all actions, use `"**"` item._

```java
broker.createService({
    mixins: [ApiService],

    settings: {
        routes: [{
            path: "/api",

            whitelist: [
                // Access any actions in 'posts' service
                "posts.*",
                // Access call only the `users.list` action
                "users.list",
                // Access any actions in 'math' service
                /^math\.\w+$/
            ]
        }]
    }
});
```

## Aliases

You can use alias names instead of action names. You can also specify the method. Otherwise it will handle every method types. 
Using named parameters in aliases is possible. Named parameters are defined by prefixing a colon to the parameter name (`:name`).

```java
broker.createService({
    mixins: [ApiService],

    settings: {
        routes: [{
            aliases: {
                // Call `auth.login` action with `GET /login` or `POST /login`
                "login": "auth.login",

                // Restrict the request method
                "POST users": "users.create",

                // The `name` comes from named param. 
                // You can access it with `ctx.params.name` in action
                "GET greeter/:name": "test.greeter",
            }
        }]
    }
});
```

::: tip
The named parameter is handled with [path-to-regexp](https://github.com/pillarjs/path-to-regexp) module. Therefore you can use [optional](https://github.com/pillarjs/path-to-regexp#optional) and [repeated](https://github.com/pillarjs/path-to-regexp#zero-or-more) parameters, as well.
:::


You can also create RESTful APIs.
```java
broker.createService({
    mixins: [ApiService],

    settings: {
        routes: [{
            aliases: {
                "GET users": "users.list",
                "GET users/:id": "users.get",
                "POST users": "users.create",
                "PUT users/:id": "users.update",
                "DELETE users/:id": "users.remove"
            }
        }]
    }
});
```

For REST routes you can also use this simple shorthand alias:

```java
broker.createService({
    mixins: [ApiService],

    settings: {
        routes: [{
            aliases: {
                "REST users": "users"
            }
        }]
    }
});
```

::: warning
To use this shorthand alias, create a service which has `list`, `get`, `create`, `update` and `remove` actions.
:::

You can make use of custom functions within the declaration of aliases. In this case, the handler's signature is `function (req, res) {...}`.

::: tip
Please note that Moleculer uses native Node.js [HTTP server](https://nodejs.org/api/http.html)
:::

```java
broker.createService({
    mixins: [ApiService],

    settings: {
        routes: [{
            aliases: {
                "POST upload"(req, res) {
                    this.parseUploadedFile(req, res);
                },
                "GET custom"(req, res) {
                    res.end('hello from custom handler')
                }
            }
        }]
    }
});
```

::: tip
There are some internal pointer in `req` & `res` objects:
* `req.$ctx` are pointed to request context.
* `req.$service` & `res.$service` are pointed to this service instance.
* `req.$route` & `res.$route` are pointed to the resolved route definition.
* `req.$params` is pointed to the resolved parameters (from query string & post body)
* `req.$alias` is pointed to the resolved alias definition.
* `req.$action` is pointed to the resolved action.
* `req.$endpoint` is pointed to the resolved action endpoint.
* `req.$next` is pointed to the `next()` handler if the request comes from ExpressJS.

E.g.: To access the broker, use `req.$service.broker`.
:::

### Mapping policy

The `route` has a `mappingPolicy` property to handle routes without aliases.

**Available options:**
- `all` - enable to request all routes with or without aliases (default)
- `restrict` - enable to request only the routes with aliases.

```java
broker.createService({
    mixins: [ApiService],

    settings: {
        routes: [{
            mappingPolicy: "restrict",
            aliases: {
                "POST add": "math.add"
            }
        }]
    }
});
```

You can't request the `/math.add` or `/math/add` URLs, only `POST /add`.

## Middlewares

It supports Connect-like middlewares in global-level,
route-level & alias-level. Signature: `function(req, res, next) {...}`.
For more info check [express middleware](https://expressjs.com/en/guide/using-middleware.html)

**Example**

```java
broker.createService({
    mixins: [ApiService],
    settings: {
        // Global middlewares. Applied to all routes.
        use: [
            cookieParser(),
            helmet()
        ],

        routes: [
            {
                path: "/",

                // Route-level middlewares.
                use: [
                    compression(),
                    
                    passport.initialize(),
                    passport.session(),

                    serveStatic(path.join(__dirname, "public"))
                ],
                
                aliases: {
                    "GET /secret": [
                        // Alias-level middlewares.
                        auth.isAuthenticated(),
                        auth.hasRole("admin"),
                        "top.secret" // Call the `top.secret` action
                    ]
                }
            }
        ]
    }
});
```

## Multiple routes

You can create multiple routes with different prefix,
whitelist, alias, calling options & authorization.

::: tip
When using multiple routes you should explicitly set the body parser(s) for each route.
:::

```java
broker.createService({
    mixins: [ApiService],

    settings: {
        routes: [
            {
                path: "/admin",

                authorization: true,

                whitelist: [
                    "$node.*",
                    "users.*",
                ]

                bodyParsers: {
                    json: true
                }
            },
            {
                path: "/",

                whitelist: [
                    "posts.*",
                    "math.*",
                ]

                bodyParsers: {
                    json: true
                }
            }
        ]
    }
});
```

## Response type & status code

When the response is received from an action handler,
the API gateway detects the type of response and set the `Content-Type` in the `res` headers.
The status code is `200` by default.
Of course you can overwrite these values, moreover, you can define custom response headers, too.

To define response headers & status code use `ctx.meta` fields:

**Available meta fields:**
* `ctx.meta.$statusCode` - set `res.statusCode`.
* `ctx.meta.$statusMessage` - set `res.statusMessage`.
* `ctx.meta.$responseType` - set `Content-Type` in header.
* `ctx.meta.$responseHeaders` - set all keys in header.
* `ctx.meta.$location` - set `Location` key in header for redirects.

**Example**

```java
module.exports = {
    name: "export",
    actions: {
        // Download response as a file in the browser
        downloadCSV(ctx) {
            ctx.meta.$responseType = "text/csv";
            ctx.meta.$responseHeaders = {
                "Content-Disposition": `attachment; filename="data-${ctx.params.id}.csv"`
            };
            
            return csvFileStream;
        }

        // Redirect the request
        redirectSample(ctx) {
            ctx.meta.$statusCode = 302;
            ctx.meta.$location = "/login";

            return;
        }
    }
}
```

## Route hooks

The `route` has before & after call hooks.
You can use it to set `ctx.meta`, access `req.headers` or modify the response `data`.

```java
broker.createService({
    mixins: [ApiService],

    settings: {
        routes: [
            {
                path: "/",

                onBeforeCall(ctx, route, req, res) {
                    // Set request headers to context meta
                    ctx.meta.userAgent = req.headers["user-agent"];
                },

                onAfterCall(ctx, route, req, res, data) {
                    // Async function which return with Promise
                    return doSomething(ctx, res, data);
                }
            }
        ]
    }
});
```

> In previous versions of Moleculer Web, you couldn't manipulate the `data` in `onAfterCall`.
Now you can, but you must always return the new or original `data`.