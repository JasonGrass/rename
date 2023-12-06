<template>
    <div>
        <div class="filters">
            <el-checkbox v-model="colHideFolder" label="隐藏目录" border />
        </div>
        <!-- el-table 有一个布局 BUG，如果 column 没有设置 width，则会自适应宽度，但这个宽度只会变大，窗口大小缩小之后，此宽度不会自适应缩小 -->
        <el-table :data="tableData" ref="fileTable" class="table" max-height="2000px" stripe flexible table-layout="auto">
            <el-table-column type="index" :index="(index) => index + 1" label="序号" width="60" align="center" />
            <el-table-column prop="file" min-width="50%" label="文件名" align="right" />
            <el-table-column prop="modifyTime" :formatter="timeFormater" label="修改时间" width="180" align="center" />
            <el-table-column prop="createTime" :formatter="timeFormater" label="创建时间" width="180" align="center" />
            <el-table-column prop="size" :formatter="sizeFormatter" label="大小" width="100" align="center" />
            <el-table-column v-if="!colHideFolder" prop="folder" min-width="50%" label="目录" align="right" />
            <el-table-column prop="preview" min-width="50%" label="预览" align="right" />
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import type { TableColumnCtx } from 'element-plus'
import { formatFileSize, formatDate } from "@/utils/formatter";

const sizeFormatter = (row: FileItem, _column: TableColumnCtx<FileItem>, _cellVaule: number | undefined, _index: number) => {
    return formatFileSize(row.size)
}

const timeFormater = (_row: FileItem, _column: TableColumnCtx<FileItem>, cellVaule: number | undefined, _index: number) => {
    if (!cellVaule) {
        return "UNKNOWN"
    }
    return formatDate(cellVaule)
}

const fileTable = ref(null)
const colHideFolder = ref(false)

watch(colHideFolder, () => {
    const t = fileTable.value as any;
    if (t) {
        nextTick(() => {
            t.doLayout()
        })
    }
})

const tableData = [
    {
        file: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabc.txt",
        modifyTime: 1701847341206,
        createTime: 1701847341206,
        size: 556600,
        folder: "/1/2/3",
        preview: "1111111111111111111111111456.abc",

    },

]
</script>

<style lang="less" scoped>
.table {
    min-width: 10%;
}
</style>