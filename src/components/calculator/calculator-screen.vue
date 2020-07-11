<style lang="scss" scoped>
.calculator-screen{
    &__equation{
        &__item{

        }
    }

    &__result{

    }
}
</style>

<template>
    <section class="calculator-screen">
        <p class="calculator-screen__equation">
            <span class="calculator-screen__equation__item" v-for="(item, index) in equation" :key="index">
                {{item}}
            </span>
        </p>

        <p class="calculator-screen__result">
            {{result}}
        </p>
    </section>
</template>

<script>
    export default {
        components: {},
        props: {
            result: Number,
            equation: String,
        },
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
