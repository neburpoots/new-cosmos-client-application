export default {
    objectSingle: 'Area',
    objectPlural: 'Areas',
    link: '/areas',
    menuId: '#Services',
    createBody: [
        {
            name: 'endUser',
            type: 'select',
            value: 'Covestro'
        },
        {
            name: 'building',
            type: 'select',
            value: 'Gebouw 18'
        },
        {
            name: 'floor',
            type: 'select',
            value: '-'
        },
        {
            name: 'name',
            type: 'input',
            value: '',
            useEditValue: true,
        },
        {
            name: 'remarks',
            type: 'textarea',
            value: '123123'
        }
    ],
    editBody: [
        {
            name: 'name',
            type: 'input',
            value: '00000000'
        }
    ],
    editItem: '123478293423',
    deleteItem: '00000000'
}