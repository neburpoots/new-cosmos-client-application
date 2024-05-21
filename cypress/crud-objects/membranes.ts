export default {
    objectSingle: 'Membrane',
    objectPlural: 'Membranes',
    link: '/membranes',
    menuId: '#Products',
    createBody: [
        {
            name: 'cdartikel',
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
        {
            name: 'quantity',
            type: 'input',
            value: '1'
        }
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