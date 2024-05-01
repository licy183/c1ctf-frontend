<template>
    <b-container fluid>
        <div class="mt-5 md-2 d-flex justify-content-center">
            <b-col xs="11" sm="9" md="6" lg="5" xl="4">
                <b-card>
                    <b-card-title class="text-dark text-center">{{ title }}</b-card-title>
                    <slot></slot>
                </b-card>
            </b-col>
        </div>
    </b-container>
</template>

<script>
    export default {
        name: "LoginCard",
        props: ['title']
    }
</script>

<style scoped>

</style>
