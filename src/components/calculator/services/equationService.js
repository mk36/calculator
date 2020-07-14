export default class EquationService{

    /**
     * Check if a key can be added to an equation
     * @param equation
     * @param key
     * @returns {boolean}
     */
    canAddToEquation(equation, key){
        let vm = this;
        let lastChar = vm.getLastStringCharacter(equation);
        let isLastCharNumber = vm.isNumberKey(parseInt(lastChar));

        if(vm.isNumberKey(key)){ // can add if it's a number key
            if(key.toString() === '0' && lastChar.toString() === '0'){ // don't allow 2 zeros together
                return false;
            }

            // maximum display of 9 whole number digits and 2 decimal place digits i.e. 123456789.00
            if(isLastCharNumber){
                return vm.isEquationDigitLengthValid(equation);
            }

            return true;
        }
        else if(vm.isDotKey(key)){  // only add if number doesn't have a decimal in already

            if(vm.isOperationKey(lastChar) || vm.isDotKey(lastChar) || !isLastCharNumber){ // if last character was operation or decimal cannot add
                return false;
            }

            return vm.canAddDecimalToEquation(equation);
        }
        else if(vm.isOperationKey(key) && isLastCharNumber){ // only add if last character in string was a number
            return true;
        }

        return false;
    }

    /**
     * Check if the equation number can add an extra digit or not
     * @param equation
     * @returns {boolean}
     */
    isEquationDigitLengthValid(equation){
        let vm = this;
        let maxDigits = 9;
        let maxDecimal = 2;

        let equationParts = vm.splitEquationIntoParts(equation); // get the equation parts
        let lastNumber = equationParts[equationParts.length - 1]; // always a number due to previous checks
        let lastNumberParts = lastNumber.split('.');
        let isDecimal = lastNumber.includes('.');

        if(isDecimal){
            return !(lastNumberParts[1].length >= maxDecimal);
        }
        else{ // if not a decimal
            if(lastNumberParts[0].length >= maxDigits){ // max digits reached can't add another
                return false;
            }
        }

        return true;
    }

    /**
     * get the last character of the equation;
     * @param string
     * @returns {string}
     */
    getLastStringCharacter(string){
        return string.substring(string.length - 1, string.length);
    }

    /**
     * check if a key is a number key
     * @param key
     * @returns {number}
     */
    isNumberKey(key){
        return Number.isInteger(key);
    }

    /**
     * check if a key is a dot key
     * @param key
     * @returns {boolean}
     */
    isDotKey(key){
        return key === '.';
    }

    /**
     * Check if a key is an operation key
     * @param key
     * @returns {boolean}
     */
    isOperationKey(key){
        return key === '/' || key === '*' || key === '+' || key === '-';
    }

    /**
     * Check if a dot can be added to the current equation
     * @param equation
     * @returns {boolean}
     */
    canAddDecimalToEquation(equation){
        let vm = this;

        if(equation.includes('.')){ // if the equation has a decimal in it
            let equationParts = vm.splitEquationIntoParts(equation);
            let lastEquationPart = equationParts[equationParts.length - 1];

            if(lastEquationPart.includes('.')){ // if the last number contains a decimal, can't add another
                return false;
            }
        }

        return true;
    }

    /**
     * Get the equation in usable parts for solving it
     * @param equation
     * @returns {[]}
     */
    splitEquationIntoParts(equation){
        let vm = this;
        let parts = [];
        let curNumber = ''; // a build up of a number

        for(let i = 0; i < equation.length; i++){
            let key = equation[i]; // character in equation (a key pressed)

            if(vm.isOperationKey(key)){ // if it's an operation, add to parts
                if(curNumber.length > 0){
                    parts.push(curNumber); // add the current number as it is finished do to an operation key
                    curNumber = ''; // reset current number as it's finished
                }

                parts.push(key);
            }
            else if(vm.isNumberKey(parseInt(key)) || vm.isDotKey(key)){ // add to the current number string
                curNumber += key;
            }
        }

        if(curNumber.length > 0){ // add the final number if any is left being built
            parts.push(curNumber);
        }

        return parts;
    }
}
