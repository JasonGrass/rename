/**
 * Number relative tools of xTool
 * https://github.com/Tairraos/xNumber.js
 */
let xNumber = Object.assign(Function(), {
  tolerantPattern: [
    "零+|^$,零,^零(.)|(.)零$,$1$2,^一十,十,百零?十,百一十,百([一二三四五六七八九])([^十]|$),百零$1$2,千([一二三四五六七八九])([^百]|$),千零$1$2",
    "(万|亿)([一二三四五六七八九])([^千]|$),$1零$2$3,([十百千])(万|亿)([^零万亿]),$1$2零$3,亿万,亿,([千万亿])零([万千百十]),$1零一$2"
  ].join(),
  toBigPattern: "一,壹,二,贰,三,叁,四,肆,五,伍,六,陆,七,柒,八,捌,九,玖,十,拾,百,佰,千,仟",
  toSmallPattern:
    "壹,一,贰|两,二,叁,三,肆,四,伍,五,陆,六,柒,七,捌,八,玖,九,拾,十,廿,二十,卅,三十,卌,四十,佰,百,仟,千,萬,万,億,亿",
  toChnNumPattern: "1,一,2,二,3,三,4,四,5,五,6,六,7,七,8,八,9,九,0,",
  toAriNumPattern: "零,,一,1,二,2,三,3,四,4,五,5,六,6,七,7,八,8,九,9,^十,1十",
  matchChnNumPattern: "^(?:([^万亿]*)万)?(?:([^万亿]*)亿)?(?:([^万亿]*)万)?(?:([^万亿]*))?$",
  matchChnNumSimplePattern: "^(?:([^万亿]*)万)?(?:([^万亿]*))?$",
  matchChnNumSectionPattern: "^(?:(\\d)千)?(?:(\\d)百)?(?:(\\d)十)?(\\d)?$",

  /**
   * 用字符串描述一堆正则pattern来刷洗字符串
   * "零,,一,1,^十,1十" 表示 replace(/零/g,"").replace(/一/g,"1")，replace(/^十/g,"1十")
   * @param {string} data
   * @param {string} pattern
   * @return {string}
   * @private
   */
  _washData(data, pattern) {
    let p = pattern.split(",")
    while (p.length) data = String(data).replace(RegExp(p.shift(), "g"), p.shift())
    return data
  },

  /**
   * 修正中文数字常见的错误，并转小写
   * @param {string} num - 中文数字
   * @return {string} 不校验数字拼写是否正确，只转换常错的拼写
   */
  tolerant(num) {
    num = xNumber.numberChnToSmall(num)
    return xNumber._washData(num, xNumber.tolerantPattern)
  },

  /**
   * 中文数字小写转大写，“万”，“亿”是不区分大小写的
   * @param {string} num - 中文数字
   * @return {string} 不校验数字拼写是否正确，只转换大写
   */
  numberChnToBig(num) {
    return xNumber._washData(num, xNumber.toBigPattern)
  },

  /**
   * 中文数字小写转大写，“万”，“亿”是不区分大小写的
   * @param {string} num - 中文数字
   * @return {string} 不校验数字拼写是否正确，只转换大写
   */
  numberChnToSmall(num) {
    return xNumber._washData(num, xNumber.toSmallPattern)
  },

  /**
   * 阿拉伯数字转中文数字
   * @param {number} num - 阿拉伯数字，大于零，小于一亿亿。不要使用巨大数字，受V8引擎精度限制，10^16左右就会精度失真。Math.pow(10,16) - 1 === Math.pow(10,16) 为 true
   * @return {string} 返回中文数字
   */
  numberAri2Chn(num) {
    let t = ("0000" + num)
      .replace(/.{0,4}((.{4})+)$/, "$1")
      .match(/.{4}/g)
      .map((x) => {
        x = x.split("").map((y) => xNumber._washData(y, xNumber.toChnNumPattern))
        return [
          x[0] ? x[0] + "千" : "零",
          x[1] ? x[1] + "百" : "零",
          x[2] ? x[2] + "十" : "零",
          x[3]
        ]
          .join("")
          .replace(/零+$/, "")
      })
    return xNumber.tolerant(t.reduceRight((x, y, i) => y + "万亿万亿万"[t.length - i - 2] + x))
  },

  /**
   * 中文数字转阿拉伯数字
   * @param {string} num - 中文数字，大于零，小于一亿亿。不要使用巨大数字。接近或大于一亿亿的时候，V8引擎下的整数会出现精度问题。
   * @return {number} 返回阿拉伯数字, 返回-1表示中文数字非法
   */
  numberChn2Ari(num) {
    // let p = "零,0,一,1,二,2,,三,3,四,4,五,5,六,6,七,7,八,8,九,9,十,10,百,100,千,1000,万,10000,亿,100000000".split(","),
    //     m = {};
    // while (d.length) m[d.shift()] = +d.shift();
    if (xNumber.isLegalChnNum(num)) {
      num = xNumber._washData(xNumber.tolerant(num), xNumber.toAriNumPattern)
      let secList = num
        .match(
          RegExp(/亿/.test(num) ? xNumber.matchChnNumPattern : xNumber.matchChnNumSimplePattern)
        )
        .slice(1)
      secList = secList
        .map((i) => (i ? i : "0"))
        .map((sec) => {
          sec = sec.match(RegExp(xNumber.matchChnNumSectionPattern))
          return sec
            .slice(1)
            .map((i) => (i ? +i : 0))
            .reduceRight((x, y, i) => x + y * Math.pow(10, 3 - i))
        })
      return secList
        .map((i) => +i)
        .reduceRight((x, y, i) => x + y * Math.pow(10000, secList.length - i - 1))
    }
    return -1
  },

  /**
   * 检查中文数字合法性，能通过基本容错也为合法
   * @param {string} num - 中文数字，大于零，小于一亿亿
   * @return {string} true表示合法中文数字
   */
  isLegalChnNum(num) {
    if (String(num).match(/[\d\w]/)) return false
    num = xNumber._washData(xNumber.tolerant(num), xNumber.toAriNumPattern) //replace 一二三四 to  1,2,3,4
    let secs = num.match(RegExp(xNumber.matchChnNumPattern))
    return (
      secs &&
      secs
        .slice(1)
        .map((i) => (i ? i : "0"))
        .map((item) => !!item.match(RegExp(xNumber.matchChnNumSectionPattern)))
        .reduce((x, y) => x && y)
    )
  },

  /**
   * 阿拉伯数字转罗马数字
   * @param {number} num - 范围0-3999
   * @return {string}
   */
  numberAri2Roman(num) {
    let dict = [
      ["", "M", "MM", "MMM"],
      ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
      ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
      ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]
    ]

    //凑满4位数, 拆成数组，每个数字转成字典里对应的罗马数字，再转回字串
    return ("000" + num)
      .replace(/.*(....)$/, "$1")
      .split("")
      .map((n, i) => dict[i][+n])
      .join("")
  },

  /**
   * 罗马数字转阿拉伯数字
   * @param {string} s - 范围0-3999
   * @return {number}
   */
  numberRoman2Ari(s) {
    //权重字典
    let d = {
      M: 1000,
      D: 500,
      C: 100,
      L: 50,
      X: 10,
      V: 5,
      I: 1
    }
    return [0, ...s.split("")].reduce((a, b, i, s) => a + (d[b] < d[s[i + 1]] ? -d[b] : d[b]))
  },

  /**
   * 格式化成阿拉伯数字
   * @param {string|num} num - 中文或数字形式的数字
   * @return {number}
   */
  getAriNum(num) {
    return xNumber.isLegalChnNum(num) ? xNumber.numberChn2Ari(num) : +num
  },

  /**
   * 格式化成中文数字
   * @param {string|num} num - 中文或数字形式的数字
   * @return {string}
   */
  getChnNum(num) {
    return xNumber.numberAri2Chn(xNumber.getAriNum(num))
  }
})

export default xNumber
