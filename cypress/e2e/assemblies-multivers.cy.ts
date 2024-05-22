

describe(`Test Assemblies Multivers`, () => {

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

        cy.get(`#Favorites`).click();

        cy.wait(200);

        cy.get(`a[href="/assemblies-multivers"]`).click();

    })


    it(`Check Assemblies Multivers details`, () => {

        cy.get('#globalSearch').type('00001901');
        cy.wait(200);

        cy.get(`a[href="/assemblies-multivers/00001901"]`).click();


        cy.get('div.bg-white')
        .children()
        .should('have.length', 17); // Should have 10 children

    });

    it(`Download Assembly Multivers PDF`, () => {

        cy.get('#globalSearch').type('00001901');
        cy.wait(200);

        cy.get(`#pdfButton`).click();

        cy.wait(200);

        cy.readFile(`cypress/downloads/assembliesmultivers_00001901.pdf`) // GOOD

    });




});

