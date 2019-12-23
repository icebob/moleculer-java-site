title: Internal Services
---

## Internal Services

The `ServiceBroker` contains some internal services to check the node health or get some registry information.
You can disable them by setting `internalServices: false` in broker options.

### List of nodes

It lists all known nodes (including local node).

```java
broker.call("$node.list").then(res => console.log(res));
```

**Parameters**

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `withServices` | `Boolean` | `false` | List with services. |
| `onlyAvailable` | `Boolean` | `false`| List only available nodes. |

### List of services

It lists all registered services (local & remote).

```java
broker.call("$node.services").then(res => console.log(res));
```

**Parameters**

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `onlyLocal` | `Boolean` | `false` | List only local services. |
| `skipInternal` | `Boolean` | `false` | Skip the internal services (`$node`). |
| `withActions` | `Boolean` | `false` | List with actions. |
| `onlyAvailable` | `Boolean` | `false`| List only available services. |

### List of local actions

It lists all registered actions (local & remote).

```java
broker.call("$node.actions").then(res => console.log(res));
```

It has some options which you can declare within `params`.

**Options**

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `onlyLocal` | `Boolean` | `false` | List only local actions. |
| `skipInternal` | `Boolean` | `false` | Skip the internal actions (`$node`). |
| `withEndpoints` | `Boolean` | `false` | List with endpoints _(nodes)_. |
| `onlyAvailable` | `Boolean` | `false`| List only available actions. |

### List of local events

It lists all event subscriptions.

```java
broker.call("$node.events").then(res => console.log(res));
```

It has some options which you can declare within `params`.

**Options**

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `onlyLocal` | `Boolean` | `false` | List only local subscriptions. |
| `skipInternal` | `Boolean` | `false` | Skip the internal event subscriptions `$`. |
| `withEndpoints` | `Boolean` | `false` | List with endpoints _(nodes)_. |
| `onlyAvailable` | `Boolean` | `false`| List only available subscriptions. |

### Health of node

It returns the health info of local node (including process & OS information).

```java
broker.call("$node.health").then(res => console.log(res));
```

Example health info:
```java
{
    "cpu": {
        "load1": 0,
        "load5": 0,
        "load15": 0,
        "cores": 4,
        "utilization": 0
    },
    "mem": {
        "free": 1217519616,
        "total": 17161699328,
        "percent": 7.094400109979598
    },
    "os": {
        "uptime": 366733.2786046,
        "type": "Windows_NT",
        "release": "6.1.7601",
        "hostname": "Developer-PC",
        "arch": "x64",
        "platform": "win32",
        "user": {
            "uid": -1,
            "gid": -1,
            "username": "Developer",
            "homedir": "C:\\Users\\Developer",
            "shell": null
        }
    },
    "process": {
        "pid": 13096,
        "memory": {
            "rss": 47173632,
            "heapTotal": 31006720,
            "heapUsed": 22112024
        },
        "uptime": 25.447
    },
    "client": {
        "type": "nodejs",
        "version": "0.12.0",
        "langVersion": "v8.9.4"
    },
    "net": {
        "ip": [
            "192.168.2.100",
            "192.168.232.1",
            "192.168.130.1",
            "192.168.56.1",
            "192.168.99.1"
        ]
    },
    "time": {
        "now": 1487338958409,
        "iso": "2018-02-17T13:42:38.409Z",
        "utc": "Fri, 17 Feb 2018 13:42:38 GMT"
    }
}
```