(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/@vuepress/core/node_modules/.cache/vuepress\",\"cacheIdentifier\":\"5d084cb4-vue-loader-template\"}!../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/vue-loader/lib/loaders/templateLoader.js?!../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/cache-loader/dist/cjs.js?!../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/vue-loader/lib/index.js?!../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/@vuepress/markdown-loader/index.js?!./fault-tolerance.md?vue&type=template&id=87dfb0e8&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/András/AppData/Local/Yarn/Data/global/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/@vuepress/core/node_modules/.cache/vuepress","cacheIdentifier":"5d084cb4-vue-loader-template"}!C:/Users/András/AppData/Local/Yarn/Data/global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!C:/Users/András/AppData/Local/Yarn/Data/global/node_modules/cache-loader/dist/cjs.js??ref--1-0!C:/Users/András/AppData/Local/Yarn/Data/global/node_modules/vue-loader/lib??ref--1-1!C:/Users/András/AppData/Local/Yarn/Data/global/node_modules/@vuepress/markdown-loader??ref--1-2!./fault-tolerance.md?vue&type=template&id=87dfb0e8& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ContentSlotsDistributor',{attrs:{"slot-key":_vm.$parent.slotKey}},[_c('p',[_vm._v("ServiceBroker protects against circular function calls.\nIt also manages call-level timeout and has a retry logic handler.\nIn addition, there is a built-in Circuit Breaker solution in Moleculer.\nA Circuit Breaker does the Action calls and it monitors the service health. Once it gets some issue,\nit trips and all further calls goto another Node and finally restores automatically once the Service came back.")]),_vm._v(" "),_c('h2',{attrs:{"id":"default-service-invoker"}},[_c('a',{staticClass:"header-anchor",attrs:{"href":"#default-service-invoker"}},[_vm._v("#")]),_vm._v(" Default Service Invoker")]),_vm._v(" "),_c('p',[_vm._v("This is the default call logic when you create a ServiceBroker instance.")]),_vm._v(" "),_c('div',{staticClass:"language-java extra-class"},[_c('pre',{pre:true,attrs:{"class":"language-java"}},[_c('code',[_c('span',{pre:true,attrs:{"class":"token comment"}},[_vm._v("// Create a Default Service Invoker")]),_vm._v("\n"),_c('span',{pre:true,attrs:{"class":"token class-name"}},[_vm._v("DefaultServiceInvoker")]),_vm._v(" invoker "),_c('span',{pre:true,attrs:{"class":"token operator"}},[_vm._v("=")]),_vm._v(" "),_c('span',{pre:true,attrs:{"class":"token keyword"}},[_vm._v("new")]),_vm._v(" "),_c('span',{pre:true,attrs:{"class":"token class-name"}},[_vm._v("DefaultServiceInvoker")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(";")]),_vm._v("\n\t\t\n"),_c('span',{pre:true,attrs:{"class":"token comment"}},[_vm._v("// Max call level to avoid circular calls")]),_vm._v("\ninvoker"),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("setMaxCallLevel")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token number"}},[_vm._v("100")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(";")]),_vm._v("\n\n"),_c('span',{pre:true,attrs:{"class":"token comment"}},[_vm._v("// Write errors to log file")]),_vm._v("\ninvoker"),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("setWriteErrorsToLog")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token boolean"}},[_vm._v("true")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(";")]),_vm._v("\n\n"),_c('span',{pre:true,attrs:{"class":"token comment"}},[_vm._v("// Create Service Broker")]),_vm._v("\n"),_c('span',{pre:true,attrs:{"class":"token class-name"}},[_vm._v("ServiceBroker")]),_vm._v(" broker "),_c('span',{pre:true,attrs:{"class":"token operator"}},[_vm._v("=")]),_vm._v(" "),_c('span',{pre:true,attrs:{"class":"token class-name"}},[_vm._v("ServiceBroker")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("builder")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("invoker")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_vm._v("invoker"),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("build")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(";")]),_vm._v("\n")])])]),_c('h3',{attrs:{"id":"settings"}},[_c('a',{staticClass:"header-anchor",attrs:{"href":"#settings"}},[_vm._v("#")]),_vm._v(" Settings")]),_vm._v(" "),_c('table',[_c('thead',[_c('tr',[_c('th',[_vm._v("Name")]),_vm._v(" "),_c('th',[_vm._v("Type")]),_vm._v(" "),_c('th',[_vm._v("Default")]),_vm._v(" "),_c('th',[_vm._v("Description")])])]),_vm._v(" "),_c('tbody',[_c('tr',[_c('td',[_c('code',[_vm._v("maxCallLevel")])]),_vm._v(" "),_c('td',[_c('code',[_vm._v("int")])]),_vm._v(" "),_c('td',[_c('code',[_vm._v("100")])]),_vm._v(" "),_c('td',[_vm._v("Max call level to avoid circular calls")])]),_vm._v(" "),_c('tr',[_c('td',[_c('code',[_vm._v("writeErrorsToLog")])]),_vm._v(" "),_c('td',[_c('code',[_vm._v("boolean")])]),_vm._v(" "),_c('td',[_c('code',[_vm._v("true")])]),_vm._v(" "),_c('td',[_vm._v("Write errors to log file")])])])]),_vm._v(" "),_c('h3',{attrs:{"id":"call-level-retry-and-timeout"}},[_c('a',{staticClass:"header-anchor",attrs:{"href":"#call-level-retry-and-timeout"}},[_vm._v("#")]),_vm._v(" Call-level retry and timeout")]),_vm._v(" "),_c('p',[_vm._v("The Default Service Invoker handles retry and timeout parameters for function calls.")]),_vm._v(" "),_c('div',{staticClass:"language-java extra-class"},[_c('pre',{pre:true,attrs:{"class":"language-java"}},[_c('code',[_c('span',{pre:true,attrs:{"class":"token comment"}},[_vm._v("// Create JSON request")]),_vm._v("\n"),_c('span',{pre:true,attrs:{"class":"token class-name"}},[_vm._v("Tree")]),_vm._v(" req "),_c('span',{pre:true,attrs:{"class":"token operator"}},[_vm._v("=")]),_vm._v(" "),_c('span',{pre:true,attrs:{"class":"token keyword"}},[_vm._v("new")]),_vm._v(" "),_c('span',{pre:true,attrs:{"class":"token class-name"}},[_vm._v("Tree")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(";")]),_vm._v("\nreq"),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("put")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token string"}},[_vm._v("\"key\"")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(",")]),_vm._v(" "),_c('span',{pre:true,attrs:{"class":"token string"}},[_vm._v("\"value\"")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(";")]),_vm._v("\nreq"),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("putList")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token string"}},[_vm._v("\"array\"")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("add")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token number"}},[_vm._v("1")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("add")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token number"}},[_vm._v("2")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("add")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token number"}},[_vm._v("3")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(";")]),_vm._v("\n\t\t\n"),_c('span',{pre:true,attrs:{"class":"token comment"}},[_vm._v("// Invoke service with retry and timeout parameters")]),_vm._v("\nbroker"),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("call")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token string"}},[_vm._v("\"service.action\"")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(",")]),_vm._v("\n            req"),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(",")]),_vm._v("\n            "),_c('span',{pre:true,attrs:{"class":"token class-name"}},[_vm._v("CallOptions")]),_vm._v("\n              "),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("retryCount")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token number"}},[_vm._v("3")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_vm._v("\n              "),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("timeout")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token number"}},[_vm._v("5000")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("then")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_vm._v("rsp "),_c('span',{pre:true,attrs:{"class":"token operator"}},[_vm._v("->")]),_vm._v(" "),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("{")]),_vm._v("\n\t\t\t\n              "),_c('span',{pre:true,attrs:{"class":"token comment"}},[_vm._v("// Process JSON response")]),_vm._v("\n\t\t\t\n            "),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("}")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("catchError")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_vm._v("err "),_c('span',{pre:true,attrs:{"class":"token operator"}},[_vm._v("->")]),_vm._v(" "),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("{")]),_vm._v("\n\n              "),_c('span',{pre:true,attrs:{"class":"token comment"}},[_vm._v("// Error handler")]),_vm._v("\n\n            "),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("}")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(";")]),_vm._v("\n")])])]),_c('h3',{attrs:{"id":"distributed-timeouts"}},[_c('a',{staticClass:"header-anchor",attrs:{"href":"#distributed-timeouts"}},[_vm._v("#")]),_vm._v(" Distributed timeouts")]),_vm._v(" "),_c('p',[_vm._v("Moleculer uses "),_c('a',{attrs:{"href":"https://www.datawire.io/guide/traffic/deadlines-distributed-timeouts-microservices/","target":"_blank","rel":"noopener noreferrer"}},[_vm._v("distributed timeouts"),_c('OutboundLink')],1),_vm._v(".\nIn case of nested calls, the timeout value is decremented with the elapsed time.\nIf the timeout value is less or equal than 0, the next nested calls will be skipped ("),_c('code',[_vm._v("RequestSkippedError")]),_vm._v(")\nbecause the first call has already been rejected with a "),_c('code',[_vm._v("RequestTimeoutError")]),_vm._v(" error.")]),_vm._v(" "),_c('h2',{attrs:{"id":"circuit-breaker"}},[_c('a',{staticClass:"header-anchor",attrs:{"href":"#circuit-breaker"}},[_vm._v("#")]),_vm._v(" Circuit Breaker")]),_vm._v(" "),_c('p',[_vm._v("Moleculer has a built-in circuit-breaker solution.\nIt uses a time window to check the number of the failed requests.\nOnce the error limit is reached, it trips the circuit breaker.\nThe Circuit Breaker is a descendant of Default Service Invoker.")]),_vm._v(" "),_c('div',{staticClass:"custom-block tip"},[_c('p',{staticClass:"custom-block-title"},[_vm._v("What is the circuit breaker?")]),_vm._v(" "),_c('p',[_vm._v("The Circuit Breaker can prevent an application from repeatedly trying to execute an operation that's likely to fail.\nAllowing it to continue without waiting for the fault to be fixed or wasting CPU cycles while it determines that the fault is long lasting.\nThe Circuit Breaker pattern also enables an application to detect whether the fault has been resolved.\nIf the problem appears to have been fixed, the application can try to invoke the operation.")]),_vm._v(" "),_c('p',[_vm._v("Read more about circuit breaker on "),_c('a',{attrs:{"href":"https://martinfowler.com/bliki/CircuitBreaker.html","target":"_blank","rel":"noopener noreferrer"}},[_vm._v("Martin Fowler blog"),_c('OutboundLink')],1),_vm._v("\nor on "),_c('a',{attrs:{"href":"https://docs.microsoft.com/azure/architecture/patterns/circuit-breaker","target":"_blank","rel":"noopener noreferrer"}},[_vm._v("Microsoft Azure Docs"),_c('OutboundLink')],1),_vm._v(".")])]),_vm._v(" "),_c('p',[_vm._v("If you enable it, all service calls will be protected by this built-in circuit breaker.")]),_vm._v(" "),_c('div',{staticClass:"language-java extra-class"},[_c('pre',{pre:true,attrs:{"class":"language-java"}},[_c('code',[_c('span',{pre:true,attrs:{"class":"token comment"}},[_vm._v("// Create Circuit Breaker")]),_vm._v("\n"),_c('span',{pre:true,attrs:{"class":"token class-name"}},[_vm._v("CircuitBreaker")]),_vm._v(" invoker "),_c('span',{pre:true,attrs:{"class":"token operator"}},[_vm._v("=")]),_vm._v(" "),_c('span',{pre:true,attrs:{"class":"token keyword"}},[_vm._v("new")]),_vm._v(" "),_c('span',{pre:true,attrs:{"class":"token class-name"}},[_vm._v("CircuitBreaker")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(";")]),_vm._v("\n\n"),_c('span',{pre:true,attrs:{"class":"token comment"}},[_vm._v("// Max call level to avoid circular calls")]),_vm._v("\ninvoker"),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("setMaxCallLevel")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token number"}},[_vm._v("100")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(";")]),_vm._v("\n\t\t\n"),_c('span',{pre:true,attrs:{"class":"token comment"}},[_vm._v("// Length of time-window in MILLISECONDS")]),_vm._v("\ninvoker"),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("setWindowLength")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token number"}},[_vm._v("5000")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(";")]),_vm._v("\n\t\t\n"),_c('span',{pre:true,attrs:{"class":"token comment"}},[_vm._v("// Maximum number of errors in time-window")]),_vm._v("\ninvoker"),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("setMaxErrors")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token number"}},[_vm._v("20")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(";")]),_vm._v("\n\t\t\n"),_c('span',{pre:true,attrs:{"class":"token comment"}},[_vm._v("// Half-open timeout in MILLISECONDS")]),_vm._v("\ninvoker"),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("setLockTimeout")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token number"}},[_vm._v("10000")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(";")]),_vm._v("\n\t\t\n"),_c('span',{pre:true,attrs:{"class":"token comment"}},[_vm._v("// Create Service Broker")]),_vm._v("\n"),_c('span',{pre:true,attrs:{"class":"token class-name"}},[_vm._v("ServiceBroker")]),_vm._v(" broker "),_c('span',{pre:true,attrs:{"class":"token operator"}},[_vm._v("=")]),_vm._v(" "),_c('span',{pre:true,attrs:{"class":"token class-name"}},[_vm._v("ServiceBroker")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("builder")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("invoker")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_vm._v("invoker"),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(".")]),_c('span',{pre:true,attrs:{"class":"token function"}},[_vm._v("build")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v("(")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(")")]),_c('span',{pre:true,attrs:{"class":"token punctuation"}},[_vm._v(";")]),_vm._v("\n")])])]),_c('h3',{attrs:{"id":"settings-2"}},[_c('a',{staticClass:"header-anchor",attrs:{"href":"#settings-2"}},[_vm._v("#")]),_vm._v(" Settings")]),_vm._v(" "),_c('table',[_c('thead',[_c('tr',[_c('th',[_vm._v("Name")]),_vm._v(" "),_c('th',[_vm._v("Type")]),_vm._v(" "),_c('th',[_vm._v("Default")]),_vm._v(" "),_c('th',[_vm._v("Description")])])]),_vm._v(" "),_c('tbody',[_c('tr',[_c('td',[_c('code',[_vm._v("windowLength")])]),_vm._v(" "),_c('td',[_c('code',[_vm._v("long")])]),_vm._v(" "),_c('td',[_c('code',[_vm._v("5000")])]),_vm._v(" "),_c('td',[_vm._v("Length of time-window in milliseconds")])]),_vm._v(" "),_c('tr',[_c('td',[_c('code',[_vm._v("maxErrors")])]),_vm._v(" "),_c('td',[_c('code',[_vm._v("Number")])]),_vm._v(" "),_c('td',[_c('code',[_vm._v("3")])]),_vm._v(" "),_c('td',[_vm._v("Maximum number of errors in time-window")])]),_vm._v(" "),_c('tr',[_c('td',[_c('code',[_vm._v("lockTimeout")])]),_vm._v(" "),_c('td',[_c('code',[_vm._v("Number")])]),_vm._v(" "),_c('td',[_c('code',[_vm._v("10000")])]),_vm._v(" "),_c('td',[_vm._v("Number of milliseconds to switch from "),_c('code',[_vm._v("open")]),_vm._v(" to "),_c('code',[_vm._v("half-open")]),_vm._v(" state")])]),_vm._v(" "),_c('tr',[_c('td',[_c('code',[_vm._v("ignoredTypes")])]),_vm._v(" "),_c('td',[_c('code',[_vm._v("Throwable[]")])]),_vm._v(" "),_c('td',[_vm._v("null")]),_vm._v(" "),_c('td',[_vm._v("Ignorable Error/Exception types")])]),_vm._v(" "),_c('tr',[_c('td',[_c('code',[_vm._v("maxCallLevel")])]),_vm._v(" "),_c('td',[_c('code',[_vm._v("int")])]),_vm._v(" "),_c('td',[_c('code',[_vm._v("100")])]),_vm._v(" "),_c('td',[_vm._v("Max call level to avoid circular calls")])]),_vm._v(" "),_c('tr',[_c('td',[_c('code',[_vm._v("writeErrorsToLog")])]),_vm._v(" "),_c('td',[_c('code',[_vm._v("boolean")])]),_vm._v(" "),_c('td',[_c('code',[_vm._v("true")])]),_vm._v(" "),_c('td',[_vm._v("Write errors to log file")])])])])])}
var staticRenderFns = []



