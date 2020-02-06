## Types of Moleculer Runners

Moleculer Runner is a helper object that helps you start and stop Spring-based Moleculer applications.
The Spring-based application can be a "classic" XML-based Spring application or an XML-less Spring Boot application.
There are two sub-types of Molecular Runner:

- Standalone runtime, with Netty Server (it's the `services.moleculer.config.MoleculerRunner`)
- Servlet-based J2EE runtime (implemented in `services.moleculer.web.servlet.MoleculerServlet`)

## Standalone runtime

XML-based Spring application example (starter command / BAT file):

```{4}
java.exe -classpath <all JARS>
         -Dlogging.config=/cfg/logging-production.properties
         services.moleculer.config.MoleculerRunner // Moleculer Runner class
         path/to/application.xml                   // File-or classpath to XML config
         6786                                      // UDP port for stop command (optional)
         secret123                                 // Stop password (optional)
```

Spring Boot application example (starter command / BAT file):  
[Source of a complete BAT file to start service](https://github.com/moleculer-java/moleculer-spring-boot-demo/blob/master/installer/bin/development-start.bat)

```{5}
java.exe -classpath <all JARS>
         -Dlogging.config=/cfg/logging-development.properties
         -Dspring.profiles.active=development      // Spring Profile
         services.moleculer.config.MoleculerRunner // Moleculer Runner class
         my.application.MoleculerApplication       // Your Spring Boot Application class
         6786                                      // UDP port for stop command (optional)
         secret123                                 // Stop password (optional)
```

Regular shutdown of a running Moleculer process (the first program parameter is "stop"):  
[Source of a complete BAT file to stop service](https://github.com/moleculer-java/moleculer-spring-boot-demo/blob/master/installer/bin/development-stop.bat)

```{4}
java.exe -classpath <all JARS>
         -Dlogging.config=/cfg/logging-production.properties
         services.moleculer.config.MoleculerRunner // Moleculer Runner class
         stop                                      // Always "stop"
         6786                                      // UDP port for stop command (optional)
         secret123                                 // Stop password (optional)
```

With "tomcat7.exe" and "tomcat7w.exe", MoleculerRunner can run as a **Windows Service**.
The easiest way to do this is to copy the
[Inno Setup script](https://github.com/moleculer-java/moleculer-spring-boot-demo/blob/master/installer/moleculer.config.iss)
that creates the installer from
[this directory](https://github.com/moleculer-java/moleculer-spring-boot-demo/tree/master/installer)
and modify the required properties (eg. the "ProgramName", "CompanyName" and replace all occurences of "MoleculerJava"
with your own short program ID, for example "BackendApp01" (without spaces).

See the
[previous section](logging.html#logging-in-standalone-runtime-mode)
for more information about logger configuration in standalone mode.

## Servlet-based runtime

The Moleculer Servlet can also load an XML-based or Spring Boot-based application.
It's built on the standard Servlet v3.1 API, but it also includes a fallback implementation for older servers.
This Servlet is tested and compatible with the following Servlet Containers / J2EE Servers:

- Oracle WebLogic Server V12
- Red Hat JBoss Enterprise Application Platform V7
- WebSphere Application Server V19 Liberty
- GlassFish Server Open Source Edition V4 and V5
- Apache Tomcat V7, V8 and V9
- Eclipse Jetty V9
- Payara Server V5

Adding the
[Moleculer Web API Gateway](moleculer-web.html#about-api-gateway)
module to the dependency list requires Servlet-based deployment.

**XML-based** Spring application example (web.xml):

```xml{13,14}
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee" ...>
    <listener>
        <listener-class>services.moleculer.web.servlet.websocket.EndpointDeployer</listener-class>
    </listener>
    <servlet>
        <servlet-name>Moleculer Servlet</servlet-name>
        <servlet-class>services.moleculer.web.servlet.MoleculerServlet</servlet-class>

        <!-- YOUR SPRING BOOT APPLICATION CLASS -->
        
        <init-param>
            <param-name>moleculer.config</param-name>
            <param-value>/WEB-INF/application.xml</param-value>
        </init-param>

        <!-- ... -->
                
        <async-supported>true</async-supported>        
    </servlet>
    <servlet-mapping>
        <servlet-name>Moleculer Servlet</servlet-name>
        <url-pattern>/*</url-pattern>
    </servlet-mapping>
</web-app>
```

**Spring Boot** application example (web.xml):

```xml{13,14}
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee" ...>
    <listener>
        <listener-class>services.moleculer.web.servlet.websocket.EndpointDeployer</listener-class>
    </listener>
    <servlet>
        <servlet-name>Moleculer Servlet</servlet-name>
        <servlet-class>services.moleculer.web.servlet.MoleculerServlet</servlet-class>

        <!-- YOUR SPRING BOOT APPLICATION CLASS -->
        
        <init-param>
            <param-name>moleculer.application</param-name>
            <param-value>my.application.MoleculerApplication</param-value>
        </init-param>

        <!-- ... -->
                
        <async-supported>true</async-supported>        
    </servlet>
    <servlet-mapping>
        <servlet-name>Moleculer Servlet</servlet-name>
        <url-pattern>/*</url-pattern>
    </servlet-mapping>
</web-app>
```

[Example of complete web.xml](https://github.com/moleculer-java/moleculer-spring-boot-demo/blob/master/src/main/webapp/WEB-INF/web.xml)