<template>
    <div class="header">

        <span class="title">
            <img src="../assets/icon256.ico" alt="logo" width="32" height="32">
            <h1>批量文件重命名</h1>
        </span>

        <span class="file-loader">
            <el-button>导入文件</el-button>
            <el-button>导入文件夹</el-button>
        </span>

        <span class="about">
            <el-button>关于</el-button>
            <img src="../assets/github.svg" alt="github" width="32" />
        </span>

    </div>
</template>

<script lang="ts" setup>


</script>

<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;

    margin: 0 0 8px 0;
    line-height: 48px;
    height: 48px;

    background-color: #f3f6fb;
    border-bottom: solid 1px #e6e6e6;
    box-shadow: 0px 10px 5px -10px #e6e6e6;
}


.title {
    display: flex;
    align-items: center;

    margin-left: 8px;

    h1 {
        margin-left: 8px;
        font-size: 18px;
        font-weight: 500;
    }
}

.about {
    display: flex;
    align-items: center;
    padding-right: 16px;

    img {
        margin-left: 12px;
        cursor: pointer;
    }
}

.file-loader {
    margin-left: -120px;

}
</style>
