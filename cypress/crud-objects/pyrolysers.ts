export default {
    objectSingle: 'Pyrolyser',
    objectPlural: 'Pyrolysers',
    link: '/pyrolysers',
    menuId: '#Products',
    createBody: [
        {
            name: 'name',
            type: 'input',
            value: '24092384'
        },
        {
            name: 'name',
            type: 'input',
            useEditValue: true,
            value: ''
        },
        {
            name: 'replacement_interval_months',
            type: 'input',
            value: '12'
        },
    ],
    editBody: [
        {
            name: 'name',
            type: 'input',
            value: '00000000'
        }
    ],        
    editItem: '12394081234',
    deleteItem: '00000000'
}