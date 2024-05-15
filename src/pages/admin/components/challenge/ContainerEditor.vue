<template>
    <!-- 容器配置 -->
    <el-dialog title="容器配置" :close-on-click-modal="false" :visible.sync="show_container_editor">
        <el-form label-width="150px" >
            <el-form-item label="题目名">
                <span>{{ challenge_name }}</span>
            </el-form-item>
            <el-form-item label="自动生成flag" :required="true">
                <el-switch v-model="challenge_container_setting.is_generate_flag"></el-switch>
                <span class="helper-text">
                    为每个用户、每个题目自动生成flag，并挂载到容器中
                </span>
            </el-form-item>
            <el-form-item label="flag" :required="true" v-if="!challenge_container_setting.is_generate_flag">
                <el-input v-model="challenge_container_setting.flag" autocomplete="off"
                          style="max-width: 220px;"></el-input>
            </el-form-item>
            <el-form-item label="compose文件路径" :required="true">
                <el-input v-model="challenge_container_setting.compose_file" autocomplete="off"
                          style="max-width: 220px;"></el-input>
            </el-form-item>
            <el-form-item label="URL模板" :required="true">
                <el-input v-model="challenge_container_setting.url_template" autocomplete="off"
                          style="max-width: 220px;"></el-input>
                <span class="helper-text">
                    %host%会被替换为容器的IP;%port%会被替换为容器的端口
                </span>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="show_container_editor = false">取 消</el-button>
            <el-button type="primary" @click="save_challenge_container()">确 定</el-button>
        </div>
    </el-dialog>

</template>

<script>
import api from "@/util/api";

export default {
    name: "ContainerEditor",
    props: {},
    data() {
        return {
            show_container_editor: false,
            challenge_id: null,
            challenge_name: null,
            challenge_container_setting: {
                compose_file: null,
                is_generate_flag: false,
                flag: '',
                url_template: null
            },
        }
    },
    methods: {
        show(challenge_id, challenge_name) {
            this.challenge_id = challenge_id;
            this.challenge_name = challenge_name;
            this.load_challenge_container(challenge_id);
            this.show_container_editor = true;
        },
        load_challenge_container(challenge_id) {
            api.post('/container/get_challenge_container_setting', {challenge_id: challenge_id}).then((setting) => {
                this.challenge_container_setting = {
                    compose_file: setting.compose_file,
                    is_generate_flag: setting.is_generate_flag,
                    flag: setting.flag,
                    url_template: setting.url_template,
                };
                this.challenge_id = setting.challenge_id;
            }).catch((e) => {
                this.$message({message: '容器配置加载失败' + e, type: 'error'});
                this.challenge_container_setting = {
                    compose_file: null,
                    is_generate_flag: false,
                    flag: null,
                    url_template: null,
                };
            })
        },
        save_challenge_container() {

            api.post('/container/edit_challenge_container_setting', {
                challenge_id: this.challenge_id,
                ...this.challenge_container_setting
            }).then(() => {
                this.$message({message: '保存成功', type: 'success'});
                this.show_container_editor = false;
            }).catch((e) => {
                this.$message({message: '容器配置保存失败' + e, type: 'error'});
            })
        }


    }
}
</script>

<style scoped>
.helper-text {
    color: #99a9bf;
    font-size: 12px;
    margin-left: 1em;
}
</style>
