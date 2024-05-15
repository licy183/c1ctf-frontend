<template>
    <div>
        <el-card shadow="never">
            <el-row :gutter="10">
                <el-col :span="3">
                    <el-button type="primary" icon="el-icon-plus" @click.prevent="newChallenge">新题目</el-button>
                </el-col>
                <!--                <el-col :span="4">-->
                <!--                    <el-input v-model="search"></el-input>-->
                <!--                </el-col>-->
                <!--                <el-col :span="3">-->
                <!--                    <el-button type="primary" plain icon="el-icon-search" @click.prevent="applyFilter">搜索</el-button>-->
                <!--                </el-col>-->

            </el-row>
        </el-card>
        <el-table :data="table_data">
            <el-table-column sortable prop="challenge_id" label="#" min-width="15px">
            </el-table-column>
            <el-table-column sortable prop="category_id" label="分类" min-width="30px">
                <template slot-scope="scope">
                    <span>{{ getCategoryName(scope.row.category_id) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="题目名">
            </el-table-column>
            <el-table-column sortable prop="solved_count" label="已答人数" min-width="25px">
            </el-table-column>
            <el-table-column sortable prop="score" label="当前分数" min-width="25px">
            </el-table-column>
            <el-table-column prop="is_dynamic_score" label="动态分数" min-width="25px">
                <template slot-scope="scope">
                    <el-switch @change="editBoolean('is_dynamic_score', scope.row.challenge_id, scope.row.is_open)"
                               v-model="scope.row.is_dynamic_score"></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="is_open" label="可用" min-width="20px">
                <template slot-scope="scope">
                    <el-switch @change="editBoolean('is_open', scope.row.challenge_id, scope.row.is_open)"
                               v-model="scope.row.is_open"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="40px">
                <template slot-scope="scope">
                    <el-tooltip content="容器设置" placement="top" v-if="scope.row.is_container">
                        <el-button type="" icon="el-icon-box" plain circle
                                   @click.prevent="loadContainerEditor(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip content="flag管理" placement="top" v-else>
                        <el-button type="" icon="el-icon-s-flag" plain circle
                                   @click.prevent="loadAttachment(scope.row)"></el-button>
                    </el-tooltip>
                    <el-button type="primary" icon="el-icon-edit" plain circle
                               @click.prevent="editChallenge(scope)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" plain circle
                               @click.prevent="deleteChallenge(scope)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="编辑题目" :close-on-click-modal="false" :visible.sync="showEditor">
            <el-form ref="editorForm">
                <el-form-item label="题目名" :required="true">
                    <el-input v-model="editor_title" autocomplete="off"
                              style="margin-left: 1em; max-width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="分类" :required="true">
                    <el-select v-model="editor_category_id" placeholder="请选择"
                               style="margin-left: 2em; max-width: 220px;">
                        <el-option
                            v-for="category in challenge.category"
                            :key="category.category_id"
                            :label="category.name"
                            :value="category.category_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="可用" :required="true">
                    <el-switch v-model="editor_is_open" style="margin-left: 2em"></el-switch>
                    <span class="helper-text">
                    不可用的题目会对用户隐藏
                    </span>
                </el-form-item>
                <el-form-item label="动态分数" :required="true">
                    <el-switch v-model="editor_is_dynamic_score"></el-switch>
                </el-form-item>
                <el-form-item label="创建容器" :required="true">
                    <el-switch v-model="editor_is_container"></el-switch>
                    <span class="helper-text">为每个用户单独创建容器，需要在新建题目后进一步配置容器</span>
                </el-form-item>
                <el-form-item label="分值" :required="true" v-if="editor_is_dynamic_score === false">
                    <el-input-number v-model="editor_score" style="margin-left: 2em"/>
                </el-form-item>
                <el-form-item label="题目内容" :required="true">
                    <span class="helper-text">支持html代码</span>
                    <el-input type="textarea" v-model="editor_introduction" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showEditor = false">取 消</el-button>
                <el-button type="primary" @click="saveChallenge(true)">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="附件管理" :close-on-click-modal="false" :visible.sync="show_attachment_editor">
            <el-form>
                <el-form-item label="题目名">
                    <span>{{ attachment_editor_challenge_name }}</span>
                </el-form-item>
                <el-form-item>
                    <div slot="label">附件</div>
                    <span class="helper-text">
                        http开头的url会自动变为链接
                        <span style="color: #F56C6C">比赛开始后添加/删除flag可能导致用户获得随机附件变化</span>
                    </span>

                    <el-row :gutter="20" class="attachment-row" v-for="(a, index) in attachment_list"
                            :key="a.attachment_id">
                        <el-col :span="9">
                            <el-input placeholder="url" v-model="a.url"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-input placeholder="flag" v-model="a.flag"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="success" icon="el-icon-check" plain circle
                                       @click.prevent="editAttachment(a)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" plain circle
                                       @click.prevent="deleteAttachment(a, index)"></el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="attachment-row">
                        <el-col :span="9">
                            <el-input placeholder="url" v-model="attachment_new_url"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-input placeholder="flag" v-model="attachment_new_flag"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="success" icon="el-icon-plus" plain circle
                                       @click.prevent="addAttachment"></el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="show_attachment_editor = false">关 闭</el-button>
            </div>
        </el-dialog>
        <ContainerEditor ref="container_editor"/>
    </div>
</template>

<script>
import api from '@/util/api'
import category from "@/pages/admin/util/category";
import {mapState} from "vuex";
import ContainerEditor from "@/pages/admin/components/challenge/ContainerEditor";

export default {
    name: "Challenge",
    components: {ContainerEditor},
    data() {
        return {
            table_data: [
                // {"title":"test web","introduction":"test flag{111}","score":966,"challenge_id":1,"category_id":1,"solved_count":2,"challenge_seed":351179,"is_dynamic_score":true,"is_open":true}
            ],

            editor_challenge_id: -1,
            editor_title: '',
            editor_introduction: '',
            editor_score: null,
            editor_category_id: null,
            editor_is_dynamic_score: false,
            editor_is_open: false,
            editor_is_container: false,
            editor_index: -1,
            showEditor: false,
            search: '',

            show_attachment_editor: false,
            attachment_editor_challenge_name: '',
            attachment_editor_challenge_id: 0,
            attachment_list: [],
            attachment_new_url: '',
            attachment_new_flag: '',

            show_container_editor: false,
        }
    },
    methods: {
        getCategoryName(id) {
            return category.getNameById(id);
        },

        editBoolean(name, challenge_id, value) {
            let data = {challenge_id: challenge_id};
            data[name] = value;
            api.post('/challenge/edit_challenge', data).then(() => {
                this.$message({message: '修改成功', type: 'success'});
            }).catch((e) => {
                this.$message({message: '修改失败：' + e, type: 'error'});
            })
        },

        deleteChallenge(scope) {
            api.post('/challenge/delete_challenge', {challenge_id: scope.row.challenge_id}).then(() => {
                this.$message({message: '删除成功', type: 'success'});
                this.table_data.splice(scope.$index, 1);
            }).catch((e) => {
                this.$message({message: '删除失败：' + e, type: 'error'});
            })
        },

        editChallenge(scope) {
            this.showEditor = true;
            this.editor_challenge_id = scope.row.challenge_id;
            this.editor_title = scope.row.title;
            this.editor_introduction = scope.row.introduction;
            this.editor_score = scope.row.score;
            this.editor_category_id = scope.row.category_id;
            this.editor_is_dynamic_score = scope.row.is_dynamic_score;
            this.editor_is_open = scope.row.is_open;
            this.editor_index = scope.$index;
            this.editor_is_container = scope.row.is_container;
        },

        saveChallenge(close_editor) {
            this.editor_score = this.editor_is_dynamic_score ? null : this.editor_score;
            if (this.editor_category_id === null) {
                this.$message({message: '分类不能为空', type: 'error'});
                return;
            }

            api.post('/challenge/edit_challenge', {
                challenge_id: this.editor_challenge_id,
                title: this.editor_title,
                introduction: this.editor_introduction,
                score: this.editor_score,
                category_id: this.editor_category_id,
                is_dynamic_score: this.editor_is_dynamic_score,
                is_open: this.editor_is_open,
                is_container: this.editor_is_container,
            }).then((r) => {
                if (close_editor === undefined || close_editor === true) {
                    this.showEditor = false;
                } else {
                    this.editor_challenge_id = r;
                }

                if (this.editor_index !== -1) {
                    let row = this.table_data[this.editor_index];
                    row.challenge_id = this.editor_challenge_id;
                    row.title = this.editor_title;
                    row.introduction = this.editor_introduction;
                    row.score = this.editor_score;
                    row.category_id = this.editor_category_id;
                    row.is_dynamic_score = this.editor_is_dynamic_score;
                    row.is_open = this.editor_is_open;
                    row.is_container = this.editor_is_container;
                } else {
                    this.table_data.push({
                        challenge_id: r,
                        title: this.editor_title,
                        introduction: this.editor_introduction,
                        score: this.editor_score,
                        category_id: this.editor_category_id,
                        is_dynamic_score: this.editor_is_dynamic_score,
                        is_open: this.editor_is_open,
                        is_container: this.editor_is_container,
                    });
                }
                this.$message({message: '保存成功', type: 'success'});
            }).catch((e) => {
                this.$message({message: '操作失败：' + e, type: 'error'});
            })

        },

        newChallenge() {
            this.showEditor = true;
            this.editor_challenge_id = null;
            this.editor_title = '';
            this.editor_introduction = '';
            this.editor_score = 200;
            this.editor_category_id = null;
            this.editor_is_dynamic_score = false;
            this.editor_is_open = true;
            this.editor_is_container = false;
            this.editor_index = -1;
        },

        loadAttachment(row) {
            api.post('/attachment/get_attachment', {challenge_id: row.challenge_id}).then(r => {
                this.attachment_editor_challenge_name = row.title;
                this.attachment_list = r;
                this.attachment_editor_challenge_id = row.challenge_id;
                this.show_attachment_editor = true;
            }).catch(e => {
                this.$message({message: '附件加载失败：' + e, type: 'error'});
            })
        },

        editAttachment(row) {
            api.post('/attachment/edit_attachment', {
                attachment_id: row.attachment_id,
                url: row.url,
                flag: row.flag
            }).then(() => {
                this.$message({message: '保存成功', type: 'success'});
            }).catch((e) => {
                this.$message({message: '保存失败：' + e, type: 'error'});
            })
        },

        deleteAttachment(row, index) {
            api.post('/attachment/delete_attachment', {attachment_id: row.attachment_id}).then(() => {
                this.attachment_list.splice(index, 1);
                this.$message({message: '删除成功', type: 'success'});
            }).catch((e) => {
                this.$message({message: '删除失败：' + e, type: 'error'});
            })

        },

        addAttachment() {
            if (/*this.attachment_new_url.length === 0 || */this.attachment_new_flag.length === 0) {
                this.$message({message: 'flag不能为空', type: 'error'});
                return;
            }
            api.post('/attachment/edit_attachment', {
                challenge_id: this.attachment_editor_challenge_id,
                url: this.attachment_new_url,
                flag: this.attachment_new_flag
            }).then((r) => {
                this.attachment_list.push({
                    attachment_id: r,
                    url: this.attachment_new_url,
                    flag: this.attachment_new_flag,
                    challenge_id: this.attachment_editor_challenge_id
                });
                this.attachment_new_url = '';
                this.attachment_new_flag = '';
                this.$message({message: '添加成功', type: 'success'});
            }).catch((e) => {
                this.$message({message: '添加失败：' + e, type: 'error'});
            });

        },
        loadContainerEditor(row) {
            this.$refs.container_editor.show(row.challenge_id, row.title);
        },
    },
    computed: mapState(['challenge']),
    async mounted() {
        await category.loadCategory(true);
        api.get('/challenge/get_all_challenge').then((r) => {
            this.table_data = r;
        }).catch((e) => {
            this.$message({message: '题目数据加载失败：' + e, type: 'error'});
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

.el-pagination {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}

.attachment-row {
    margin: 10px auto;
}


</style>
