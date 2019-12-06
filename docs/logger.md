## logger 分级打印

### 功能

* 不需要注释日志打印代码，随便打印。
* 打印出来的日志自动携带 level、时间、module 等信息，方便查找。
* 日志通过 level 和 module 区隔，可以通过配置在运行时关闭任何 level、module 的日志。
* 如果需要的话，我可以改变日志打印方式（比如上传服务器）。

### 方案

开源库 [js-logger](https://github.com/jonnyreeves/js-logger) （mit协议）已经基本支持上述功能， 代码量也很小，这里直接拷贝源码做一点拓展
* 默认调用 Logger.useDefaults()，免得开发者主动设置一次
* 增加 getHandler、beforeInvoke 钩子，简化操作
* 内置 formatter，打印 time、module name、message
* 增加颜色设置 Logger.green.log('xx')
