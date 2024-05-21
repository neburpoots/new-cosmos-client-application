export default {
    objectSingle: 'Detector Type',
    objectPlural: 'Detector Types',
    link: '/detector-types',
    menuId: '#Products',
    createBody: [
        {
            name: 'prefix',
            type: 'input',
            value: 'WAT-'
        },
        {
            name: 'code',
            type: 'input',
            useEditValue: true,
            value: ''
        },
        {
            name: 'suffix',
            type: 'input',
            value: '12'
        },
        {
            name: 'sensor_count',
            type: 'input',
            value: '1'
        }
    ],
    editBody: [
        {
            name: 'code',
            type: 'input',
            value: '12345'
        }
    ],        
    editItem: '0000',
    deleteItem: '12345'
}