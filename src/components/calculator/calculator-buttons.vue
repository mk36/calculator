<style lang="scss" scoped>
.calculator__buttons{
    @include flex(100%, flex, left, start);
    flex-wrap: wrap;

    .calculator-button{
        width: 25%;
        height: 50px;
        padding: 0;
        margin: 0;
        background-color: $teal;
        color: $white;
        border: solid 1px white;

        &.memory-view-button{
            position: relative;
            span{
                @include positioningOffset(absolute, 2px, 8px, unset, unset);
                font-size: 8pt;
            }
        }
    }

    .operator-buttons{
        order: 1;
        flex-basis: 25%;
        flex-direction: column;

        button{
            background-color: $blue;
            width: 100%;
        }
    }

    .function-buttons{
        flex-basis: 75%;

        button{
            background-color: $black-dark;
            width: 33.333333%;
        }
    }
}
</style>

<template>
    <section class="calculator__buttons">
        <button class="calculator-button" :class="{'disabled': memory.length < 1}" @click="$emit('manageMemory','recall')">MR</button>
        <button class="calculator-button" :class="{'disabled': memory.length < 1}" @click="$emit('manageMemory','clear')">MC</button>
        <button class="calculator-button" @click="$emit('manageMemory','add')">MS</button>
        <button class="calculator-button memory-view-button" :class="{'disabled': memory.length < 1}" @click="$emit('manageMemory','view')">
            <span v-show="memory.length > 0">{{memory.length}}</span>
            M View
        </button>

        <div class="operator-buttons">
            <button class="calculator-button" @click="addToEquation('/')">/</button>
            <button class="calculator-button" @click="addToEquation('*')">x</button>
            <button class="calculator-button" @click="addToEquation('-')">-</button>
            <button class="calculator-button" @click="addToEquation('+')">+</button>
            <button class="calculator-button" :class="{'disabled': !canPressSumKey()}" @click="$emit('solve')">=</button>
        </div>

        <div class="function-buttons">
            <button v-for="(num, index) in numPad" :key="index" class="calculator-button" @click="addToEquation(num, true);">{{num}}</button>

            <button class="calculator-button" @click="addToEquation('.')">.</button>
            <button class="calculator-button" @click="$emit('backspace')"><i class="fas fa-backspace"></i></button>
            <button class="calculator-button" @click="$emit('clear')">Clear</button>

            <button class="calculator-button pi-button" @click="$emit('pi')">&#8508;</button>
            <button class="calculator-button sqrt-button" @click="$emit('square')">&#8730;</button>
        </div>

     </section>
</template>

<script>
    import EquationService from "./services/equationService";
    export default {
        components: {},
        props:{
            equation: String,
            result: Number,
            memory: Array
        },
        data: function(){
            return{
                numPad: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0],
                equationService: new EquationService()
            }
        },
        mounted: function () {
            this.setUp();
        },
        methods: {
            setUp: function () {

            },
            /**
             * Add to the equation
             * */
            addToEquation(key, solve = false){
                let vm = this;

                // check if the key can be added to equation
                if(vm.equationService.canAddToEquation(vm.equation, key)){
                    vm.$emit('addToEquation', {value: key, solve: solve});
                }
            },
            /**
             * check if the sum key can be pressed
             * @returns {number}
             */
            canPressSumKey(){
                let vm = this;

                let lastChar = vm.equationService.getLastStringCharacter(vm.equation);
                return parseInt(lastChar);
            }

        }
    }
</script>