/***/ }),

/***/ "./fault-tolerance.md":
/*!****************************!*\
  !*** ./fault-tolerance.md ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fault_tolerance_md_vue_type_template_id_87dfb0e8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fault-tolerance.md?vue&type=template&id=87dfb0e8& */ "./fault-tolerance.md?vue&type=template&id=87dfb0e8&");
/* harmony import */ var _Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/vue-loader/lib/runtime/componentNormalizer.js");

var script = {}


/* normalize component */

var component = Object(_Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  script,
  _fault_tolerance_md_vue_type_template_id_87dfb0e8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _fault_tolerance_md_vue_type_template_id_87dfb0e8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./fault-tolerance.md?vue&type=template&id=87dfb0e8&":
/*!***********************************************************!*\
  !*** ./fault-tolerance.md?vue&type=template&id=87dfb0e8& ***!
  \***********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_cache_loader_dist_cjs_js_cacheDirectory_Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_vuepress_core_node_modules_cache_vuepress_cacheIdentifier_5d084cb4_vue_loader_template_Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_cache_loader_dist_cjs_js_ref_1_0_Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_vue_loader_lib_index_js_ref_1_1_Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_vuepress_markdown_loader_index_js_ref_1_2_fault_tolerance_md_vue_type_template_id_87dfb0e8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/@vuepress/core/node_modules/.cache/vuepress","cacheIdentifier":"5d084cb4-vue-loader-template"}!../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/vue-loader/lib??ref--1-1!../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/@vuepress/markdown-loader??ref--1-2!./fault-tolerance.md?vue&type=template&id=87dfb0e8& */ "../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/@vuepress/core/node_modules/.cache/vuepress\",\"cacheIdentifier\":\"5d084cb4-vue-loader-template\"}!../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/vue-loader/lib/loaders/templateLoader.js?!../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/cache-loader/dist/cjs.js?!../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/vue-loader/lib/index.js?!../../../../Users/András/AppData/Local/Yarn/Data/global/node_modules/@vuepress/markdown-loader/index.js?!./fault-tolerance.md?vue&type=template&id=87dfb0e8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_cache_loader_dist_cjs_js_cacheDirectory_Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_vuepress_core_node_modules_cache_vuepress_cacheIdentifier_5d084cb4_vue_loader_template_Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_cache_loader_dist_cjs_js_ref_1_0_Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_vue_loader_lib_index_js_ref_1_1_Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_vuepress_markdown_loader_index_js_ref_1_2_fault_tolerance_md_vue_type_template_id_87dfb0e8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_cache_loader_dist_cjs_js_cacheDirectory_Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_vuepress_core_node_modules_cache_vuepress_cacheIdentifier_5d084cb4_vue_loader_template_Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_cache_loader_dist_cjs_js_ref_1_0_Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_vue_loader_lib_index_js_ref_1_1_Users_Andr_s_AppData_Local_Yarn_Data_global_node_modules_vuepress_markdown_loader_index_js_ref_1_2_fault_tolerance_md_vue_type_template_id_87dfb0e8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=9.3a2025e8.js.map