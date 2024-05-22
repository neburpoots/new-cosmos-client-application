

describe(`Test Sensor Test results`, () => {

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

        cy.get(`#Assembly`).click();

        cy.wait(200);

        cy.get(`a[href="/sensor-test-results"]`).click();

    })


    it(`Create Sensor test result`, () => {

        cy.get('#createButton').click();

        cy.wait(200);

        
        cy.get(`input[name="serialNumber"]`).type('22222');

        cy.get(`#N0022222`).click();

        // cy.get(`input[name="order"]`).type('123532048543');

        cy.get(`input[name="zeroResponse"]`).type('22');

        cy.get(`#fsCalGasId`).select('IPA (1000 ppm)')

        cy.get(`input[name="usedSpanConcentration"]`).type('2');

        cy.get(`input[name="spanResponse"]`).type('2');
        
        cy.get(`input[name="testDate"]`).type('2024-05-23');

        cy.get(`#userId`).select('Frank Hemmekam')

        cy.get('div.flex-row button[type="submit"]').click();
    });

    it(`Edit Sensor Test result`, () => {

        cy.get('#globalSearch').type('30133300');

        cy.get('#mainTableBody') // Select the tbody by its ID
            .find('tr') // Find tr elements within tbody
            .should('have.length', 2) // Assert that the length of tr elements is 2 (1 row and inline create)

        cy.get('#editButton').click();

        cy.wait(200);


        cy.get(`input[name="zeroResponse"]`).type('2');


        cy.get('button[type="submit"]').click();

    });

    it(`Download Sensor Test result`, () => {

        cy.get('#globalSearch').type('30133300');
        cy.wait(200);

        cy.get(`#pdfButton`).click();

        cy.wait(200);

        cy.readFile(`cypress/downloads/sensor_test_results_30133300.pdf`) // GOOD

    });

    it(`Delete Sensor Test result`, () => {

        cy.get('#globalSearch').type('30133300');

        cy.get('#mainTableBody') // Select the tbody by its ID
            .find('tr') // Find tr elements within tbody
            .should('have.length', 2) // Assert that the length of tr elements is 2 (1 row and inline create)

        cy.get('#deleteButton').click();

        cy.wait(200);

        cy.get('#deleteButtonConfirm').click();

    });
});

