const template = `// 在这里自定义重命名的 js 代码
/**
 * 参数说明: options 一个对象，包含单个文件的信息，
 * name(string): 文件名，默认不包含后缀名，如果勾选了 "同时处理后缀名" 则包含后缀名
 * nameWithoutExt(string): 文件名，不包含后缀名
 * extension(string): 后缀名，包括 "."
 * modifyTime(number): 文件修改时间，毫秒时间戳
 * size(number): 文件大小，字节
 * index(number): 文件在表格中显示的序号
 *
 * 返回值：新文件名(字符串类型)，返回空值会忽略重命名操作
 * 注意：默认应该返回不包含后缀名的文件名，如果勾选了 "同时处理后缀名" ，则返回包含后缀名的文件名
*/
function rename(options){
  const {name, nameWithoutExt, extension, modifyTime, size, index} = options
  // your code here. tips: 如果代码逻辑较为复杂，建议使用 vscode 编辑完成之后，复制粘贴过来
  return name
}

/**
 * 安全性声明
 * 本网站是一个静态站点，所有操作都在本地运行，没有服务器，不会收集您的数据。
 * 但是如果您使用了不安全的自定义重命名代码，则可能会造成数据泄漏。
 * 如果您使用的是其他人提供的自定义重命名代码，请核实代码的安全性。
 * 安全的代码应仅包含对文件名处理的字符串处理逻辑。
*/

/*
AI prompt
如果想要借助 AI 完成自定义重命名的操作，如下 prompt 供参考
尖括号 <> 中的内容，替换成你的具体需求与案例


我正在使用 javascript 进行文件的批量重命名工作，已经完成基础功能，请按照需求补充完成重命名函数。
需求1：<准确描述需求；举例：在文件名前方添加序号，并补零到三位，并在序号后面添加一个空格>
需求1参考案例：<将 abc.txt 修改为 001 abc.txt>
需求2：
需求2参考案例：

需要填充的模板函数：

function rename(options){
  const {name, nameWithoutExt, extension, modifyTime, size, index} = options
  // your code here.
  return name
}

rename 函数参数说明: options 一个对象，包含单个文件的信息
  name(string): 文件名
  nameWithoutExt(string): 文件名，不包含后缀名
  extension(string): 后缀名，包括 "."
  modifyTime(number): 文件修改时间，毫秒时间戳
  size(number): 文件大小，字节
  index(number): 文件在表格中显示的序号
rename 函数返回值：新文件名(字符串类型)，返回空值会忽略重命名操作
*/
`

export default template
