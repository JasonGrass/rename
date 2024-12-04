# Rename - 在线文件批量重命名工具

<img src="./src/assets/icon256.ico" width="64" alt="icon"/>

## 🍉 批量重命名工具

<https://rename.jgrass.xyz/>  

提供常用的文件批量重命名操作，无需下载安装，即用即走。

## 🍉 实现原理与隐私问题

使用的是浏览器加载文件的相关 API，读取本地文件名称信息（不读取文件内容），同样使用浏览器提供的 API 来修改文件名称。

所有数据只保留在本地浏览器内存中，关闭页面时清空，不会上传服务器（这个工具不需要也没有服务器）。

并且每一次使用，都需要你的手动允许和授权（导入文件或文件夹时）。具体用到的浏览器 API 如下：

[Window：showOpenFilePicker() 方法 - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker )  
[Window：showDirectoryPicker() 方法 - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showDirectoryPicker )  
[FileSystemFileHandle - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemFileHandle )

## 🍉 缘起

批量重命名是一个低频但时不时又会遇到的需求，为此专门下载一个软件过于大费周章。都 3202 年了，应该可以用 web 来做了吧。果然发现了相关的 API，于是有了这个在线工具。

## 🍉 浏览器兼容 & 已知问题

因为使用了实验性的 API，浏览器兼容会有问题。如果发现功能有问题，请使用最新版 Edge/Chrome 浏览器。

["showOpenFilePicker" | Can I use...](https://caniuse.com/?search=showOpenFilePicker )

核心 API：[FileSystemFileHandle.move() for local files - Chrome Platform Status](https://chromestatus.com/feature/6271579653144576 )

**已知问题**：`FileSystemFileHandle.move` 方法对文件进行重命名时，会更改文件的“修改时间”，而手动重命名或使用本地重命名工具，不会有这个问题。

## 🍉 高级技巧

提供的预设规则，无法满足一些个性化的需求，可以使用正则表达式替换完成一些高级功能。  
或者直接编写 js 代码。🤣

正则替换底层实现：`String.replace(pattern, replacement)` [String.prototype.replace() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace )

可以参考这里的案例：[#2](https://github.com/JasonGrass/rename/discussions/2)，或者直接使用本地运行的重命名工具，这里有一些网友的推荐：[#3](https://github.com/JasonGrass/rename/discussions/3)

---

部分 UI 设计参考了 utools 中的批量重命名插件。
