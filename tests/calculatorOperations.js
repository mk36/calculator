import { Selector } from 'testcafe';
let faker = require('faker');
import CalculatorHelperService from './calculatorHelperService';

let helperService = new CalculatorHelperService();

fixture `Calculator App Operation Functionality`
    .page `http://localhost:8080/`;

test('Calculator App Exists', async t => {
    await helperService.checkSelectorExists(t, '.calculator-app');
});

// Calculator must be capable of basic arithmetic operations - addition, subtraction, division, multiplication.
test('Calculator must be capable of addition', async t => {
    let keyNumberOne = await helperService.getRandomNumberKey(t);
    let keyNumberTwo = await helperService.getRandomNumberKey(t);
    let keyAdd = await Selector('.calculator-button').withText('+');
    let total = keyNumberOne.number + keyNumberTwo.number;

    await t.click(keyNumberOne.calcKey)
        .click(keyAdd)
        .click(keyNumberTwo.calcKey);

    await helperService.checkSelectorExists(t, '.calculator-screen__result', total.toString());
});

test('Calculator must be capable of subtraction', async t => {
    let keyNumberOne = await helperService.getRandomNumberKey(t);
    let keyNumberTwo = await helperService.getRandomNumberKey(t);
    let keySubtract = await Selector('.calculator-button').withText('-');
    let total = keyNumberOne.number - keyNumberTwo.number;

    await t.click(keyNumberOne.calcKey)
        .click(keySubtract)
        .click(keyNumberTwo.calcKey);

    await helperService.checkSelectorExists(t, '.calculator-screen__result', total.toString());
});

test('Calculator must be capable of multiplication', async t => {
    let keyNumberOne = await helperService.getRandomNumberKey(t);
    let keyNumberTwo = await helperService.getRandomNumberKey(t);
    let keyMultiply = await Selector('.calculator-button').withText('x');
    let total = keyNumberOne.number * keyNumberTwo.number;

    await t.click(keyNumberOne.calcKey)
        .click(keyMultiply)
        .click(keyNumberTwo.calcKey);

    await helperService.checkSelectorExists(t, '.calculator-screen__result', total.toString());
});

test('Calculator must be capable of division', async t => {
    let keyNumberOne = await helperService.getRandomNumberKey(t);
    let keyNumberTwo = await helperService.getRandomNumberKey(t);
    let keyDivide = await Selector('.calculator-button').withText('/');
    let total = keyNumberOne.number / keyNumberTwo.number;

    if(total.toString().includes('.')){ // if result is a decimal round it up to meet validation
        total = total.toFixed(2);
    }

    await t.click(keyNumberOne.calcKey)
        .click(keyDivide)
        .click(keyNumberTwo.calcKey);

    await helperService.checkSelectorExists(t, '.calculator-screen__result', total.toString());
});

// If the result of an operation is greater than 9 integer digits in length, the calculator should display the letter E
test('Calculator should show letter E if result is greater than 9 integers in length', async t => {

    // calculate 999999*9999 (result is above 9 integers in length)
    await helperService.pressKeys(t, ['9', '9', '9', '9', '9', '9', 'x', '9', '9', '9', '9']);
    await helperService.checkSelectorExists(t, '.calculator-screen__result', 'E'); // result should be E
});

// If the result of an operation has more than 2 decimal digits, it should be rounded to 2 decimal places
test('Calculator should round decimal if result is more than 2 decimal digits', async t => {

    // calculate 0.95 * 3.78 (result is 3.591)
    await helperService.pressKeys(t, ['0', '.', '9', '5', 'x', '3', '.', '7', '8']);
    await helperService.checkSelectorExists(t, '.calculator-screen__result', '3.59'); // result should be 3.59
});

test('Calculator backspace button should remove one char from equation on click', async t => {
    await helperService.pressKeys(t, ['3','6','8']);
    await helperService.checkSelectorExists(t, '.calculator-screen__result', '368');
    await t.click(Selector('.calculator-button .fa-backspace'));
    await helperService.checkSelectorExists(t, '.calculator-screen__result', '36');
    await t.click(Selector('.calculator-button .fa-backspace'));
    await helperService.checkSelectorExists(t, '.calculator-screen__result', '3');
    await t.click(Selector('.calculator-button .fa-backspace'));
    await helperService.checkSelectorExists(t, '.calculator-screen__result', '0');
});

//Calculator should provide functionality to display the constant PI and, determine the square root of the currently displayed number.
test('Calculator should display pie for the result of an equation', async t => {
    await helperService.pressKeys(t, ['3']); //
    await t.click(Selector('.pi-button'));
    await helperService.checkSelectorExists(t, '.calculator-screen__result', '9.42');
});

test('Calculator should display square root for the result of an equation', async t => {
    await helperService.pressKeys(t, ['7','x','7']); // 49 square root is 7
    await t.click(Selector('.sqrt-button'));
    await helperService.checkSelectorExists(t, '.calculator-screen__result', '7');
});

test('Calculator clear button should set the display to 0', async t => {
    let randomNo = faker.random.number({'min': 3, 'max': 9});
    let resultNum = '';

    for(let i = 1; i <= randomNo; i++){
        resultNum += i;
        await helperService.pressKeys(t, i.toString());
    }

    let result = await Selector('.calculator-screen__result');
    await t.expect(result.textContent).contains(resultNum);

    await t.click(Selector('.calculator-button').withText('Clear'));
    await helperService.checkSelectorExists(t, '.calculator-screen__result', '0'); // should show total
});
