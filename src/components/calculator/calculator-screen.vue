<style lang="scss" scoped>
.calculator-screen{
    height: 130px;
    @include paddingBorderBox(15px);
    text-align: right;
    background-color: $white;

    &__result{
        font-size: 24pt;
        margin-top: 55px;

        &.reset-color{
            color: $blue;
        }
    }
}
</style>

<template>
    <section class="calculator-screen" @click="$emit('screenClicked', true)">
        <p class="calculator-screen__equation">
            <span class="calculator-screen__equation__item" v-for="(item, index) in equation" :key="index">{{item}}</span>
        </p>

        <p class="calculator-screen__result" :class="{'reset-color': resetEquation }">
            {{formatResult(result)}}
        </p>
    </section>
</template>

<script>
    export default {
        components: {},
        props: {
            result: Number,
            equation: String,
            resetEquation: Boolean
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

            },
            /**
             *  If the result of an operation is greater than 9 integer digits in length,
             *  the calculator should display the letter E
             * @param result
             * @returns {string|*}
             */
            formatResult(result){
                let parts = result.toString().split('.');
                if(parts[0].length > 9){
                    return 'E';
                }

                return result;
            }
        }
    }
</script>
