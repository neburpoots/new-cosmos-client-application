
// This test file logs into the application and checks if the table contains data.
// It does this for all of the pages.

const testCases = [
    {
        name: 'Assemblies Multivers',
        link: '/assemblies-multivers',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Assembly',
        exportName: 'assemblies_multivers',
        filterTest: {
            expectedType: 'exact',
            expectedResults: 2, //amount of lines expected to get back.
            body: [
                {
                    name: 'Date',
                    type: 'Exact date',
                    value: '2023-12-21',
                }
            ]
        }
    },
    {
        name: 'Assembly Types',
        link: '/assembly-types',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Assembly',
        exportName: 'assembly_types',
        filterTest: {
            expectedType: 'higher',
            expectedResults: 4, //amount of lines expected to get back.
            body: [
                {
                    name: 'Created',
                    type: 'Before this date',
                    value: '2023-12-21',
                },
                {
                    name: 'Name',
                    type: 'Contains',
                    value: 'power'
                }
            ]
        }
    },
    {
        name: 'Calibration gases',
        link: '/calibration-gases',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Assembly',
        exportName: 'calibration_gases'
    },
    {
        name: 'Detectors',
        link: '/detectors',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Assembly',
        exportName: 'detectors'
    },
    {
        name: 'Sensor Test Results',
        link: '/sensor-test-results',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Assembly',
        exportName: 'sensor_test_results'
    },
    {
        name: 'Sensor Types Assembly',
        link: '/sensor-types-assembly',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Assembly',
        exportName: 'sensor_types_assembly'
    },
    {
        name: 'Sensor Base Types',
        link: '/sensor-base-types',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Assembly',
        exportName: 'sensor_base_types'
    },
    {
        name: 'Stock Suppliers',
        link: '/stock-suppliers',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Warehouse',
        exportName: 'stock_suppliers'
    },
    {
        name: 'Detector Types',
        link: '/detector-types',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Products',
        exportName: 'detector_types'
    },
    {
        name: 'Sensor Types',
        link: '/sensor-types',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Products',
        exportName: 'sensor_types'
    },
    {
        name: 'Electrolytes',
        link: '/electrolytes',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Products',
        exportName: 'electrolytes'
    },
    {
        name: 'Membranes',
        link: '/membranes',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Products',
        exportName: 'membranes'
    },
    {
        name: 'Filters',
        link: '/filters',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Products',
        exportName: 'filters'
    },
    {
        name: 'O-Rings',
        link: '/o-rings',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Products',
        exportName: 'o-rings'
    },
    {
        name: 'Pyrolysers',
        link: '/pyrolysers',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Products',
        exportName: 'pyrolysers'
    },
    {
        name: 'Users',
        link: '/users',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Registration',
        exportName: 'users'
    },
    {
        name: 'Groups',
        link: '/groups',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Registration',
        exportName: 'groups'
    },
    {
        name: 'Sample points',
        link: '/sample-points',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Services',
        exportName: 'sample_points'
    },
    {
        name: 'Applications',
        link: '/applications',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Services',
        exportName: 'applications'
    },
    {
        name: 'Buildings',
        link: '/buildings',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Services',
        exportName: 'buildings'
    },
    {
        name: 'Floors',
        link: '/floors',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Services',
        exportName: 'floors'
    },
    {
        name: 'Areas',
        link: '/areas',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Services',
        exportName: 'areas'
    },
    {
        name: 'Principles',
        link: '/principles',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Misc',
        exportName: 'principles'
    },
    {
        name: 'Chemical compounds',
        link: '/chemical-compounds',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Misc',
        exportName: 'chemical_compounds'
    },
    {
        name: 'Gases',
        link: '/gases',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Misc',
        exportName: 'gases'
    },
    {
        name: 'Ranges',
        link: '/ranges',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Misc',
        exportName: 'ranges'
    },
    // Add more test cases as needed
];

const loginInfo = {
    loginUrl: '/auth/login',
    username: 'stoop',
    password: 'Welkom123!',
}

