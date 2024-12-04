# Rename - Online batch file renaming tool

<img src="./src/assets/icon256.ico" width="64" alt="icon"/>

## 🍉 Batch renaming tool

<https://rename.jgrass.xyz/>

Provides common batch file renaming operations, no need to download and install, just use it.

## 🍉 Implementation principle and privacy issues

Uses the browser's API for loading files, reads local file name information (does not read file content), and also uses the API provided by the browser to modify file names.

All data is only retained in the local browser memory, cleared when the page is closed, and will not be uploaded to the server (this tool does not need or have a server).

And every time you use it, you need your manual permission and authorization (when importing files or folders). The specific browser APIs used are as follows:

[Window: showOpenFilePicker() method - Web API interface reference | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker )
[Window: showDirectoryPicker() method - Web API interface reference | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showDirectoryPicker )
[FileSystemFileHandle - Web API interface reference | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showDirectoryPicker )

## 🍉 Origin

Batch renaming is a low-frequency but occasional requirement, and it is too much trouble to download a software specifically for this purpose. It is 2020, and it should be possible to do it on the web. Sure enough, I found the relevant API, so I had this online tool.

## 🍉 Browser compatibility & known issues

Because experimental APIs are used, browser compatibility may be problematic. If you find any functional issues, please use the latest version of Edge/Chrome browser.

["showOpenFilePicker" | Can I use...](https://caniuse.com/?search=showOpenFilePicker )

Core API: [FileSystemFileHandle.move() for local files - Chrome Platform Status](https://chromestatus.com/feature/6271579653144576 )

**Known issue**: When the `FileSystemFileHandle.move` method renames a file, the "modification time" of the file will be changed. Manual renaming or using local renaming tools will not have this problem.

## 🍉 Advanced tips

The preset rules provided cannot meet some personalized needs. You can use regular expressions to replace some advanced functions.
Or write js code directly. 🤣

Regular replacement underlying implementation: `String.replace(pattern, replacement)` [String.prototype.replace() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace )

You can refer to the case here: [#2](https://github.com/JasonGrass/rename/discussions/2), or directly use the local rename tool. Here are some recommendations from netizens: [#3](https://github.com/JasonGrass/rename/discussions/3)

---

Some UI designs refer to the batch rename plug-in in utools.
