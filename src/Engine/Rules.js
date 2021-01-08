export default class Rules {
    static RULE_LIST = [
        {
            name: 'HIGH_TEMP',
            start: 5,
            end: 5
        }, {
            name: 'IR_CAMERA',
            start: 7,
            end: 11
        }, {
            name: 'IR_CAMERA_HUE',
            start: 11,
            end: 11
        }
    ]

    static getRulesForDay(day) {
        let rulesArray = [];
        Rules.RULE_LIST.forEach(rule => {
            if (rule.start <= day && day <= rule.end) {
                rulesArray.push(rule.name);
            }
        });
        
        return rulesArray;
    }
}