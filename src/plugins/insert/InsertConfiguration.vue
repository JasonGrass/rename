<template>
  <div>

    <div class="postion-select">
      <el-select v-model="position" placeholder="插入字符的位置">
        <el-option v-for="item in positionOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input-number v-show='position === "afterIndexN" || position === "beforeIndexN"' style="width: 220px;"
        v-model="postionIndex" :min="0" placeholder="设置 N 的取值"></el-input-number>
      <el-input v-show='position === "afterStr" || position === "beforeStr"' style="width: 360px;" v-model="postionStr"
        placeholder="设置字符串 XX 的取值"></el-input>
    </div>

    <div style="margin:12px 0">
      <el-radio-group v-model="intertContentType">
        <el-radio-button label="text">文本</el-radio-button>
        <el-radio-button label="index">序号</el-radio-button>
      </el-radio-group>
    </div>

    <el-input style="max-width: 800px;" v-show='intertContentType === "text"' v-model="insertText"
      placeholder="插入的文本内容"></el-input>

    <div class="insert-index-wrapper" v-show='intertContentType === "index"'>
      <el-input style="max-width: 240px;" v-model="insertIndexPreText" placeholder="序号前面的文本"></el-input>
      <span class="insert-index-type-wrapper">

        <el-tooltip content="开始序号" placement="top">
          <el-input-number v-model="insertIndexBaseNumber" controls-position="right" placeholder="开始序号" />
        </el-tooltip>

        <el-select v-model="insertIndexNumberType" placeholder="序号类型">
          <el-option v-for="item in insertContentTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <el-tooltip content="固定位数" placement="right">
          <el-input-number v-model="insertIndexDigitPadding" :min="1" :max="10" controls-position="right"
            placeholder="固定位数" v-show='insertIndexNumberType === "digit"' />
        </el-tooltip>

      </span>
      <el-input style="max-width: 240px;" v-model="insertIndexAfterText" placeholder="序号后面的文本"></el-input>
    </div>

  </div>
</template>

<script lang="ts" setup>

const positionOptions = [{
  label: "开始位置",
  value: "begin"
}, {
  label: "末尾位置",
  value: "end"
}, {
  label: "第 N 个字符之后",
  value: "afterIndexN"
}, {
  label: "倒数 N 个字符之前",
  value: "beforeIndexN"
}, {
  label: "XX 字符串之后",
  value: "afterStr"
},
{
  label: "XX 字符串之前",
  value: "beforeStr"
}]

const insertContentTypeOptions = [{
  label: "阿拉伯数字",
  value: "digit"
}, {
  label: "小写中文数字",
  value: "lowerChinese"
}, {
  label: "大写中文数字",
  value: "upperChinese"
}, {
  label: "英文小写字母",
  value: "lowerChar"
}, {
  label: "英文大写字母",
  value: "upperChar"
}]

const position = ref("")
const postionIndex = ref()
const postionStr = ref("")

const intertContentType = ref("text")

const insertText = ref("")
const insertIndexPreText = ref("")
const insertIndexAfterText = ref("")
const insertIndexBaseNumber = ref()
const insertIndexNumberType = ref("digit")
const insertIndexDigitPadding = ref()

const emits = defineEmits(["submit"])

watchEffect(() => {
  const options = {
    position: position.value,
    n: postionIndex.value,
    from: postionStr.value,
    toType: intertContentType.value,
    toStr: insertText.value,
    toPreStr: insertIndexPreText.value,
    toAfterStr: insertIndexAfterText.value,
    toBaseNumber: insertIndexBaseNumber.value,
    toNumberType: insertIndexNumberType.value,
    toDigitPadding: insertIndexDigitPadding.value
  }
  emits("submit", options)
})

</script>

<style lang="less" scoped>
.postion-select {
  display: flex;
  align-items: center;

  &>* {
    margin-right: 12px;
  }
}

.insert-index-wrapper {
  display: flex;
  align-items: center;

  &>* {
    margin-right: 12px;
  }
}

.insert-index-type-wrapper {
  display: flex;
  flex-direction: column;

  padding: 8px 6px;

  border: 1px solid #eee;
  border-radius: 4px;

  &>* {
    width: 160px;
  }

  &>*:nth-child(n+2) {
    margin-top: 6px;
  }

}
</style>
