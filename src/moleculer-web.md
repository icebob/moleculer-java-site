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

## HTTP Middlewares

- HttpMiddleware
- By default Middlewares are matched in **reversed** order they are added to the Route.

## Built-in Middlewares

### ServeStatic Middleware

Service to serve files from within a given root directory. When a file is not
found, instead of sending a 404 response. Supports content compression,
automatic "Content-Type" detection, and ETAGs.
 
```java
ServeStatic staticHandler = new ServeStatic("/", "/www");
staticHandler.setEnableReloading(true) // Turn off in production mode
route.use(staticHandler);
```

### Redirector Middleware

Redirects requests from a specified location to an another location.

```java
// Any requests to the root path "/"
// will cause the "index.html" page to be served.
route.use(new Redirector("/", "index.html", 307));
```

### NotFound Middleware

Refuses all HTTP requests with "Error 400 Not Found" message.

```java
// Usage with "ServeStatic" and "Favicon" middlewares:
route.use(new NotFound()); // Executed last
route.use(new ServeStatic("/", "/www")); // Executed second
route.use(new Favicon("/www/images/custom.ico")); // Executed first
```

### Favicon Middleware

Handles "/favicon.ico" HTTP requests.
Favicons can be specified using a path to the filesystem,
or by default this Middleware will look for a file on the classpath with the name "favicon.ico".

```java
route.use(new Favicon("custom.ico"));
```

### BasicAuthenticator Middleware

Simple middleware that provides HTTP BASIC Authentication support.
When the BasicAuthenticator Middleware receives this information,
it calls the configured `BasicAuthProvider` with the username and password to authenticate the user.
If the authentication is successful the handler attempts to authorise the user.
If that is successful then the routing of the request is allowed to continue to the application handlers,
otherwise a 403 response is returned to signify that access is denied.

```java
route.use(new BasicAuthenticator("user", "password"));
```

### CorsHeaders Middleware

