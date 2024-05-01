<template>
    <b-container>
        <b-row>
            <b-col offset-md="2" md="8">
                <b-card class="mt-3">
                    <submit-flag class="mt-2 mb-2"/>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import SubmitFlag from "@/pages/index/components/SubmitFlag";
    export default {
        name: "Submit",
        components: {SubmitFlag}
    }
</script>

<style scoped>

</style>
