export default {
    objectSingle: 'Calibration Gas',
    objectPlural: 'Calibration Gases',
    link: '/calibration-gases',
    menuId: '#Assembly',
    createBody: [
        {
            name: 'gas',
            type: 'select',
            value: '3MS'
        },
        {
            name: 'concentration',
            type: 'input',
            value: '12',
        },
        {
            name: 'engineering_units',
            type: 'input',
            value: 'ppm',
        },
        {
            name: 'cdartikel',
            type: 'input',
            value: '999999',
            useEditValue: true,
        },
    ],
    editBody: [
        {
            name: 'cdartikel',
            type: 'input',
            value: '00000000'
        }
    ],
    editItem: '999999',
    deleteItem: '00000000'
}