Implements server side [CORS](https://www.w3.org/wiki/CORS) support for Moleculer.
Cross Origin Resource Sharing is a mechanism for allowing resources to be requested from one host and served from another.

```java
route.use(new CorsHeaders());
```

### ErrorPage Middleware

Custom error page (Error 404, 500, etc.) handler.

```java
ErrorPage errorPages = new ErrorPage("error-default.html");
errorPages.setTemplate(404, "error-404.html");
errorPages.setTemplate(500, "error-500.html");
route.use(errorPages);
```

### HostNameFilter Middleware

The `HostNameFilter` adds the ability to allow or block requests based on the host name of the client.
 
```java
HostNameFilter filter = new HostNameFilter();
filter.allow("domain.server**");
route.use(filter);
```

### IpFilter Middleware

The `IpFilter` Middleware adds the ability to allow or block requests based on the IP address of the client.

```java
IpFilter filter = new IpFilter();
filter.allow("150.10.**");
route.use(filter);
```

### RateLimiter Middleware

Rate Limiter limits concurrent constant requests to the HTTP calls in the application.

```java
route.use(new RateLimiter(100, true));
```

### RequestLogger Middleware

Writes request headers and response headers + response body into the log.
Request body not logged in this version. WARNING: Using this middleware
reduces the performance (nevertheless, it may be useful during development).
Be sure to turn it off in production mode.

```java
route.use(new RequestLogger(2048));
```

### ResponseDeflater Middleware

Compresses body of REST responses. Do not use it with `ServeStatic` Middleware;
`ServeStatic` also compresses the data. Use it to compress the response of REST
services. Using this Middleware reduces the performance, so use it only on
slow networks.
 
```java
route.use(new ResponseDeflater(Deflater.BEST_SPEED));
```

### ResponseHeaders Middleware

Adds static HTTP-headers to the response message.

```java
route.use(new ResponseHeaders("X-Robots-Tag", "noindex"));
```

### ResponseTime Middleware

Adds a header "X-Response-Time" to the response, containing the time taken in
MILLISECONDS to process the request.
 
```java
route.use(new ResponseTime());
```

### ResponseTimeout Middleware

Middleware that will timeout requests if the response has not been written
after the specified time. HTTP response code will be "408".
 
```java
route.use(new ResponseTimeout(1000L * 30));
```

### SessionCookie Middleware

Generates Session Cookies, and sets the cookie header.

```java
route.use(new SessionCookie("SID"));
```

### TopLevelCache Middleware

URL-based content cache. It is good for caching the responses of
non-authenticated REST services with large responses. For example, if the
service generates blog/wiki content using a HTML Template Egine. It is not
advisable to cache POST requests and/or requests that depend not only on the
URL but also on the content of the request. `TopLevelCache` speeds up querying
of various reports (tables, charts) and dynamically generated images.
 
```java
route.use(new TopLevelCache("/blog/posts/**"));
```

### XSRFToken Middleware

This middleware adds "X-XSRF-TOKEN" header to responses.

```java
route.use(new XSRFToken());
```

## Template Engines

Moleculer ApiGateway includes dynamic page generation capabilities by
including out of the box support for several popular template engines.

### Mustache Template Engine

Server-side template engine based on [Mustache API](https://github.com/spullara/mustache.java).
Mustache is described as a "logic-less" system because it lacks any explicit control flow statements,
like if and else conditionals or for loops; however,
both looping and conditional evaluation can be achieved using section tags processing lists and lambdas.

::: warning Mustache dependencies
To use Mustache Template Engine, add the following dependency to the build script:  
[group: 'com.github.spullara.mustache.java', name: 'compiler', version: '0.9.6'](https://mvnrepository.com/artifact/com.github.spullara.mustache.java/compiler)
:::

**Simple example**

```java
MustacheEngine templateEngine = new MustacheEngine();
templateEngine.setTemplatePath("/www"); // Root path of templates
apiGateway.setTemplateEngine(templateEngine);
```

**Advanced example**

```java
// Development or production mode?
boolean developmentMode = true;

// Create Mustache Template Engine
MustacheEngine templateEngine = new MustacheEngine();

// Set basic properties
templateEngine.setTemplatePath("/www"); // File or classpath to templates
templateEngine.setReloadable(developmentMode); // Autoreload on/off
templateEngine.setDefaultExtension("html"); // Default extension

// Set Mustache-specific properties
DefaultMustacheFactory factory = templateEngine.getFactory();
factory.setRecursionLimit(10);

// Enable multilingualism, and language file reloading in development
// mode (language files can be in YAML or Java Properties format)
templateEngine.setMessageLoader(new DefaultMessageLoader(
                                "languages/messages", // Path to messages
                                "yml", // Use YAML format
                                developmentMode); // Autoreload on/off

// Set the Template Engine of ApiGateway
apiGateway.setTemplateEngine(templateEngine);
```

**Sample template syntax**

```html
<html>
    <body>
        {{> header}}
		<p>A: {{a}}</p>
		<p>B: {{b}}</p>
		<p>C: {{c}}</p>
		<table>
		{{#table}}
			<tr>
				<td>{{first}}</td>
				<td>{{second}}</td>
				<td>{{third}}</td>
			</tr>
		{{/table}}
		</table>
    </body>
</html>
```

### Handlebars Template Engine

Server-side template engine based on [Handlebars API](https://github.com/jknack/handlebars.java).
Handlebars is largely compatible with Mustache templates.
In most cases it is possible to swap out Mustache with Handlebars and continue using your current templates. 

::: warning Handlebars dependencies
To use Handlebars Template Engine, add the following dependency to the build script:  
[group: 'com.github.jknack', name: 'handlebars', version: '4.1.2'](https://mvnrepository.com/artifact/com.github.jknack/handlebars)
:::

**Simple example**

```java
HandlebarsEngine templateEngine = new HandlebarsEngine();
templateEngine.setTemplatePath("/www"); // Root path of templates
apiGateway.setTemplateEngine(templateEngine);
```

**Advanced example**

```java
// Development or production mode?
boolean developmentMode = true;

// Create Handlebars Template Engine
HandlebarsEngine templateEngine = new HandlebarsEngine();

// Set basic properties
templateEngine.setTemplatePath("/www"); // File or classpath to templates
templateEngine.setReloadable(developmentMode); // Autoreload on/off
templateEngine.setDefaultExtension("html"); // Default extension

// Set Handlebars-specific properties
Handlebars engine = templateEngine.getEngine();
engine.setInfiniteLoops(false);
engine.setParentScopeResolution(true);

// Enable multilingualism, and language file reloading in development
// mode (language files can be in YAML or Java Properties format)
templateEngine.setMessageLoader(new DefaultMessageLoader(
                                "languages/messages", // Path to messages
                                "yml", // Use YAML format
                                developmentMode); // Autoreload on/off

// Set the Template Engine of ApiGateway
apiGateway.setTemplateEngine(templateEngine);
```

**Sample template syntax**

The templates have the same syntax as the Mustache syntax.

```html
<html>
    <body>
        {{> header}}
		<p>A: {{a}}</p>
		<p>B: {{b}}</p>
		<p>C: {{c}}</p>
		<table>
		{{#table}}
			<tr>
				<td>{{first}}</td>
				<td>{{second}}</td>
				<td>{{third}}</td>
			</tr>
		{{/table}}
		</table>
    </body>
</html>
```

### DataTree Template Engine

Server-side template engine based on [DataTreeTemplates API](https://github.com/berkesa/datatree-templates).
Small and fast template engine capable of producing html, xml, and plain text files.
The template engine works with hierarchical collection structures - similar to the Mustache Engine but with expandable features.

::: warning DataTreeTemplates dependencies
To use DataTree Template Engine, add the following dependency to the build script:  
[group: 'com.github.berkesa', name: 'datatree-templates', version: '1.1.3'](https://mvnrepository.com/artifact/com.github.berkesa/datatree-templates)
:::

**Simple example**

```java
DataTreeEngine templateEngine = new DataTreeEngine();
templateEngine.setTemplatePath("/www"); // Root path of templates
apiGateway.setTemplateEngine(templateEngine);
```

**Advanced example**

```java
// Development or production mode?
boolean developmentMode = true;

// Create DataTree Template Engine
DataTreeEngine templateEngine = new DataTreeEngine();

// Set basic properties
templateEngine.setTemplatePath("/www"); // File or classpath to templates
templateEngine.setReloadable(developmentMode); // Autoreload on/off
templateEngine.setDefaultExtension("html"); // Default extension

// Set DataTree-specific properties
TemplateEngine engine = templateEngine.getEngine();
engine.setTemplatePreProcessor(new SimpleHtmlMinifier());
		
// Enable multilingualism, and language file reloading in development
// mode (language files can be in YAML or Java Properties format)
templateEngine.setMessageLoader(new DefaultMessageLoader(
                                "languages/messages", // Path to messages
                                "yml", // Use YAML format
                                developmentMode); // Autoreload on/off

// Set the Template Engine of ApiGateway
apiGateway.setTemplateEngine(templateEngine);
```

**Sample template syntax**

[Learn more about DataTreeTemplates syntax.](https://github.com/berkesa/datatree-templates#template-syntax)

```html
<html>
    <body>
        #{include header}
		<p>A: #{a}</p>
		<p>B: #{b}</p>
		<p>C: #{c}</p>
		<table>
			#{for row : table}
			<tr>
				<td>#{row.first}</td>
				<td>#{row.second}</td>
				<td>#{row.third}</td>
			</tr>		
			#{end}
		</table>
    </body>
</html>
```

### FreeMarker Template Engine

Server-side template engine based on [FreeMarker API](https://freemarker.apache.org/).
Apache FreeMarker is a template engine:
a Java library to generate text output (HTML web pages, e-mails, configuration files, source code, etc.)
based on templates and changing data.
Templates are written in the FreeMarker Template Language (FTL), which is a simple, specialized language.

::: warning FreeMarker dependencies
To use FreeMarker Template Engine, add the following dependency to the build script:  
[group: 'org.freemarker', name: 'freemarker', version: '2.3.28'](https://mvnrepository.com/artifact/org.freemarker/freemarker)
:::

**Simple example**

```java
FreeMarkerEngine templateEngine = new FreeMarkerEngine();
templateEngine.setTemplatePath("/www"); // Root path of templates
apiGateway.setTemplateEngine(templateEngine);
```

**Advanced example**

```java
// Development or production mode?
boolean developmentMode = true;

// Create FreeMarker Template Engine
FreeMarkerEngine templateEngine = new FreeMarkerEngine();

// Set basic properties
templateEngine.setTemplatePath("/www"); // File or classpath to templates
templateEngine.setReloadable(developmentMode); // Autoreload on/off
templateEngine.setDefaultExtension("html"); // Default extension

// Set FreeMarker-specific properties
Configuration config = templateEngine.getConfiguration();
config.setAutoFlush(true);
config.setLogTemplateExceptions(true);
		
// Enable multilingualism, and language file reloading in development
// mode (language files can be in YAML or Java Properties format)
templateEngine.setMessageLoader(new DefaultMessageLoader(
                                "languages/messages", // Path to messages
                                "yml", // Use YAML format
                                developmentMode); // Autoreload on/off

// Set the Template Engine of ApiGateway
apiGateway.setTemplateEngine(templateEngine);
```

**Sample template syntax**

```html
<html>
    <body>
    	<#include "header">
		<p>A: ${a}</p>
		<p>B: ${b?string('true', 'false')}</p>
		<p>C: ${c}</p>
		<table>
			<#list table as row>
			<tr>
				<td>${row.first}</td>
				<td>${row.second?string('true', 'false')}</td>
				<td>${row.third}</td>
			</tr>		
			</#list>
		</table>
    </body>
</html>
```

### Jade Template Engine

Server-side template engine based on [Jade4J API](https://github.com/neuland/jade4j).
Jade4J's intention is to be able to process Jade Templates in Java without the need of a JavaScript environment,
while being fully compatible with the original Jade syntax.

::: warning Jade dependencies
To use Jade Template Engine, add the following dependency to the build script:  
[group: 'de.neuland-bfi', name: 'jade4j', version: '1.2.7'](https://mvnrepository.com/artifact/de.neuland-bfi/jade4j)
:::
 
**Simple example**

```java
JadeEngine templateEngine = new JadeEngine();
templateEngine.setTemplatePath("/www"); // Root path of templates
apiGateway.setTemplateEngine(templateEngine);
```

**Advanced example**

```java
// Development or production mode?
boolean developmentMode = true;

// Create Jade Template Engine
JadeEngine templateEngine = new JadeEngine();

// Set basic properties
templateEngine.setTemplatePath("/www"); // File or classpath to templates
templateEngine.setReloadable(developmentMode); // Autoreload on/off
templateEngine.setDefaultExtension("html"); // Default extension

// Set Jade4J-specific properties
JadeConfiguration config = templateEngine.getConfiguration();
config.setPrettyPrint(false);
config.setMode(Jade4J.Mode.HTML);

// Enable multilingualism, and language file reloading in development
// mode (language files can be in YAML or Java Properties format)
templateEngine.setMessageLoader(new DefaultMessageLoader(
                                "languages/messages", // Path to messages
                                "yml", // Use YAML format
                                developmentMode); // Autoreload on/off

// Set the Template Engine of ApiGateway
apiGateway.setTemplateEngine(templateEngine);
```

**Sample template syntax**

```jade
doctype html
html
  body
    include header
    p A: #{a}
    p B: #{b}
    p C: #{c}
    table
      for row in table
        tr
          td #{row.first}
          td #{row.second}
          td #{row.third}
```

### Pebble Template Engine

Server-side template engine based on [Pebble API](https://github.com/PebbleTemplates/pebble).
Pebble is a Java templating engine inspired by Twig and similar to the Python Jinja Template Engine syntax.
It features templates inheritance and easy-to-read syntax, ships with built-in autoescaping for security.

::: warning Pebble dependencies
To use Pebble Template Engine, add the following dependency to the build script:  
[group: 'com.mitchellbosecke', name: 'pebble', version: '2.4.0'](https://mvnrepository.com/artifact/com.mitchellbosecke/pebble)
:::

**Simple example**

```java
PebbleEngine templateEngine = new PebbleEngine();
templateEngine.setTemplatePath("/www"); // Root path of templates
apiGateway.setTemplateEngine(templateEngine);
```

**Advanced example**

```java
// Development or production mode?
boolean developmentMode = true;

// Create Pebble Template Engine
PebbleEngine templateEngine = new PebbleEngine();

// Set basic properties
templateEngine.setTemplatePath("/www"); // File or classpath to templates
templateEngine.setReloadable(developmentMode); // Autoreload on/off
templateEngine.setDefaultExtension("html"); // Default extension

// Enable multilingualism, and language file reloading in development
// mode (language files can be in YAML or Java Properties format)
templateEngine.setMessageLoader(new DefaultMessageLoader(
                                "languages/messages", // Path to messages
                                "yml", // Use YAML format
                                developmentMode); // Autoreload on/off

// Set the Template Engine of ApiGateway
apiGateway.setTemplateEngine(templateEngine);
```

**Sample template syntax**

```html
<html>
    <body>
    	{% include "header" %}
		<p>A: {{a}}</p>
		<p>B: {{b}}</p>
		<p>C: {{c}}</p>
		<table>
		{% for row in table %}
			<tr>
				<td>{{row.first}}</td>
				<td>{{row.second}}</td>
				<td>{{row.third}}</td>
			</tr>
		{% endfor %}
		</table>
    </body>
</html>
```

### Thymeleaf Template Engine

Server-side template engine based on [Thymeleaf API](https://www.thymeleaf.org/).
Thymeleaf's main goal is to bring elegant *natural templates* to your development workflow —
HTML that can be correctly displayed in browsers and also work as static prototypes,
allowing for stronger collaboration in development teams.

::: warning Thymeleaf dependencies
To use Thymeleaf Template Engine, add the following dependency to the build script:  
[group: 'org.thymeleaf', name: 'thymeleaf', version: '3.0.11.RELEASE'](https://mvnrepository.com/artifact/org.thymeleaf/thymeleaf)
:::

**Simple example**

```java
ThymeleafEngine templateEngine = new ThymeleafEngine();
templateEngine.setTemplatePath("/www"); // Root path of templates
apiGateway.setTemplateEngine(templateEngine);
```

**Advanced example**

```java
// Development or production mode?
boolean developmentMode = true;

// Create Thymeleaf Template Engine
ThymeleafEngine templateEngine = new ThymeleafEngine();

// Set basic properties
templateEngine.setTemplatePath("/www"); // File or classpath to templates
templateEngine.setReloadable(developmentMode); // Autoreload on/off
templateEngine.setDefaultExtension("html"); // Default extension

// Set Thymeleaf-specific properties
TemplateEngine engine = templateEngine.getEngine();
engine.setLinkBuilder(...);

// Enable multilingualism, and language file reloading in development
// mode (language files can be in YAML or Java Properties format)
templateEngine.setMessageLoader(new DefaultMessageLoader(
                                "languages/messages", // Path to messages
                                "yml", // Use YAML format
                                developmentMode); // Autoreload on/off

// Set the Template Engine of ApiGateway
apiGateway.setTemplateEngine(templateEngine);
```

**Sample template syntax**

```html
<html>
    <body>
		<div th:replace="header"></div>
		<p th:text="${a}">-</p>
		<p th:text="${b}">-</p>
		<p th:text="${c}">-</p>
		<table>
			<tr th:each="row : ${table}">
				<td th:text="${row.first}">-</td>
				<td th:text="${row.second}">-</td>
				<td th:text="${row.third}">-</td>
			</tr>
		</table>
    </body>
</html>
```