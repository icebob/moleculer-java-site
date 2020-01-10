(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{209:function(t,a,e){"use strict";e.r(a);var s=e(0),n=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("p",[t._v("ServiceBroker protects against circular function calls.\nIt also manages call-level timeout and has a retry logic handler.\nIn addition, there is a built-in Circuit Breaker solution in Moleculer.\nA Circuit Breaker does the Action calls and it monitors the service health. Once it gets some issue,\nit trips and all further calls goto another Node and finally restores automatically once the Service came back.")]),t._v(" "),e("h2",{attrs:{id:"default-service-invoker"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#default-service-invoker"}},[t._v("#")]),t._v(" Default Service Invoker")]),t._v(" "),e("p",[t._v("This is the default call logic when you create a ServiceBroker instance.")]),t._v(" "),e("div",{staticClass:"language-java extra-class"},[e("pre",{pre:!0,attrs:{class:"language-java"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Create a Default Service Invoker")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DefaultServiceInvoker")]),t._v(" invoker "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DefaultServiceInvoker")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Max call level to avoid circular calls")]),t._v("\ninvoker"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("setMaxCallLevel")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Write errors to log file")]),t._v("\ninvoker"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("setWriteErrorsToLog")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Create Service Broker")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ServiceBroker")]),t._v(" broker "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ServiceBroker")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("builder")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("invoker")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("invoker"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("build")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("h3",{attrs:{id:"settings"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#settings"}},[t._v("#")]),t._v(" Settings")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Default")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[e("code",[t._v("maxCallLevel")])]),t._v(" "),e("td",[e("code",[t._v("int")])]),t._v(" "),e("td",[e("code",[t._v("100")])]),t._v(" "),e("td",[t._v("Max call level to avoid circular calls")])]),t._v(" "),e("tr",[e("td",[e("code",[t._v("writeErrorsToLog")])]),t._v(" "),e("td",[e("code",[t._v("boolean")])]),t._v(" "),e("td",[e("code",[t._v("true")])]),t._v(" "),e("td",[t._v("Write errors to log file")])])])]),t._v(" "),e("h3",{attrs:{id:"call-level-retry-and-timeout"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#call-level-retry-and-timeout"}},[t._v("#")]),t._v(" Call-level retry and timeout")]),t._v(" "),e("p",[t._v("The Default Service Invoker handles retry and timeout parameters for function calls.")]),t._v(" "),e("div",{staticClass:"language-java extra-class"},[e("pre",{pre:!0,attrs:{class:"language-java"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Create JSON request")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Tree")]),t._v(" req "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Tree")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nreq"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("put")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"key"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"value"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nreq"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("putList")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"array"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Invoke service with retry and timeout parameters")]),t._v("\nbroker"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"service.action"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            req"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("CallOptions")]),t._v("\n              "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("retryCount")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("timeout")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("5000")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("rsp "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t\n              "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Process JSON response")]),t._v("\n\t\t\t\n            "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("catchError")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n              "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Error handler")]),t._v("\n\n            "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("h3",{attrs:{id:"distributed-timeouts"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#distributed-timeouts"}},[t._v("#")]),t._v(" Distributed timeouts")]),t._v(" "),e("p",[t._v("Moleculer uses "),e("a",{attrs:{href:"https://www.datawire.io/guide/traffic/deadlines-distributed-timeouts-microservices/",target:"_blank",rel:"noopener noreferrer"}},[t._v("distributed timeouts"),e("OutboundLink")],1),t._v(".\nIn case of nested calls, the timeout value is decremented with the elapsed time.\nIf the timeout value is less or equal than 0, the next nested calls will be skipped ("),e("code",[t._v("RequestSkippedError")]),t._v(")\nbecause the first call has already been rejected with a "),e("code",[t._v("RequestTimeoutError")]),t._v(" error.")]),t._v(" "),e("h2",{attrs:{id:"circuit-breaker"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#circuit-breaker"}},[t._v("#")]),t._v(" Circuit Breaker")]),t._v(" "),e("p",[t._v("Moleculer has a built-in circuit-breaker solution.\nIt uses a time window to check the number of the failed requests.\nOnce the error limit is reached, it trips the circuit breaker.\nThe Circuit Breaker is a descendant of Default Service Invoker.")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("What is the circuit breaker?")]),t._v(" "),e("p",[t._v("The Circuit Breaker can prevent an application from repeatedly trying to execute an operation that's likely to fail.\nAllowing it to continue without waiting for the fault to be fixed or wasting CPU cycles while it determines that the fault is long lasting.\nThe Circuit Breaker pattern also enables an application to detect whether the fault has been resolved.\nIf the problem appears to have been fixed, the application can try to invoke the operation.")]),t._v(" "),e("p",[t._v("Read more about circuit breaker on "),e("a",{attrs:{href:"https://martinfowler.com/bliki/CircuitBreaker.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Martin Fowler blog"),e("OutboundLink")],1),t._v("\nor on "),e("a",{attrs:{href:"https://docs.microsoft.com/azure/architecture/patterns/circuit-breaker",target:"_blank",rel:"noopener noreferrer"}},[t._v("Microsoft Azure Docs"),e("OutboundLink")],1),t._v(".")])]),t._v(" "),e("p",[t._v("If you enable it, all service calls will be protected by this built-in circuit breaker.")]),t._v(" "),e("div",{staticClass:"language-java extra-class"},[e("pre",{pre:!0,attrs:{class:"language-java"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Create Circuit Breaker")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("CircuitBreaker")]),t._v(" invoker "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("CircuitBreaker")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Max call level to avoid circular calls")]),t._v("\ninvoker"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("setMaxCallLevel")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Length of time-window in MILLISECONDS")]),t._v("\ninvoker"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("setWindowLength")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("5000")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Maximum number of errors in time-window")]),t._v("\ninvoker"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("setMaxErrors")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("20")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Half-open timeout in MILLISECONDS")]),t._v("\ninvoker"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("setLockTimeout")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("10000")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Create Service Broker")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ServiceBroker")]),t._v(" broker "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ServiceBroker")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("builder")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("invoker")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("invoker"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("build")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("h3",{attrs:{id:"settings-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#settings-2"}},[t._v("#")]),t._v(" Settings")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Default")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[e("code",[t._v("windowLength")])]),t._v(" "),e("td",[e("code",[t._v("long")])]),t._v(" "),e("td",[e("code",[t._v("5000")])]),t._v(" "),e("td",[t._v("Length of time-window in milliseconds")])]),t._v(" "),e("tr",[e("td",[e("code",[t._v("maxErrors")])]),t._v(" "),e("td",[e("code",[t._v("Number")])]),t._v(" "),e("td",[e("code",[t._v("3")])]),t._v(" "),e("td",[t._v("Maximum number of errors in time-window")])]),t._v(" "),e("tr",[e("td",[e("code",[t._v("lockTimeout")])]),t._v(" "),e("td",[e("code",[t._v("Number")])]),t._v(" "),e("td",[e("code",[t._v("10000")])]),t._v(" "),e("td",[t._v("Number of milliseconds to switch from "),e("code",[t._v("open")]),t._v(" to "),e("code",[t._v("half-open")]),t._v(" state")])]),t._v(" "),e("tr",[e("td",[e("code",[t._v("ignoredTypes")])]),t._v(" "),e("td",[e("code",[t._v("Throwable[]")])]),t._v(" "),e("td",[t._v("null")]),t._v(" "),e("td",[t._v("Ignorable Error/Exception types")])]),t._v(" "),e("tr",[e("td",[e("code",[t._v("maxCallLevel")])]),t._v(" "),e("td",[e("code",[t._v("int")])]),t._v(" "),e("td",[e("code",[t._v("100")])]),t._v(" "),e("td",[t._v("Max call level to avoid circular calls")])]),t._v(" "),e("tr",[e("td",[e("code",[t._v("writeErrorsToLog")])]),t._v(" "),e("td",[e("code",[t._v("boolean")])]),t._v(" "),e("td",[e("code",[t._v("true")])]),t._v(" "),e("td",[t._v("Write errors to log file")])])])])])}),[],!1,null,null,null);a.default=n.exports}}]);