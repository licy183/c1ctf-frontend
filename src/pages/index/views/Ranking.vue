<template>
    <b-container class="mt-3">
        <b-row class="mt-3 d-flex justify-content-center" >
            <b-col md="12" >
                <match-timer/>

                <b-card class="mt-3">
                    <line-chart ref="chart" :styles="{height: '300px', position: 'relative'}" :chartdata="chartData" :options="chartOptions"/>
                </b-card>

                <b-card class="mt-3" no-body>
                    <b-form-group class="m-1">
                        <b-form-radio-group class="float-right" v-model="student_only" @change="loadRanking" buttons button-variant="outline-primary" :disabled="loading">
                            <b-form-radio :value="false">全员</b-form-radio>
                            <b-form-radio :value="true">校内</b-form-radio>
                        </b-form-radio-group>
                    </b-form-group>
                    <b-table :busy="loading" table-class="border-bottom" :per-page="page_size"
                             :current-page="current_page" :items="items" :fields="fields">
                        <template v-slot:table-busy>
                            <div class="text-center text-primary my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Loading...</strong>
                            </div>
                        </template>
                    </b-table>

<!--                    <b-pagination v-model="current_page" :total-rows="total_pages" :per-page="page_size"-->
<!--                                  align="center"></b-pagination>-->
                </b-card>
            </b-col>
<!--            <b-col md="4" class="mt-3">-->
<!--            </b-col>-->
        </b-row>
    </b-container>
</template>

<script>
    import api from '@/util/api'
    import MatchTimer from "@/pages/index/components/MatchTimer";
    import LineChart from "@/pages/index/components/Chart"

    export default {
        name: "Index",
        components: {MatchTimer, LineChart},
        data() {
            return {
                colors: ['#E74C3C', '#7D3C98', '#2E86C1', '#138D75'
                    , '#28B463', '#F1C40F', '#CA6F1E', '#E59866',
                    '#196F3D', '#34495E'],
                chartData: {
                    datasets: [
                        {
                            // label: "xnianq",
                            // data: [{
                            //     x: new Date("Wed Oct 30 2019 21:09:39 GMT+0800 (中国标准时间)"), y: 996
                            // }, {
                            //     x: new Date("Wed Oct 30 2019 22:09:39 GMT+0800 (中国标准时间)"), y: 1996
                            // }],
                            // fill: true,
                            // borderColor: '#E74C3C'
                        },
                    ]
                },
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    elements: {
                        line: {
                            tension: 0 // disables bezier curves
                        }
                    },
                    scales: {
                        xAxes: [{
                            type: "time",
                            time: {
                                tooltipFormat: 'YYYY-MM-DD HH:mm',
                                displayFormats: {
                                    millisecond: 'HH:mm:ss',
                                    second: 'HH:mm:ss',
                                    minute: 'HH:mm',
                                    hour: 'HH'
                                }
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: '得分'
                            },
                            ticks: {
                                suggestedMin: 0,
                            }
                        }]
                    },
                    legend:{
                        position: 'bottom',
                        labels:{
                            usePointStyle: true,

                        }
                    }
                },
                current_page: 1,
                page_size: 30,
                fields: [
                    {
                        key: 'rank',
                        label: '名次',
                        sortable: false,
                    },
                    {
                        key: 'username',
                        label: '用户名',
                        sortable: false,
                    },
                    {
                        key: 'score',
                        label: '得分',
                        sortable: false,
                    }],
                items: [
                    // { rank:0, username: '正在加载，请稍后', score: 0 },

                ],
                loading: true,
                student_only: false,
            }
        },
        computed: {
            total_pages() {
                return this.items.length;
            }
        },
        methods: {
            loadRanking() {
                this.loading = true;
                api.get(this.student_only ? '/rank/get_student_ranking_list' : '/rank/get_ranking_list').then(r => {
                    // this.total_pages = r.total_pages;
                    let items = [];
                    // let rank = (this.current_page - 1) * this.page_size + 1;
                    let rank = 1;
                    for (let user of r) {
                        items.push({rank: rank, username: user.username, score: user.score});
                        rank++;
                    }
                    this.items = items;
                    this.loading = false;
                });
                api.get(this.student_only ? '/rank/get_student_ranking_chart' : '/rank/get_ranking_chart').then(r => {
                    this.chartData.datasets = [];
                    for (let rank in r) {
                        let points = [];
                        for (let p of r[rank].points) {
                            points.push({
                                x: new Date(p.x),
                                y: p.y,
                            });
                        }
                        this.chartData.datasets.push({
                            label: r[rank].username,
                            data: points,
                            fill: false,
                            borderColor: this.colors[parseInt(rank)],
                            backgroundColor: this.colors[parseInt(rank)]

                        });

                    }
                    this.$refs.chart.updateChart();

                });


            }
        },
        mounted() {
            this.loadRanking();
        },
    }
</script>

<style scoped>
    .border-bottom {
        border-bottom: 0 !important;
        margin-bottom: 0;
    }

</style>
