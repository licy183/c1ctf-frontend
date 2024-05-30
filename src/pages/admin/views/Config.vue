<template>
    <el-form>
        <el-card shadow="never">
            <el-row>
                <el-col :span="4">
                    <el-form-item label="注册开关">
                        <el-switch v-model="register_open"></el-switch>
                    </el-form-item>
                </el-col>
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

            <el-row>
                <el-col :span="4">
                    <el-form-item label="按 IP 限制登录次数">
                        <el-switch v-model="login_limit"></el-switch>
                    </el-form-item>
                </el-col>
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
        </el-card>
        <el-card header="容器设置" shadow="never">
            <el-row>
                <el-form-item label="容器数量">
                    <el-input-number v-model="container_count"/>
                    <span class="helper-text">
                        每位用户同时能申请的最大容器数
                    </span>
                </el-form-item>

            </el-row>
            <el-row>
                <el-form-item label="flag格式">
                    <el-input style="width:220px;" v-model="container_flag_format"/>
                    <span class="helper-text">
                        自动生成flag时的模板
                    </span>
                </el-form-item>
            </el-row>
        </el-card>
        <el-card shadow="never" style="padding-bottom: 20px">
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
            container_count: undefined,
            container_flag_format: undefined,
            login_limit: undefined,
        }
    },
    computed: {},
    methods: {
        onSubmit() {
            api.post('/config/edit_config', {
                match_open_time: this.match_open_time,
                match_end_time: this.match_end_time,
                register_open: this.register_open,
                dynamic_score_base: this.dynamic_score_base,
                dynamic_score_min: this.dynamic_score_min,
                container_count: this.container_count,
                container_flag_format: this.container_flag_format,
                login_limit: this.login_limit,
            }).then(() => {
                this.$message({showClose: true, message: '保存成功', type: 'success'});
            }).catch((e) => {
                this.$message({showClose: true, message: e, type: 'error'});
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
            this.container_count = r.container_count;
            this.container_flag_format = r.container_flag_format;
            this.login_limit = r.login_limit;
        }).catch((e) => {
            this.$message({showClose: true, message: '配置信息加载失败：' + e, type: 'error'});
        })
    }
}
</script>

<style scoped>
.el-card {
    border: 0;
}

.el-card >>> .el-card__header {
    padding-top: 0;
}

.el-card >>> .el-card__body {
    padding-bottom: 0;
}

.helper-text {
    color: #99a9bf;
    font-size: 12px;
    margin-left: 1em;
}
</style>
