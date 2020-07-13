<style lang="scss" scoped>
    .calculator{
        position: relative;
        max-width: $calculator-width;
        box-shadow: 5px 5px 20px rgba(0,0,0,0.5);
        overflow: hidden;
        border-radius: 2%;
        background-color: $greyWhite;
    }
</style>

<template>
    <div class="calculator">
        <calculator-screen @screenClicked="viewMemoryPanel(false)" :resetEquation="resetEquation" :equation="calculatorModel.equation" :result="calculatorModel.result"></calculator-screen>
        <calculator-buttons
                @solve="solveEquation(true)"
                @addToEquation="addToEquation($event.value, $event.solve)"
                @clear="clearResult"
                @backspace="backspace"
                @square="squareRootResult"
                @pi="piResult"
                @manageMemory="manageMemory($event)"
                :equation="calculatorModel.equation"
                :memory="calculatorModel.memory"
                :result="calculatorModel.result"
        >
        </calculator-buttons>

        <calculator-memory @viewMemoryPanel="viewMemoryPanel($event)" :open="showMemoryPanel" :memory="calculatorModel.memory" @addMemoryToEquation="addMemoryToEquation($event)"></calculator-memory>
    </div>
</template>

<script>
    import CalculatorScreen from './calculator-screen';
    import CalculatorButtons from './calculator-buttons';
    import CalculatorMemory from './calculator-memory';

    export default {
        components: {
            CalculatorScreen,
            CalculatorButtons,
            CalculatorMemory
        },
        props:[''],
        data: function(){
            return{
                calculatorModel: {
                    result: 0,
                    equation: "",
                    memory: []
                },
                showMemoryPanel: false,
                resetEquation: false
            }
        },
        mounted: function () {
            this.setUp();
        },
        methods: {
            setUp: function () {

            },
            addToEquation(key, solve){
                let vm = this;

                vm.checkEquationReset();

                vm.calculatorModel.equation += key;

                if(solve){
                    vm.solveEquation();
                }
            },
            checkEquationReset(){
                let vm = this;

                if(vm.resetEquation){
                    vm.calculatorModel.result = 0;
                    vm.calculatorModel.equation = '';
                    vm.resetEquation = false;
                }
            },
            piResult(){
                let vm = this;
                vm.calculatorModel.result = parseFloat((Math.PI * vm.calculatorModel.result).toFixed(2)); // times pie by the result
            },
            /**
             * Work out the square root of the equation
             * */
            squareRootResult(){
                let vm = this;
                vm.calculatorModel.result = parseFloat(Math.sqrt(vm.calculatorModel.result).toFixed(2)); // get the square root
            },
            /**
             * solve the equation
             * */
            solveEquation(resetEquation = false){
                let vm = this;
                let solution = eval(vm.calculatorModel.equation); // get the solution
                let parts = solution.toString().split('.'); // split the solution into parts to get only decimals (if any)

                // If the result of an operation has more than 2 decimal digits, it should be rounded to 2 decimal places.
                if(parts.length > 1 && parts[1].length > 2){
                    solution = parseFloat(solution.toFixed(2));
                }

                vm.calculatorModel.result = solution; // update the result
                vm.resetEquation = resetEquation;
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
                    vm.clearResult() // reset calculator back to empty
                }
            },
            /**
             * Clear the result on the calculator
             */
            clearResult(){
                let vm = this;
                vm.calculatorModel.equation = "";
                vm.calculatorModel.result = 0;
            },
            manageMemory(type){
                let vm = this;

                if(type === 'clear'){
                    vm.calculatorModel.memory = [];  // set memory to an empty array
                }
                else if (type === 'add'){
                    vm.calculatorModel.memory.push(vm.calculatorModel.result);
                }
                else if (type === 'view'){
                    vm.viewMemoryPanel(true);
                }
                else if (type === 'recall'){
                    let length = vm.calculatorModel.memory.length;
                    if(length > 0){
                        vm.calculatorModel.equation += vm.calculatorModel.memory[length -1];
                        vm.solveEquation();
                    }
                }
            },
            addMemoryToEquation(item){
                let vm = this;

                vm.calculatorModel.equation += item;
                vm.viewMemoryPanel(false);
            },
            /**
             * hide the memory panel
             * @param value
             */
            viewMemoryPanel(value){
                this.showMemoryPanel = value;
            }
        }
    }
</script>
