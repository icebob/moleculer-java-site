---
title: Logging
---

## Moleculer logging basics

Moleculer uses SLF4J (https://www.slf4j.org) for logging.
Here is a short example showcasing how you can access the logger:

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import services.moleculer.service.*;

@Controller
public class Math extends Service {

    /**
     * Logger of this Service
     */
    private static final Logger log = LoggerFactory.getLogger(Math.class);

    /**
     * The "math.add" Action.
     */
    Action add = ctx -> {

        // Log request
        log.info("Request received: " + ctx);

        // Calculate response
        int a = ctx.params.get("a", 0);
        int b = ctx.params.get("b", 0);
        int c = a + b;
        return ctx.params.put("c", c);
    };
}
```

## Dependencies

The APIs used by Moleculer Framework use multiple logging implementations (eg. Apache Commons Logging, Log4j, JDK logging).
It is advisable to redirect all of them to the JDK logger as this will work with standalone (Netty-based) runtime and within J2EE servers.
To do this, add the following dependencies to the build file:

```gradle
dependencies {

compile group: 'org.slf4j', name: 'slf4j-api',        version: '1.7.28'
compile group: 'org.slf4j', name: 'slf4j-jdk14',      version: '1.7.28'
compile group: 'org.slf4j', name: 'log4j-over-slf4j', version: '1.7.28'
compile group: 'org.slf4j', name: 'jcl-over-slf4j',   version: '1.7.28'

// ...other dependencies...

}
```

## Logging in J2EE environment

When using Spring Boot, you can turn off the initialization of Spring Boot logging,
by setting the "org.springframework.boot.logging.LoggingSystem" property to "false".
Thus, the Moleculer Application will use the J2EE server's default logging mechanism.
It looks like this in "web.xml":

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee" ...>
    
    <servlet>
        <servlet-name>Moleculer Servlet</servlet-name>
        <servlet-class>services.moleculer.web.servlet.MoleculerServlet</servlet-class>

        <!-- USE THE J2EE SERVER'S LOGGING SYSTEM -->
                
        <init-param>
            <param-name>-Dorg.springframework.boot.logging.LoggingSystem</param-name>
            <param-value>none</param-value>
        </init-param>
        ...
    </servlet>

</web-app>
```

## Logging in standalone runtime mode

When running standalone (on top of Netty), you need to set the "logging.config" parameter to something like this:

```
java -Dlogging.config="classpath:logging.properties"
     -cp <list of JARs>
     services.moleculer.config.MoleculerRunner <app class>
```

## Detailed Example

[This demo project](https://moleculer-java.github.io/moleculer-spring-boot-demo/)
demonstrating some of the capabilities of Moleculer.
In the project, logging is set to both runtime modes (J2EE and Netty).
The project can be imported into the Eclipse IDE or IntelliJ IDEA.