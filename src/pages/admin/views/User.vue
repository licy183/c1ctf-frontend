<template>
    <div>
        <el-card shadow="never">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input v-model="search_text" @keyup.enter.native="apply_search" placeholder="搜索"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" icon="el-icon-search" @click.prevent="apply_search" plain>搜索</el-button>
                </el-col>
                <el-col :offset="5" :span="3">
                    <el-button type="primary" icon="el-icon-plus" @click.prevent="new_user">新用户</el-button>
                </el-col>
                <el-col :span="4">
                    <el-tooltip content="更新用户列表" placement="top">
                        <el-button type="primary" icon="el-icon-s-custom" plain circle @click.prevent="load_user"></el-button>
                    </el-tooltip>
                    <el-tooltip content="更新排名" placement="top">
                        <el-button type="primary" icon="el-icon-s-data" plain circle @click.prevent="load_ranking"></el-button>
                    </el-tooltip>
                    <el-tooltip content="重新计算排名" placement="top">
                        <el-button type="primary" icon="el-icon-refresh-right" plain circle @click.prevent="refresh_ranking"></el-button>
                    </el-tooltip>
                </el-col>
                <el-col :span="3">
                    <el-button type="success" icon="el-icon-download" plain @click.prevent="export_excel">导出Excel</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-table :data="table_data">
            <el-table-column prop="user_id" label="#" min-width="5px">
            </el-table-column>
            <el-table-column prop="username" label="用户名" min-width="17px">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="22px">
            </el-table-column>
            <el-table-column prop="user_role" label="角色" min-width="10px">
                <template slot-scope="scope">
                    <span>{{user_role[scope.row.user_role].text}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="last_login_time" label="最后登录时间" min-width="22px">
                <template slot-scope="scope">
                    <span>{{format_time(scope.row.last_login_time)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="student_id" label="学号" min-width="15px">
            </el-table-column>
            <el-table-column prop="student_name" label="姓名" min-width="15px">
            </el-table-column>
            <el-table-column prop="rank" label="排名" min-width="7px">
            </el-table-column>
            <el-table-column prop="score" label="得分" min-width="10px">
            </el-table-column>
            <el-table-column prop="banned" label="封号" min-width="8px">
                <template slot-scope="scope">
                    <el-switch @change='edit_ban(scope.row)' v-model="scope.row.banned"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="8px">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" plain circle @click.prevent="edit_user(scope.row)"></el-button>
<!--                    <el-button type="danger" icon="el-icon-delete" plain circle @click.prevent="delete_user(scope.row)"></el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                layout="sizes, prev, pager, next, jumper"
                :total="data_count"
                :page-sizes="[10, 20, 50, 100]"
                :current-page.sync="current_page"
                :page-size.sync="page_size">
        </el-pagination>

        <el-dialog title="编辑用户" :close-on-click-modal="false" :visible.sync="editor_show">
            <el-form :model="editor_form">
                <el-form-item label="用户名" :required="true">
                    <el-input v-model="editor_form.username" autocomplete="off" style="margin-left: 1em; max-width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :required="true">
                    <el-input v-model="editor_form.email" autocomplete="off" style="margin-left: 2em; max-width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="密码" :required="true">
                    <el-input v-model="editor_form.password" placeholder="留空表示不修改" autocomplete="off" style="margin-left: 2em; max-width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="角色" :required="true">
                    <el-select v-model="editor_form.user_role" placeholder="选择角色" style="margin-left: 2em; max-width: 220px;">
                        <el-option
                                v-for="role in user_role"
                                :key="role.id"
                                :label="role.text"
                                :value="role.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学号" :required="true" v-if="editor_form.user_role === 1">
                    <el-input v-model="editor_form.student_id" autocomplete="off" style="margin-left: 2em; max-width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :required="true" v-if="editor_form.user_role === 1">
                    <el-input v-model="editor_form.student_name" autocomplete="off" style="margin-left: 2em; max-width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="禁止" :required="true">
                    <el-switch v-model="editor_form.banned" style="margin-left: 2em; max-width: 220px;"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editor_show = false">取 消</el-button>
                <el-button type="primary" @click="save_user">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from '@/util/api'
    import time from "@/util/time";
    import XLSX from 'xlsx'
    export default {
        name: "User",
        data() {
            return {
                user_list: [
                    // {"username":"admin","email":"test@c1sec.club","banned":false,"user_id":1,"user_role":2,"student_id":'111111111',"student_name":'test',rank:1,"last_login_time":"2019-11-05T12:24:28.000+0000","user_seed":3},
                ],
                page_size: 10,
                user_role: {
                    0:{id:0, text:'管理员'},
                    1:{id:1, text:'学生'},
                    2:{id:2, text:'普通用户'},
                },
                current_page: 1,
                editor_show: false,
                editor_form: {
                    user_id: null,
                    username: null,
                    email: '',
                    password: null,
                    user_role: null,
                    student_id: null,
                    student_name: null,
                    banned: null,
                },
                editor_row: null,
                search_text: null,
                filter_text: null,
            }
        },
        methods: {
            format_time(t) {
                return time.timeToString(t);
            },
            // eslint-disable-next-line no-unused-vars
            delete_user(row) {

            },
            new_user() {
                this.editor_show = true;
                this.editor_row = null;
                this.editor_form.user_id = null;
                this.editor_form.username = '';
                this.editor_form.email = '';
                this.editor_form.password = '';
                this.editor_form.user_role = 2;
                this.editor_form.student_id = '';
                this.editor_form.student_name = '';
                this.editor_form.banned = false;
            },
            edit_user(row) {
                this.editor_show = true;
                this.editor_row = row;
                this.editor_form.user_id = row.user_id;
                this.editor_form.username = row.username;
                this.editor_form.email = row.email;
                this.editor_form.password = null;
                this.editor_form.user_role = row.user_role;
                this.editor_form.student_id = row.student_id;
                this.editor_form.student_name = row.student_name;
                this.editor_form.banned = row.banned;
            },
            save_user() {
                let password = this.editor_form.password == null || this.editor_form.password.length === 0 ? null : this.editor_form.password;
                let student_id, student_name;
                if (this.editor_form.user_role === 1) {
                    student_id = this.editor_form.student_id;
                    student_name = this.editor_form.student_name;
                }

                api.post('/user/edit_user', {
                    user_id: this.editor_form.user_id,
                    username: this.editor_form.username,
                    password: password,
                    email: this.editor_form.email,
                    user_role: this.editor_form.user_role,
                    student_id: student_id,
                    student_name: student_name,
                    banned: this.editor_form.banned,
                }).then((r) => {
                    if (this.editor_row != null) {
                        this.editor_row.username = this.editor_form.username;
                        this.editor_row.email = this.editor_form.email;
                        this.editor_row.user_role = this.editor_form.user_role;
                        this.editor_row.student_id = this.editor_form.student_id;
                        this.editor_row.student_name = this.editor_form.student_name;
                        this.editor_row.banned = this.editor_form.banned;
                    } else {
                        // 新用户
                        this.user_list.push({
                            username: this.editor_form.username,
                            email: this.editor_form.email,
                            banned: this.editor_form.banned,
                            user_id: r,
                            user_role: this.editor_form.user_role,
                            student_id: student_id,
                            student_name: student_name,
                            rank: null,
                            last_login_time: null,
                            user_seed: null,
                        });
                    }
                    this.editor_show = false;
                    this.$message({message: '保存成功', type: 'success'});
                }).catch((e) => {
                    this.$message({message: '保存失败：' + e, type: 'error'});
                })
            },
            edit_ban(row) {
                api.post('/user/edit_user', {user_id: row.user_id, banned: row.banned}).then(() => {
                    this.$message({message: '修改成功', type: 'success'});
                }).catch((e) => {
                    this.$message({message: '修改失败：' + e, type: 'error'});
                })
            },
            load_ranking() {
                api.get('/rank/get_all_ranking').then((r) => {
                    // this.user_list = r;
                    let reverse_ranking = r.reverse_ranking;
                    let ranking = r.ranking;
                    for (let user of this.user_list) {
                        if (reverse_ranking[user.user_id] != null) {
                            user.rank = reverse_ranking[user.user_id] + 1;
                            user.score = ranking[reverse_ranking[user.user_id]].score;
                        } else {
                            user.rank = '-';
                            user.score = '-';
                        }
                    }
                    // 强制刷新
                    this.user_list.splice(0, 0);
                }).catch((e) => {
                    this.$message({message: '排名加载失败：' + e, type: 'error'});
                })
            },
            refresh_ranking() {
                api.get('/rank/refresh_ranking').then(() => {
                    this.load_ranking();
                    this.$message({message: '刷新成功', type: 'success'});
                }).catch((e) => {
                    this.$message({message: '排名刷新失败：' + e, type: 'error'});
                })
            },
            load_user() {
                api.get('/user/get_all_user').then((r) => {
                    this.user_list = r;
                    this.load_ranking();
                }).catch((e) => {
                    this.$message({message: '用户列表加载失败：' + e, type: 'error'});
                })
            },
            apply_search() {
                this.filter_text = this.search_text.toLowerCase();
            },
            export_excel() {
                let sheet = XLSX.utils.json_to_sheet(this.user_list);
                let workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, sheet);
                XLSX.writeFile(workbook, 'out.xlsx');
            }
        },
        computed: {
            filter_buffer() {
                if (this.filter_text != null && this.filter_text.length > 0) {
                    return this.user_list.filter(data =>
                        data.username != null && data.username.toLowerCase().includes(this.filter_text) ||
                        data.email != null && data.email.toLowerCase().includes(this.filter_text) ||
                        data.student_id != null && data.student_id.toLowerCase().includes(this.filter_text) ||
                        data.student_name != null && data.student_name.toLowerCase().includes(this.filter_text)
                    );
                } else {
                    return null;
                }
            },
            data_count() {
                if (this.filter_buffer != null) {
                    return this.filter_buffer.length;
                } else {
                    return this.user_list.length;
                }
            },
            table_data() {
                let start = (this.current_page - 1) * this.page_size;
                let end = start + this.page_size;
                if (this.filter_buffer != null) {
                    return this.filter_buffer.slice(start,end);
                } else {
                    return this.user_list.slice(start,end);
                }
            },


        },
        mounted() {
            this.load_user();
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
        margin: 10px auto;
        display: flex;
        justify-content: center;
    }
</style>
