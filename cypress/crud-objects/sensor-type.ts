export default {
    objectSingle: 'Sensor Type',
    objectPlural: 'Sensor Types',
    link: '/sensor-types-assembly',
    menuId: '#Assembly',
    createBody: [
        {
            name: 'sensorBaseTypeId',
            type: 'select',
            value: 'GS-HA'
        },
        {
            name: 'code',
            type: 'input',
            value: '120398'
        },
        {
            name: 'model',
            type: 'input',
            useEditValue: true,
            value: ''
        },
        {
            name: 'rangeId',
            type: 'select',
            value: 'AN(0-20 ppm)'
        },
        {
            name: 'flowRate',
            type: 'input',
            value: '1'
        },
        {
            name: 'calGasId',
            type: 'select',
            value: 'IPA(1000 ppm)'
        },
        {
            name: 'flowRateMin',
            type: 'input',
            value: '22'
        },
        {
            name: 'electrolyteId',
            type: 'select',
            value: '1460-1'
        },
        {
            name: 'membraneId',
            type: 'select',
            value: 'M'
        },
        {
            name: 'oRingId',
            type: 'select',
            value: 'B'
        },
        {
            name: 'hasSiliconeSheet',
            type: 'checkbox',
            value: 'checked'
        },
        {
            name: 'pyrolyserId',
            type: 'select',
            value: '841-TD'
        },
        {
            name: 'pyrolyserVoltage',
            type: 'input',
            value: '1'
        },
        {
            name: 'filterId',
            type: 'select',
            value: 'BIC-2'
        },

        {
            name: 'hasBattery',
            type: 'checkbox',
            value: 'checked'
        },
        {
            name: 'hasRestrictor',
            type: 'checkbox',
            value: 'checked'
        },
        {
            name: 'hasMembraneSeal',
            type: 'checkbox',
            value: 'checked'
        },
        {
            name: 'elementCount',
            type: 'input',
            value: '1'
        },
        {
            name: 'maintenanceIntervalMonths',
            type: 'input',
            value: '1'
        },
        {
            name: 'replacementIntervalMonths',
            type: 'input',
            value: '1'
        },
        {
            name: 'part',
            type: 'input',
            value: '10324832'
        },
        {
            name: 'volume',
            type: 'input',
            value: '1'
        }
    ],
    editBody: [
        {
            name: 'model',
            type: 'input',
            value: '12343243'
        }
    ],        
    editItem: '12532432',
    deleteItem: '12343243'
}