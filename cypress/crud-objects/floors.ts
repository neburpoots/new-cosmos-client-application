export default {
    objectSingle: 'Floor',
    objectPlural: 'Floors',
    link: '/floors',
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
            name: 'name',
            type: 'input',
            value: '',
            useEditValue: true,
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