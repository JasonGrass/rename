# Rename - 在线文件批量重命名工具

<img src="./src/assets/icon256.ico" width="64" alt="icon"/>

## 🍉 批量重命名工具

<https://rename.jgrass.xyz/>  

提供常用的文件批量重命名操作，无需下载安装，即用即走。部分 UI 设计参考了 utools 中的批量重命名插件。

## 🍉 实现原理与隐私问题

使用的是浏览器加载文件的相关 API，读取本地文件名称信息（不读取文件内容），同样使用浏览器提供的 API 来修改文件名称。

所有数据只保留在本地浏览器中，不会上传服务器（这个工具不需要也没有服务器）。

具体用到的浏览器 API 如下：

[Window：showOpenFilePicker() 方法 - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker )  
[Window：showDirectoryPicker() 方法 - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showDirectoryPicker )  
[FileSystemFileHandle - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemFileHandle )

## 🍉 缘起

批量重命名是一个低频但时不时又会遇到的需求，为此专门下载一个软件过于大费周章。都 3202 年了，应该可以用 web 来做了吧。果然发现了相关的 API，于是有了这个在线工具。

## 🍉 浏览器兼容问题

因为使用了实验性的 API，浏览器兼容会有问题。如果发现功能有问题，请使用最新版 Edge/Chrome 浏览器。

["showOpenFilePicker" | Can I use...](https://caniuse.com/?search=showOpenFilePicker )

## 🍉 已知问题

对文件进行重命名的核心方法，是 `FileSystemFileHandle::move()` 这个方法，目前还没有 MDN 文档。

从测试结果来看，此方法采用的似乎是复制拷贝的操作，在重命名大文件时，操作非常慢。详细信息见 [#1](https://github.com/JasonGrass/rename/issues/1)

如果你有大量的大文件需要重命名，建议考虑本地批量重命名工具，如 utools 中的重命名插件。
