<style lang="scss" scoped>
.calculator__buttons{
    @include flex(100%, flex, left, start);

    .calculator-button{
        width: 50px;
        height: 50px;
        padding: 0;
        margin: 0;
    }

    &__group{
        @include flex(auto, flex, left, unset);
        flex-wrap: wrap;
        &.is-vertical{
            flex-direction: column;
        }
    }
}
</style>

<template>
    <section class="calculator__buttons">

        <section class="calculator__buttons__group">

            <button v-for="(num, index) in 10" :key="index" class="calculator-button" @click="addToEquation(index)">{{index}}</button>

            <button class="calculator-button" @click="addToEquation('.')">.</button>
            <button class="calculator-button" @click="$emit('backspace')">Backspace</button>
            <button class="calculator-button" @click="$emit('clear')">Clear</button>
        </section>

        <section class="calculator__buttons__group is-vertical">
            <button class="calculator-button" @click="manageMemory('recall')">MR</button>
            <button class="calculator-button" @click="manageMemory('clear')">MC</button>
            <button class="calculator-button" @click="manageMemory('add')">M+</button>
            <button class="calculator-button" @click="manageMemory('remove')">M-</button>

            <button class="calculator-button" @click="addToEquation(Math.PI)">pie</button>
            <button class="calculator-button" @click="$emit('square')">square root</button>
        </section>


        <section class="calculator__buttons__group is-vertical">
            <button class="calculator-button" @click="addToEquation('/')">/</button>
            <button class="calculator-button" @click="addToEquation('*')">x</button>
            <button class="calculator-button" @click="addToEquation('-')">-</button>
            <button class="calculator-button" @click="addToEquation('+')">+</button>
            <button class="calculator-button" :class="{'disabled': !canPressSumKey}" @click="$emit('solve')">=</button>
        </section>
    </section>
</template>

<script>
    import MemoryManagement from "./services/memoryManagement";
    import EquationService from "./services/equationService";
    export default {
        components: {},
        props:{
            equation: String
        },
        data: function(){
            return{
                memoryManagement: new MemoryManagement(),
                equationService: new EquationService()
            }
        },
        mounted: function () {
            this.setUp();
        },
        methods: {
            setUp: function () {

            },
            addToEquation(key){
                let vm = this;

                // check if the key can be added to equation
                if(vm.equationService.canAddToEquation(vm.equation, key)){
                    vm.$emit('addToEquation', key);
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
            },
            manageMemory(type){
                let vm = this;
                let newMemory = []; // new memory to update

                if(type === 'clear'){
                    console.log('clear');
                }
                else if (type === 'add'){
                    console.log('add');
                }
                else if (type === 'remove'){
                    console.log('remove');
                }
                else if (type === 'recall'){
                    console.log('recall');
                }

                vm.$emit('updateMemory', newMemory);
            }

        }
    }
</script>
