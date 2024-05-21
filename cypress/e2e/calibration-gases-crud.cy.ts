
describe('Calibration gases crud', () => {

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

        cy.get('#Assembly').click();

        cy.wait(200);

        cy.get(`a[href="/calibration-gases"]`).click();

    })

    it(`Create calibration gas`, () => {

        cy.get('#createButton').click();

        cy.wait(200);

        cy.get('#gas').select('3MS').should('have.value', '224')

        cy.get('input[name="concentration"]').type('200');

        cy.get('input[name="engineering_units"]').type('ppm');

        cy.get('input[name="cdartikel"]').type('000000');

        cy.get('button[type="submit"]').click();

    });

    it(`Edit calibration gas`, () => {

        cy.get('#globalSearch').type('000000');

        cy.get('#editButton').click();

        cy.wait(200);

        cy.get('#gas').select('4MS').should('have.value', '225')

        cy.get('input[name="concentration"]').clear().type('500');

        cy.get('button[type="submit"]').click();

    });


    it(`Delete calibration gas`, () => {

        cy.get('#globalSearch').type('000000');

        cy.get('#deleteButton').click();

        cy.wait(200);

        cy.get('#deleteButtonConfirm').click();


        cy.get('#mainTableBody') // Select the tbody by its ID
        .should('not.exist'); // Assert that the length of tr elements is greater than 0

    });
});
