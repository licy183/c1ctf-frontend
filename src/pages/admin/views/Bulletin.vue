<template>
    <div>
        <el-card shadow="never">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-button type="primary" @click.prevent="newBulletin">新公告</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-table :data="table_data">
            <el-table-column prop="bulletin_id" label="#" min-width="10px">
            </el-table-column>
            <el-table-column prop="title" label="公告标题">
            </el-table-column>
            <el-table-column prop="publish_time" label="发布时间">
            </el-table-column>
            <el-table-column prop="is_sticky" label="置顶" min-width="20px" >
                <template slot-scope="scope">
                    <el-switch @change='stickBulletin($event, scope.row.bulletin_id)' v-model="scope.row.is_sticky"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="40px">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" plain circle @click.prevent="editBulletin(scope)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" plain circle @click.prevent="deleteBulletin(scope)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="编辑公告" :close-on-click-modal="false" :visible.sync="showEditor">
            <el-form>
                <el-form-item label="标题" :required="true">
                    <el-input v-model="bulletin_edit_title" autocomplete="off" style="margin-left: 2em; max-width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="发布时间" :required="true">
                    <el-date-picker v-model="bulletin_edit_publish_time" type="datetime" placeholder="比赛结束时间" />
                    <span class="helper-text">没有定时发布功能</span>
                </el-form-item>
                <el-form-item label="置顶" :required="true">
                    <el-switch v-model="bulletin_edit_is_sticky" style="margin-left: 2em"></el-switch>
                </el-form-item>
                <el-form-item label="内容" :required="true">
                    <span class="helper-text">支持html代码</span>
                    <el-input type="textarea" v-model="bulletin_edit_content" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showEditor = false">取 消</el-button>
                <el-button type="primary" @click="saveBulletin">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from '@/util/api'
    import time from "@/util/time";
    export default {
        name: "Bulletin",
        data() {
            return {
                table_data: [
                    {bulletin_id: 1, title: 'test', is_sticky: true}
                ],
                bulletin_edit_id: -1,
                bulletin_edit_title: '',
                bulletin_edit_content: '',
                bulletin_edit_publish_time: '',
                bulletin_edit_is_sticky: false,
                bulletin_edit_index: -1,
                showEditor: false,
            }
        },
        methods: {
            stickBulletin(is_sticky, bulletin_id) {
                api.post('/bulletin/edit_bulletin', {bulletin_id: bulletin_id, is_sticky: is_sticky}).then(() => {
                    this.$message({message: '修改成功', type: 'success'});
                }).catch((e) => {
                    this.$message({message: '修改失败：' + e, type: 'error'});
                })
            },
            deleteBulletin(scope) {
                api.post('/bulletin/delete_bulletin', {bulletin_id: scope.row.bulletin_id}).then(() => {
                    this.$message({message: '删除成功', type: 'success'});
                    this.table_data.splice(scope.$index,1);
                }).catch((e) => {
                    this.$message({message: '删除失败：' + e, type: 'error'});
                })
            },
            editBulletin(scope) {
                this.showEditor = true;
                this.bulletin_edit_index = scope.$index;
                this.bulletin_edit_title = scope.row.title;
                this.bulletin_edit_publish_time = scope.row.publish_time;
                this.bulletin_edit_content = scope.row.content;
                this.bulletin_edit_is_sticky = scope.row.is_sticky;
                this.bulletin_edit_id = scope.row.bulletin_id;
            },
            saveBulletin() {
                api.post('/bulletin/edit_bulletin', {
                    bulletin_id: this.bulletin_edit_id,
                    title : this.bulletin_edit_title,
                    publish_time: new Date(this.bulletin_edit_publish_time),
                    content: this.bulletin_edit_content,
                    is_sticky: this.bulletin_edit_is_sticky,
                }).then((r) => {
                    this.showEditor = false;

                    if (this.bulletin_edit_index !== -1) {
                        let row = this.table_data[this.bulletin_edit_index];
                        row.title = this.bulletin_edit_title;
                        row.publish_time = time.timeToString(this.bulletin_edit_publish_time);
                        row.is_sticky = this.bulletin_edit_is_sticky;
                        row.content = this.bulletin_edit_content;
                    } else {
                        this.table_data.push({
                            bulletin_id: r,
                            title : this.bulletin_edit_title,
                            publish_time: time.timeToString(this.bulletin_edit_publish_time),
                            content: this.bulletin_edit_content,
                            is_sticky: this.bulletin_edit_is_sticky,
                        });
                    }
                    this.$message({message: '操作成功', type: 'success'});
                }).catch((e) => {
                    this.$message({message: '操作失败：' + e, type: 'error'});

                })

            },
            newBulletin() {
                this.showEditor = true;
                this.bulletin_edit_index = -1;
                this.bulletin_edit_title = '';
                this.bulletin_edit_publish_time = new Date();
                this.bulletin_edit_content = '';
                this.bulletin_edit_is_sticky = false;
                this.bulletin_edit_id = null;
            },
        },
        mounted() {
            this.table_data = [];
            api.get('/bulletin/get_all_bulletin').then((r) => {
                for (let bulletin of r) {
                    this.table_data.push({
                        bulletin_id: bulletin.bulletin_id,
                        title: bulletin.title,
                        content: bulletin.content,
                        publish_time: time.timeToString(bulletin.publish_time),
                        is_sticky: bulletin.is_sticky,
                    });
                }

            }).catch((e) => {
                this.$message({message: '公告数据加载失败：' + e, type: 'error'});
            })
        }
    }
</script>

<style scoped>
    .el-card {
        border-top: 0;
        border-right: 0;
        border-left: 0;
        border-bottom: 1px solid #EBEEF5;
        border-radius: 0;
    }
    .helper-text {
        color: #99a9bf;
        font-size: 12px;
        margin-left: 1em;
    }
    .el-form-item {
        margin-bottom: 5px;
    }
</style>
