export default {
    objectSingle: 'Building',
    objectPlural: 'Buildings',
    link: '/buildings',
    menuId: '#Services',
    createBody: [
        {
            name: 'endUser',
            type: 'select',
            value: 'Covestro'
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