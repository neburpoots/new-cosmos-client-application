export default {
    objectSingle: 'Range',
    objectPlural: 'Ranges',
    link: '/ranges',
    menuId: '#Misc',
    createBody: [
        {
            name: 'gas',
            type: 'select',
            value: '3MS'
        },
        {
            name: 'lowEu',
            type: 'input',
            value: '0.50'
        },
        {
            name: 'highEu',
            type: 'input',
            value: '4'
        },
        {
            name: 'engineeringUnits',
            type: 'input',
            value: '',
            useEditValue: true
        },
        {
            name: 'alarm1Level',
            type: 'input',
            value: '23'
        },
        {
            name: 'alarm1DirectionUp',
            type: 'checkbox',
            value: 'checked'
        },
        {
            name: 'alarm2Level',
            type: 'input',
            value: '44'
        },
        {
            name: 'alarm2DirectionUp',
            type: 'checkbox',
            value: 'checked'
        },
        {
            name: 'warning1Level',
            type: 'input',
            value: '44'
        },
        {
            name: 'warning2Level',
            type: 'input',
            value: '44'
        },
        {
            name: 'alarmUnits',
            type: 'checkbox',
            value: 'checked'
        },
        {
            name: 'precision',
            type: 'input',
            value: '1000'
        },
    ],
    editBody: [
        {
            name: 'gas',
            type: 'select',
            value: '4MS'
        },
    ],
    editItem: '0000',
    deleteItem: '0000'
}