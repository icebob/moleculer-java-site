## About Internal Services

The `ServiceBroker` contains some internal services to check the node health or get some registry information.
These services can be disabled by setting `internalServices` parameter to `false` in
[ServiceBrokerConfig](broker.html#create-a-service-broker).

## List of nodes

It lists all known nodes (including local node).

```java
broker.call("$node.list").then(rsp -> {
    logger.info(rsp);
});
```

**Sample response**

```json
[
  {
    "id":"tsmith-pc-7700",
    "available":true,
    "lastHeartbeatTime":1579023883101,
    "cpu":8,
    "port":0,
    "hostname":"tsmith-pc",
    "ipList":[
      "192.168.12.13"
    ],
    "client":{
      "type":"java",
      "version":"1.2.5",
      "langVersion":"1.8.0_162-ea"
    }
  }
]
```

**Parameters**

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `withServices` | `Boolean` | `false` | List with services. |

## List of services

It lists all registered services (local & remote).

```java
broker.call("$node.services").then(rsp -> {
    logger.info(rsp);
});
```

**Sample response**

```json
[
  {
    "name":"api-gw",
    "nodes":[
      "tsmith-pc-7700"
    ],
    "settings":null,
    "metadata":null
  },
  {
    "name":"chatService",
    "nodes":[
      "tsmith-pc-7700"
    ],
    "settings":null,
    "metadata":null
  },
  {
    "name":"upload",
    "nodes":[
      "tsmith-pc-7700"
    ],
    "settings":null,
    "metadata":null
  }
]
```

**Parameters**

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `onlyLocal` | `Boolean` | `false` | List only local services. |
| `skipInternal` | `Boolean` | `false` | Skip the internal services (`$node`). |
| `withActions` | `Boolean` | `false` | List with actions. |

## List of local actions

It lists all registered actions (local & remote).

```java
broker.call("$node.actions").then(rsp -> {
    logger.info(rsp);
});
```

**Sample response**

```json
[
  {
    "name":"$node.actions",
    "count":1,
    "hasLocal":true,
    "available":true,
    "action":{
      "name":"$node.actions"
    }
  },
  {
    "name":"blog.clear",
    "count":1,
    "hasLocal":true,
    "available":true,
    "action":{
      "name":"blog.clear"
    }
  },
  {
    "name":"jmx.findObjects",
    "count":1,
    "hasLocal":true,
    "available":true,
    "action":{
      "name":"jmx.findObjects"
    }
  }
]
```

**Options**

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `onlyLocal` | `Boolean` | `false` | List only local actions. |
| `skipInternal` | `Boolean` | `false` | Skip the internal actions (`$node`). |
| `withEndpoints` | `Boolean` | `false` | List with endpoints _(nodes)_. |

## List of local events

It lists all event subscriptions.

```java
broker.call("$node.events").then(rsp -> {
    logger.info(rsp);
});
```

**Sample response**

```json
[
  {
    "name":"$services.changed",
    "group":"nettyServer",
    "count":1,
    "hasLocal":true,
    "available":true,
    "event":{
      "name":"$services.changed",
      "group":"nettyServer"
    }
  },
  {
    "name":"websocket.send",
    "group":"api-gw",
    "count":1,
    "hasLocal":true,
    "available":true,
    "event":{
      "name":"websocket.send",
      "group":"api-gw"
    }
  }
]
```

**Options**

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `onlyLocal` | `Boolean` | `false` | List only local subscriptions. |
| `skipInternal` | `Boolean` | `false` | Skip the internal event subscriptions `$`. |
| `withEndpoints` | `Boolean` | `false` | List with endpoints _(nodes)_. |

## Health of node

It returns the health info of local node (including process & OS information).

```java
broker.call("$node.health").then(rsp -> {
    logger.info(rsp);
});
```

**Sample response**

```json
{
  "cpu":{
    "cores":8,
    "utilization":16
  },
  "os":{
    "type":"Windows 10",
    "release":"1.2",
    "hostname":"tsmith-pc",
    "arch":"amd64",
    "user":{
      "username":"Tom Smith",
      "homedir":"C:\\Users\\TSmith",
      "shell":""
    }
  },
  "process":{
    "pid":7700,
    "memory":{
      "heapTotal":189792256,
      "heapUsed":57524232
    },
    "uptime":6021
  },
  "client":{
    "type":"java",
    "version":"1.2.5",
    "langVersion":"1.8.0_162-ea"
  },
  "net":{
    "ip":[
      "192.168.12.13"
    ]
  },
  "time":{
    "now":1579023307986,
    "iso":"2020-01-14T17:35:07.986Z",
    "utc":"Tue, 14 Jan 2020 17:35:07 GMT"
  }
}
```