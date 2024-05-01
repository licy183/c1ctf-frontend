<template>
            <el-form>
                <el-card shadow="never">
                    <el-row>
                        <el-col :span="4">
                            <el-form-item label="注册开关" >
                                <el-switch v-model="register_open"></el-switch>
                            </el-form-item>
                        </el-col>
<!--                        <el-col :span="4">-->
<!--                            <el-form-item label="Writeup上传" >-->
<!--                                <el-switch v-model="register_open"></el-switch>-->
<!--                            </el-form-item>-->
<!--                        </el-col>-->

                    </el-row>
                </el-card>
                <el-card header="比赛设置" shadow="never">
                    <el-row>
                        <el-form-item label="开始时间">
                            <el-date-picker
                                    v-model="match_open_time"
                                    type="datetime"
                                    placeholder="比赛开始时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-row>

                    <el-row>
                        <el-form-item label="结束时间">
                            <el-date-picker
                                    v-model="match_end_time"
                                    type="datetime"
                                    placeholder="比赛结束时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-row>
                </el-card>
                <el-card header="动态积分设置" shadow="never">
                    <el-row>
                        <el-form-item label="基础分值">
                            <el-input-number v-model="dynamic_score_base"/>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="最小分值">
                            <el-input-number v-model="dynamic_score_min"/>
                        </el-form-item>
                    </el-row>
                    <el-button type="primary" @click="onSubmit">保存</el-button>

                </el-card>


            </el-form>


</template>

<script>
    import api from '@/util/api'
    export default {
        name: "Config",
        data() {
            return {
                match_open_time: undefined,
                match_end_time: undefined,
                register_open: undefined,
                dynamic_score_base: undefined,
                dynamic_score_min: undefined,
            }
        },
        computed: {

        },
        methods:{
            onSubmit() {
                api.post('/config/edit_config', {
                    match_open_time: this.match_open_time,
                    match_end_time: this.match_end_time,
                    register_open: this.register_open,
                    dynamic_score_base: this.dynamic_score_base,
                    dynamic_score_min: this.dynamic_score_min
                }).then(() => {
                    this.$message({ showClose: true, message: '保存成功', type: 'success' });
                }).catch((e) => {
                    this.$message({ showClose: true, message: e, type: 'error' });
                })
            }
        },
        mounted() {
            api.get('/config/get_config').then((r) => {
                this.match_open_time = r.match_open_time;
                this.match_end_time = r.match_end_time;
                this.register_open = r.register_open;
                this.dynamic_score_base = r.dynamic_score_base;
                this.dynamic_score_min = r.dynamic_score_min;
            }).catch((e) => {
                this.$message({ showClose: true, message: '配置信息加载失败：' + e, type: 'error'});
            })
        }
    }
</script>

<style scoped>
    .el-card {
        border: 0;
    }
    .el-card>>> .el-card__header {
        padding-top: 0;
    }
    .el-card>>> .el-card__body {
        padding-bottom: 0;
    }


</style>
