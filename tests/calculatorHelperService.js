let faker = require('faker');
import { Selector } from 'testcafe';

export default class CalculatorHelperService {

    /**
     * Check an element with text exists
     * @param t
     * @param selector
     * @param text
     * @returns {Promise<void>}
     */
    async checkSelectorExists(t, selector, text = false){
        let element = null;

        if(text){
            element = Selector(selector).withText(text).exists;
        }
        else{
            element = Selector(selector).exists;
        }

        await t.expect(element).ok();
    }

    /**
     * get a random number key
     * @param t
     * @returns {Promise<{number: *, calcKey: *}>}
     */
    async getRandomNumberKey(t){
        let randomNo = faker.random.number({'min': 0, 'max': 9});
        let key = await Selector('.calculator-button').withText(randomNo.toString());

        return {calcKey : key, number: randomNo}
    }

    /**
     * press keys on the calculator
     * @param t
     * @param keys
     * @returns {Promise<void>}
     */
    async pressKeys(t, keys){
        for(let i = 0; i < keys.length; i++){
            await t.click(await Selector('.calculator-button').withText(keys[i]));
        }
    }
}
