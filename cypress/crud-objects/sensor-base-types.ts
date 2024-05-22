export default {
    objectSingle: 'Sensor Base Type',
    objectPlural: 'Sensor Base Types',
    link: '/sensor-base-types',
    menuId: '#Assembly',
    createBody: [
        {
            name: 'prefix',
            type: 'input',
            value: 'WAT-'
        },
        {
            name: 'suffix',
            type: 'input',
            value: '12'
        },
        {
            name: 'series',
            type: 'input',
            useEditValue: true,
            value: ''
        },
        {
            name: 'maintenance_interval_months',
            type: 'input',
            value: '1'
        },
        {
            name: 'replacement_interval_months',
            type: 'input',
            value: '1'
        },
        {
            name: 'quotation_interval_months',
            type: 'input',
            value: '1'
        },
        {
            name: 'principleId',
            type: 'select',
            value: 'Electrochemical'
        },
        {
            name: 'volume',
            type: 'input',
            value: '1'
        }
    ],
    editBody: [
        {
            name: 'series',
            type: 'input',
            value: '12345'
        }
    ],        
    editItem: '0000',
    deleteItem: '12345'
}