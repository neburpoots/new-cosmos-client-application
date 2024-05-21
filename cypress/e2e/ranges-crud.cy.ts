
let object = {
    objectSingle: 'Principle',
    objectPlural: 'Principles',
    link: '/principles',
    menuId: '#Misc',
}

describe(`${object.objectPlural} crud`, () => {

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

        cy.get('#Misc').click();

        cy.wait(200);

        cy.get(`a[href="${object.link}"]`).click();

    })

    it(`Create ${object.objectSingle}`, () => {

        cy.get('#createButton').click();

        cy.wait(200);


        cy.get('input[name="name"]').type('12394081234');


        cy.get('button[type="submit"]').click();

    });

    it(`Edit ${object.objectSingle}`, () => {

        cy.get('#globalSearch').type('12394081234');

        cy.get('#editButton').click();

        cy.wait(200);

        cy.get('input[name="name"]').clear().type('00000000');

        cy.get('button[type="submit"]').click();

    });


    it(`Delete ${object.objectSingle}`, () => {

        cy.get('#globalSearch').type('00000000');

        cy.get('#deleteButton').click();

        cy.wait(200);

        cy.get('#deleteButtonConfirm').click();


        cy.get('#mainTableBody') // Select the tbody by its ID
        .should('not.exist'); // Assert that the length of tr elements is greater than 0

    });
});
