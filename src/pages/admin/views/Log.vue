<template>
    <div>
        <el-card shadow="never" class="toolbox">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-select placeholder="分类" v-model="filter_type">
                        <el-option
                                v-for="e in events"
                                :key="e.id"
                                :label="e.text"
                                :value="e.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-input placeholder="日志内容" v-model="filter_content" @keydown.enter.native="reloadLog"/>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click.prevent="reloadLog" plain>刷新</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-table :data="table_data">
            <el-table-column prop="id" label="#" min-width="10px">
            </el-table-column>
            <el-table-column prop="event" label="类型" min-width="25px">
                <template slot-scope="scope">
                    <span>{{events[scope.row.event].text}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="message" label="消息">
            </el-table-column>
            <el-table-column prop="log_time" label="时间" min-width="40px">
                <template slot-scope="scope">
                    <span>{{formatTime(scope.row.log_time)}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                layout="sizes, prev, pager, next, jumper"
                :page-count="page_count"
                :page-size.sync="page_size"
                :current-page.sync="current_page"
                :page-sizes="[10, 20, 50, 100, 400]"
                @current-change="reloadLog"
                @size-change="reloadLog"
        >

        </el-pagination>
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
                    // {id: 1, event: 1, message: 'test', log_time: '2019-11-05'}
                ],
                events: {
                    0:{id: 0, type: 'LOG_EVENT_SUBMIT_SUCCESS', text: '提交成功'},
                    1:{id: 1, type: 'LOG_EVENT_SUBMIT_ERROR', text: '提交无效的flag'},
                    2:{id: 2, type: 'LOG_EVENT_SUBMIT_REPEAT', text: '重复提交'},
                    3:{id: 3, type: 'LOG_EVENT_SUBMIT_OTHER_USER', text: '提交其他用户的flag'},
                    4:{id: 4, type: 'LOG_EVENT_SUBMIT_REPEAT_OTHER_USER', text: '重复提交其他用户的flag'},
                    5:{id: 5, type: 'LOG_EVENT_SUBMIT_TOO_FAST', text: 'flag提交过快'},
                    6:{id: 6, type: 'LOG_EVENT_LOGIN_TOO_FAST', text: '登录尝试过多'},
                    999:{id: 999, text: '全部'},
                },
                filter_content: '',
                filter_type: 999,
                current_page: 1,
                page_size: 10,
                page_count: 1,
            }
        },
        methods: {
            formatTime(t) {
                return time.timeToString(t);
            },
            reloadLog() {
                let log_type = this.filter_type, content = this.filter_content;
                if (this.filter_type == null || this.filter_type === 999) {
                    log_type = null;
                }
                if (this.filter_content == null || this.filter_content.length === 0) {
                    content = null;
                }

                api.post('/log/get_log', {
                    page: {page_no: this.current_page - 1, page_size: this.page_size},
                    log_type: log_type,
                    content: content,
                }).then((r) => {
                    this.table_data = r.content;
                    this.page_count = r.total_pages;
                    this.$message({message: '加载成功' , type: 'success'});

                }).catch((e) => {
                    this.$message({message: '日志数据加载失败：' + e, type: 'error'});
                })
            }
        },
        mounted() {
            // this.table_data = [];
            this.reloadLog();
        }
    }
</script>

<style scoped>
    .toolbox {
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

    .el-pagination {

        margin: 10px auto;
        display: flex;
        justify-content: center;
    }
</style>
