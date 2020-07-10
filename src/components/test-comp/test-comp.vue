<style lang="scss">

</style>

<template>
    <div>
        <p>test comp!!!</p>
    </div>
</template>

<script>
    export default {
        components: {},
        props:[''],
        data: function(){
            return{
                test: ''
            }
        },
        mounted: function () {
            this.setUp();
        },
        methods: {
            setUp: function () {

            }
        }
    }
</script>