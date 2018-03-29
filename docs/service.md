title: Service
---
The Service represents a microservice in the Moleculer. You can define actions and subscribe to events.

## How to create a service

## Base properties

## Settings

## Actions

## Events
You can subscribe to events under the `events` key.

```js
module.exports = {
    name: "report",

    events: {
        // Subscribe to "user.created" event
        "user.created"(payload) {
            this.logger.info("User created:", payload);
            // Do something
        },

        // Subscribe to all "user.*" event
        "user.*"(payload, sender, eventName) {
            // Do something with payload. The `eventName` contains
            // the original event name. E.g. `user.modified`.
            // The `sender` is the nodeID of sender.
        }

        // Subscribe to a local event
        "$node.connected"({ node }) {
            this.logger.info(`Node '${node.id}' is connected!`);
        }
    }
};
```
> In handlers the `this` is always pointed to the Service instance.

### Grouping 
The broker groups the event listeners by group name. By default, The group name is the service name. But you can change it in the event definition.

```js
module.exports = {
    name: "payment",
    events: {
        "order.created": {
            // Register handler to the "other" group instead of "payment" group.
            group: "other",
            handler(payload) {
                // ...
            }
        }
    }
}
```

## Methods
You can also create private methods in the Service. They are under the `methods` key. These functions are private, can't be called with `broker.call`. But you can call it inside service (from action handlers, event handlers and lifecycle event handlers).

**Usage**
```js
module.exports = {
    name: "mailer",
    actions: {
        send(ctx) {
            // Call the `sendMail` method
            return this.sendMail(ctx.params.recipients, ctx.params.subject, ctx.params.body);
        }
    },

    methods: {
        // Send an email to recipients
        sendMail(recipients, subject, body) {
            return new Promise((resolve, reject) => {
                ...
            });
        }
    }
};
```
> The name of the method can't be `name`, `version`, `settings`, `schema`, `broker`, `actions`, `logger`, because these words are reserved in the schema.

> In methods the `this` is always pointed to the Service instance.

## Lifecycle events
There are some lifecycle service events, that will be triggered by broker.

```js
module.exports = {
    name: "www",
    actions: {...},
    events: {...},
    methods: {...},

    created() {
        // Fired when the service instance created. (broker.loadService or broker.createService)
    },

    async started() {
        // Fired when `broker.start()` called.
    }

    async stopped() {
        // Fired when `broker.stop()` called.
    }
};
```
## Dependencies
If your service depends on other services, use the `dependencies` property in the schema. The service can wait for other services before starting. _It uses the broker `waitForServices` method._

```js
module.exports = {
  name: "posts",
  settings: {
      $dependencyTimeout: 30000 // Default: 0 - no timeout
  },
  dependencies: [
      "likes", // shorthand w/o version
      { name: "users", version: 2 }, // with numeric version
      { name: "comments", version: "staging" } // with string version
  ],
  async started() {
      this.logger.info("It will be called after all dependent services are available.");
      const users = await this.broker.call("users.list");
  }
  ....
}
```
The `started` service handler is called once the `likes`, `users` and `comments` services are available (either the local or remote nodes).

## Metadata

The `Service` schema has a `metadata` property. You can store here any meta information about service. You can access it as `this.metadata` inside service functions.
_Moleculer modules don't use it. You can store it whatever you want._

```js
module.exports = {
    name: "posts",
    settings: {},
    metadata: {
        scalable: true,
        priority: 5
    },

    actions: { ... }
};
```

> The `metadata` is transferred among other nodes, you can access it via `$node.services` on other nodes.

## Properties of `this`
In service functions, `this` is always pointed to the Service instance. It has some properties & methods which you can use in your service functions.

| Name | Type |  Description |
| ------- | ----- | ------- |
| `this.name` | `String` | Name of service (from schema) |
| `this.version` | `Number` or `String` | Version of service (from schema) |
| `this.settings` | `Object` | Settings of service (from schema) |
| `this.metadata` | `Object` | Metadata of service (from schema) |
| `this.schema` | `Object` | Schema definition of service |
| `this.broker` | `ServiceBroker` | Instance of broker |
| `this.Promise` | `Promise` | Class of Promise (Bluebird) |
| `this.logger` | `Logger` | Logger instance |
| `this.actions` | `Object` | Actions of service. *Service can call own actions directly but it is not recommended. Use the `ctx.call` instead!* |
| `this.waitForServices` | `Function` | Link to ['broker.waitForServices' method](broker.html#Wait-for-services) |

## Hot reloading services
