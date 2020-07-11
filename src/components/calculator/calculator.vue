<style lang="scss" scoped>
.calculator{
    max-width: 300px;
}
</style>

<template>
    <div class="calculator">
        <calculator-screen :equation="calculatorModel.equation" :result="calculatorModel.result"></calculator-screen>
        <calculator-buttons
                @solve="solveEquation"
                @addToEquation="calculatorModel.equation += $event"
                @clear="clearResult"
                @backspace="backspace"
                @square="squareRootResult"
                :equation="calculatorModel.equation">
        </calculator-buttons>
    </div>
</template>

<script>
    import CalculatorScreen from './calculator-screen';
    import CalculatorButtons from './calculator_buttons';

    export default {
        components: {
            CalculatorScreen,
            CalculatorButtons
        },
        props:[''],
        data: function(){
            return{
                calculatorModel: {
                    result: 0,
                    equation: "",
                    memory: []
                }
            }
        },
        mounted: function () {
            this.setUp();
        },
        methods: {
            setUp: function () {

            },
            /**
             * Work out the square root of the equation
             * */
            squareRootResult(){
                let vm = this;
                vm.solveEquation(); // solve the current equation
                vm.calculatorModel.result = Math.sqrt(vm.calculatorModel.result); // get the square root
            },
            /**
             * solve the equation
             * */
            solveEquation(){
                let vm = this;
                vm.calculatorModel.result = eval(vm.calculatorModel.equation);

                // If the result of an operation is greater than 9 integer digits in length, the calculator should display the letter E
                // if(vm.calculatorModel.result.length > 9){
                //     vm.calculatorModel.result = 'E';
                // }

                // If the result of an operation has more than 2 decimal digits, it should be rounded up to 2 decimal places.
            },
            /**
             * Remove the last character of the result
             * */
            backspace(){
                let vm = this;

                if(vm.calculatorModel.equation.length > 1){ // if length bigger than 1, delete char
                    vm.calculatorModel.equation = vm.calculatorModel.equation.slice(0, -1);
                }
                else{
                    vm.calculatorModel.equation = ""; // reset calculator back to empty
                }
            },
            /**
             * Clear the result on the calculator
             */
            clearResult(){
                let vm = this;
                vm.calculatorModel.equation = "";
                vm.calculatorModel.result = 0;
            }
        }
    }
</script>
