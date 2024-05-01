<script>
    import { Line, mixins } from 'vue-chartjs'

    export default {
        extends: Line,
        mixins: [mixins.reactiveData],
        props: {
            chartdata: {
                type: Object,
                default: null
            },
            options: {
                type: Object,
                default: null
            }
        },
        methods:{
            updateChart() {
                this.renderChart(this.chartdata, this.options);
            }
        },
        mounted () {
        }
    }
</script>
