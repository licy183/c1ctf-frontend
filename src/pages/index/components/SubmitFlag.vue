<template>
    <div>
        <b-form  @submit.prevent="onSubmit">
            <b-form-row class="align-items-center">
                <b-col xs="8" sm="9" md="10">
                    <b-input placeholder="flag" v-model.trim="input_flag" required autocomplete="off"/>
                </b-col>
                <b-col xs="4" sm="3" md="2">
                    <b-button block type="submit" variant="primary">提交</b-button>
                </b-col>
            </b-form-row>
        </b-form>
    </div>
</template>

<script>
    import api from "@/util/api"
    import { ADD_SOLVED_CHALLENGE } from "@/util/store-types"
    export default {
        name: "SubmitFlag",
        data() {
            return {
                input_flag: ''
            };
        },
        methods: {
            onSubmit() {
                api.post('/submission/submit_flag', {challenge_id: this.challengeId, flag: this.input_flag}).then(
                    (r) => {
                        this.$root.$bvToast.toast('恭喜', {
                            title: '提交成功',
                            variant: 'success',
                            autoHideDelay: 1500
                        });
                        this.input_flag = '';
                        try{
                            this.$store.commit(ADD_SOLVED_CHALLENGE, r);
                        } catch (e) {
                            // empty

                        }

                    }).catch( (e) => {
                        if (e.isAxiosError !== true) {
                            this.input_flag = '';
                        }
                        this.$root.$bvToast.toast(e, {
                            title: '提交失败',
                            variant: 'danger',
                            autoHideDelay: 1500
                        });
                });
            }
        },
        props: {
            challengeId: {
                type: Number,
                default: 0
            },
        }
    }
</script>

<style scoped>

</style>
