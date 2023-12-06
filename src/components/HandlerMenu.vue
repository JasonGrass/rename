<template>
    <div>

        <el-menu>

            <el-menu-item index="0">
                <el-icon>
                    <SetUp />
                </el-icon>
                <span>替换字符</span>
            </el-menu-item>
            <el-menu-item index="1">
                <el-icon>
                    <SetUp />
                </el-icon>
                <span>删除字符</span>
            </el-menu-item>
            <el-menu-item index="2">
                <el-icon>
                    <SetUp />
                </el-icon>
                <span>新增/插入字符</span>
            </el-menu-item>
            <el-menu-item index="3">
                <el-icon>
                    <SetUp />
                </el-icon>
                <span>转换字符</span>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon>
                    <SetUp />
                </el-icon>
                <span>全新命名</span>
            </el-menu-item>
            <el-menu-item index="5">
                <el-icon>
                    <SetUp />
                </el-icon>
                <span>后缀名处理</span>
            </el-menu-item>

        </el-menu>

    </div>
</template>

<script lang="ts" setup>

import { SetUp } from '@element-plus/icons-vue';

</script>

<style lang="less" scoped></style>
