<template>
    <div>
        <el-card shadow="never">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-button type="primary" @click.prevent="addCategory" >添加分类</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-table :data="table_data">
            <el-table-column prop="category_id" label="#" min-width="5px">
            </el-table-column>
            <el-table-column prop="name" label="分类名">
                <template slot-scope="scope">
                    <el-input ref="input"
                              @blur.passive="saveCategory(scope)"
                              @keyup.enter.native="saveCategory(scope)"
                              v-model="edited_name"
                              v-if="selected_index === scope.$index"
                              :maxlength="64"
                              show-word-limit
                              v-focus>
                    </el-input>
                    <span @click="editCategory(scope)" v-else>{{scope.row.index}} {{scope.row.name}}</span>

                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="10px" >
                <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" plain circle @click.prevent="deleteCategory(scope)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import api from '@/util/api'
    import category from "@/pages/admin/util/category";
    import {mapState} from "vuex";
    export default {
        name: "Category",
        data() {
            return {
                table_data: [
                    // {category_id: 1, name: 'test'}
                ],
                selected_index: -1,
                edited_name: '',
            }
        },
        methods: {
            // 保存修改数据到本地
            commitCategory() {
                category.commitChange(this.table_data);
            },
            deleteCategory(scope) {
                if (this.selected_index === -1) {
                    api.post('/category/delete_category', {category_id: scope.row.category_id}).then(() => {
                        this.$message({message: '删除成功', type: 'success'});
                        this.table_data.splice(scope.$index,1);
                    }).catch((e) => {
                        this.$message({message: '删除失败：' + e, type: 'error'});
                    });
                    this.commitCategory();
                } else {
                    this.$message({message: '不要心急，先把现在的内容保存了', type: 'error'});
                }

            },
            editCategory(scope) {
                if (this.selected_index === -1) {
                    this.edited_name = scope.row.name;
                    this.selected_index = scope.$index;
                }

            },
            saveCategory(scope) {
                let row = scope.row;
                if (this.edited_name.length > 0) {
                    this.selected_index = -1;
                } else {
                    // 空白的时候不能隐藏文本框
                    return;
                }

                if (this.edited_name !== row.name) {
                    // 内容经过修改
                    row.name = this.edited_name;
                    api.post('/category/edit_category', {category_id: row.category_id, name: row.name}).then((r) => {
                        this.$message({message: '编辑成功', type: 'success'});
                        if (Number.isInteger(r)) {
                            this.table_data[scope.$index].category_id = r ;
                        }
                        this.commitCategory();
                    }).catch((e) => {
                        this.$message({message: '编辑失败：' + e, type: 'error'});
                    })
                }
            },
            addCategory() {
                if (this.selected_index === -1) {
                    this.selected_index = this.table_data.length;
                    this.edited_name = '';
                    this.table_data.push({category_id: null, name: ''});
                } else {
                    this.$message({message: '不要心急，先把现在的内容保存了', type: 'error'});
                }
            }
        },
        directives: {
            focus: {
                inserted: function (el) {
                    el.children[0].focus()
                }
            }
        },
        computed: mapState(['challenge']),
        mounted() {
            category.loadCategory(true).then(() =>{
                this.table_data = this.challenge.category;
            }).catch((e) => {
                this.$message({message: '分类数据加载失败：' + e, type: 'error'});
            });

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
</style>
