<template>
    <div class="wrapper">

        <div class="title" v-if="isShowTitle">
            <h2>{{ title }}</h2>
            <el-icon @click="onExpandFoldClick" v-if="canFold">
                <ArrowLeftBold v-show="!isExpand" />
                <ArrowDownBold v-show="isExpand" />
            </el-icon>
        </div>

        <div class="content" v-show="isExpand">
            <slot></slot>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ArrowLeftBold, ArrowDownBold } from '@element-plus/icons-vue';

const { title, canFold } = defineProps({
    title: {
        type: String
    },
    canFold: {
        type: Boolean,
        default: false,
    }
})

const isExpand = ref(true)
const isShowTitle = Boolean(title)

const onExpandFoldClick = () => {
    isExpand.value = !isExpand.value
}

</script>

<style lang="less" scoped>
.wrapper {
    margin: 8px 0;
    padding: 8px;

    border: 1px solid #eee;
    border-radius: 4px;

}

.title {
    display: flex;
    align-items: baseline;
    user-select: none;

    h2 {
        margin-right: 16px;

        font-size: 16px;
        color: #333;
        font-family: SmileySans, 'Courier New', Courier, monospace;
    }

    .el-icon {
        padding: 2px;
        font-size: 14px;
        color: #777;
        border: 1px solid #eee;
        border-radius: 12px;

        cursor: pointer;
    }

}

.content {
    margin: 8px 0;
}
</style>