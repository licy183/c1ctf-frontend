<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" plain >导出Excel</el-button>
                </el-col>
                <el-col :offset="13" :span="3">
                    <el-button type="primary" plain >导出Excel</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-table :data="tableData">
            <el-table-column prop="date" label="排名">
            </el-table-column>
            <el-table-column prop="name" label="用户名">
            </el-table-column>
            <el-table-column prop="address" label="得分">
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    export default {
        name: "Ranking",
        data() {
            const item = {
                date: '1',
                name: '啊啊啊啊',
                address: '123'
            };
            return {
                tableData: [item],
                input: undefined,
            }
        },
        computed: {

        },
        methods:{

        },
        mounted() {
        }
    }
</script>

<style scoped>
    .el-card {
        border-top: 0;
        border-right: 0;
        border-left: 0;
        border-bottom: 1px solid #EBEEF5;
        border-radius: 0px;
    }

</style>
