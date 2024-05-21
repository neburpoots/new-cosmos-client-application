
// This test file logs into the application and checks if the table contains data.
// It does this for all of the pages.

const testCases = [
    {
        name: 'Assemblies Multivers',
        link: '/assemblies-multivers',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Assembly',
    },
    {
        name: 'Assembly Types',
        link: '/assembly-types',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Assembly',
    },
    {
        name: 'Calibration gases',
        link: '/calibration-gases',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Assembly',
    },
    {
        name: 'Detectors',
        link: '/detectors',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Assembly',
    },
    {
        name: 'Sensor Test Results',
        link: '/sensor-test-results',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Assembly',
    },
    {
        name: 'Sensor Types',
        link: '/sensor-types-assembly',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Assembly',
    },
    {
        name: 'Sensor Base Types',
        link: '/sensor-base-types',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Assembly',
    },
    {
        name: 'Stock Suppliers',
        link: '/stock-suppliers',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Warehouse',
    },
    {
        name: 'Detector Types',
        link: '/detector-types',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Products',
    },
    {
        name: 'Sensor Types',
        link: '/sensor-types',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Products',
    },
    {
        name: 'Electrolytes',
        link: '/electrolytes',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Products',
    },
    {
        name: 'Membranes',
        link: '/membranes',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Products',
    },
    {
        name: 'Filters',
        link: '/filters',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Products',
    },
    {
        name: 'O-Rings',
        link: '/o-rings',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Products',
    },
    {
        name: 'Pyrolysers',
        link: '/pyrolysers',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Products',
    },
    {
        name: 'Users',
        link: '/users',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Registration',
    },
    {
        name: 'Groups',
        link: '/groups',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Registration',
    },
    {
        name: 'Sample points',
        link: '/sample-points',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Services',
    },
    {
        name: 'Applications',
        link: '/applications',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Services',
    },
    {
        name: 'Applications',
        link: '/applications',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Services',
    },
    {
        name: 'Buildings',
        link: '/buildings',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Services',
    },
    {
        name: 'Floors',
        link: '/floors',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Services',
    },
    {
        name: 'Areas',
        link: '/areas',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Services',
    },
    {
        name: 'Principles',
        link: '/principles',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Misc',
    },
    {
        name: 'Chemical compounds',
        link: '/chemical-compounds',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Misc',
    },
    {
        name: 'Gases',
        link: '/gases',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Misc',
    },
    {
        name: 'Ranges',
        link: '/ranges',
        mainTableBodyId: '#mainTableBody',
        menuId: '#Misc',
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

        it(`Login and check if ${testCase.name} has data`, () => {

            // Visit the page with the authentication form
            cy.visit('/auth/login');
      
            // cy.wait(2000);

            // Fill in the username field
            cy.get('input[name="username"]').type(loginInfo.username);
      
            // Fill in the password field
            cy.get('input[name="password"]').type(loginInfo.password);
      
            cy.get('#login-button').click(); // Select the tbody by its ID

            cy.get('form').submit();
            
            // cy.get('button[type="button"]').click();
      
            // Optionally, you can check for a successful login by asserting that
            // the URL changed or some element that is visible only after login appears
            cy.contains('Dashboard');
            
            cy.wait(200);

            cy.get(testCase.menuId).click();
      
            cy.wait(200);

            cy.get(`a[href="${testCase.link}"]`).click();
      
              // Check if tbody with ID mainTableBody contains tr elements
            cy.get('#mainTableBody') // Select the tbody by its ID
              .find('tr') // Find tr elements within tbody
              .should('have.length.gt', 0); // Assert that the length of tr elements is greater than 0
      
          });
    });
});