testCases.forEach(testCase => {

    describe(testCase.name, () => {

        beforeEach(() => {
            // Login before all tests
            // Visit the page with the authentication form
            cy.visit('/auth/login');

            // cy.wait(2000);

            // Fill in the username field
            cy.get('input[name="username"]').type('stoop');

            // Fill in the password field
            cy.get('input[name="password"]').type('Welkom123!');

            cy.get('#login-button').click(); // Select the tbody by its ID

            cy.get('form').submit();

            cy.contains('Dashboard');

            cy.wait(200);

            cy.get(`${testCase.menuId}`).click();

            cy.wait(200);

            cy.get(`a[href="${testCase.link}"]`).click();

        })

        it(`Check if ${testCase.name} has data`, () => {

            // Check if tbody with ID mainTableBody contains tr elements
            cy.get('#mainTableBody') // Select the tbody by its ID
                .find('tr') // Find tr elements within tbody
                .should('have.length.gt', 0); // Assert that the length of tr elements is greater than 0

        });


        if (testCase.exportName) {
            it(`Export ${testCase.name} to CSV`, () => {

                // Check if tbody with ID mainTableBody contains tr elements
                cy.get('#mainTableBody') // Select the tbody by its ID
                    .find('tr') // Find tr elements within tbody
                    .should('have.length.gt', 0); // Assert that the length of tr elements is greater than 0

                cy.get('#exportButton').click();

                cy.wait(200);

                cy.get('#exportCSV').click();

                cy.get('#nextStep').click();

                cy.get('#nextStep').click();

                cy.get('#nextStep').click();

                cy.get('#paginated').click();

                cy.get('#downloadExport').click();


                cy.wait(200);

                cy.readFile(`cypress/downloads/${testCase.exportName}_export.csv`) // GOOD
            });

            it(`Export ${testCase.name} to Excel`, () => {

                // Check if tbody with ID mainTableBody contains tr elements
                cy.get('#mainTableBody') // Select the tbody by its ID
                    .find('tr') // Find tr elements within tbody
                    .should('have.length.gt', 0); // Assert that the length of tr elements is greater than 0

                cy.get('#exportButton').click();

                cy.wait(200);

                cy.get('#exportExcel').click();

                cy.get('#nextStep').click();

                cy.get('#nextStep').click();

                cy.get('#nextStep').click();

                cy.get('#paginated').click();

                cy.get('#downloadExport').click();

                cy.wait(200);

                cy.readFile(`cypress/downloads/${testCase.exportName}_export.xlsx`) // GOOD
            });

        }

        if (testCase.filterTest) {

            it(`Test Filters for ${testCase.name}`, () => {

                // Check if tbody with ID mainTableBody contains tr elements
                cy.get('#mainTableBody') // Select the tbody by its ID
                    .find('tr') // Find tr elements within tbody
                    .should('have.length.gt', 0); // Assert that the length of tr elements is greater than 0

                cy.get('#filterButton').click();

                cy.wait(200);

                testCase.filterTest.body.forEach((bodyElement, index) => {
                    cy.get(`#filter-name-${index}`).select(bodyElement.name);

                    cy.get(`#filter-type-${index}`).select(bodyElement.type);

                    cy.get(`#filter-value-${index}`).type(bodyElement.value);

                    if(testCase.filterTest.body.length !== index + 1) {
                        cy.get('#addFilterButton').click();
                    }

                })

                cy.get('#applyFiltersButton').click();

                cy.wait(200);

                if (testCase.filterTest.expectedType === 'exact') {
                    cy.get('#mainTableBody') // Select the tbody by its ID
                        .find('tr') // Find tr elements within tbody
                        .should('have.length', testCase.filterTest.expectedResults + 1); // Expected result
                } else if (testCase.filterTest.expectedType === 'lower') {
                    cy.get('#mainTableBody') // Select the tbody by its ID
                        .find('tr') // Find tr elements within tbody
                        .should('have.length.lte', testCase.filterTest.expectedResults + 1); // Expected result
                } else {
                    cy.get('#mainTableBody') // Select the tbody by its ID
                        .find('tr') // Find tr elements within tbody
                        .should('have.length.gte', testCase.filterTest.expectedResults + 1); // Expected result
                }
            })
        }


    });
});