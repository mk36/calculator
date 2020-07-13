import { Selector } from 'testcafe';
import CalculatorHelperService from './calculatorHelperService';

let helperService = new CalculatorHelperService();

fixture `Calculator memory functionality`
    .page `http://localhost:8080/`;


// Test for calculator memory
test('Calculator should be able to store and recall a value using the view popup', async t => {
    let keyNumberOne = await helperService.getRandomNumberKey(t);
    let keyNumberTwo = await helperService.getRandomNumberKey(t);

    let numberOneStr = keyNumberOne.number.toString();
    let numberTwoStr = keyNumberTwo.number.toString();
    let concatNumbers = keyNumberOne.number.toString() + keyNumberTwo.number.toString();

    await helperService.pressKeys(t, [numberOneStr, numberTwoStr]); // press the random number keys
    await helperService.checkSelectorExists(t, '.calculator-screen__result', concatNumbers);

    await helperService.pressKeys(t, ['MS']); // save the result to memory

    // memory view button should show count
    await helperService.checkSelectorExists(t, '.memory-view-button span', '1');

    // Click the memory view button
    await helperService.pressKeys(t, ['M View']);
    await t.click(Selector('.calculator-memory__row'));

    // Equation should now have memory number added to it
    await helperService.checkSelectorExists(t, '.calculator-screen__equation', concatNumbers + concatNumbers);
});

test('Calculator should be able to store and recall a value using the MR button', async t => {
    let keyNumberOne = await helperService.getRandomNumberKey(t);
    let keyNumberTwo = await helperService.getRandomNumberKey(t);

    let numberOneStr = keyNumberOne.number.toString();
    let numberTwoStr = keyNumberTwo.number.toString();
    let concatNumbers = keyNumberOne.number.toString() + keyNumberTwo.number.toString();

    await helperService.pressKeys(t, [numberOneStr, numberTwoStr]); // press the random number keys
    await helperService.checkSelectorExists(t, '.calculator-screen__result', concatNumbers);

    await helperService.pressKeys(t, ['MS']); // save the result to memory

    // Click the memory recall button
    await helperService.pressKeys(t, ['MR']);

    // Equation should now have memory number added to it
    await helperService.checkSelectorExists(t, '.calculator-screen__equation', concatNumbers + concatNumbers);
});

test('Calculator should be able to clear all memory', async t => {
    let keyNumberOne = await helperService.getRandomNumberKey(t);

    // memory view button should be disabled
    let memoryViewBtn = await Selector('.memory-view-button');
    await t.expect(memoryViewBtn.hasClass('disabled')).ok();

    await t.click(keyNumberOne.calcKey); // click a number key
    await helperService.pressKeys(t, ['MS']); // save the result to memory
    await t.expect(memoryViewBtn.hasClass('disabled')).notOk(); // view should be enabled
    await helperService.checkSelectorExists(t, '.memory-view-button span', '1'); // memory view button should show count

    await helperService.pressKeys(t, ['MC']); // clear memory
    await t.expect(memoryViewBtn.hasClass('disabled')).ok(); // view should be disabled
    await t.expect(Selector('.memory-view-button span').textContent).eql('0', 'memory count is empty');
});
