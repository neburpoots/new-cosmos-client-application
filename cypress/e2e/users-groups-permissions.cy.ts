

describe(`Test Groups, Users and Permissions`, () => {

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

        cy.contains('Dashboard');

        cy.wait(200);

    })


    it(`Create Group`, () => {

        cy.get(`#Registration`).click();

        cy.wait(200);

        cy.get(`a[href="/groups"]`).click();

        cy.get('#createButton').click();

        cy.wait(200);

        cy.get(`input[name="name"]`).type('TestGroup');

        cy.get(`#write_permission`).select('users')
        // cy.get(`#read_permission`).select('groups')
        cy.get(`#read_permission`).select('users')
        cy.get(`#write_permission`).select('groups')

        cy.get('button[type="submit"]').click();

    });

    it(`Edit Group`, () => {

        cy.get(`#Registration`).click();

        cy.wait(200);

        cy.get(`a[href="/groups"]`).click();

        cy.get('#globalSearch').type('TestGroup');

        cy.get('#mainTableBody') // Select the tbody by its ID
            .find('tr') // Find tr elements within tbody
            .should('have.length', 2) // Assert that the length of tr elements is 2 (1 row and inline create)

        cy.get('#editButton').click();

        cy.wait(200);

        cy.get(`input[name="name"]`).clear().type('TestGroup123');


        cy.get('button[type="submit"]').click();

    });

    it(`Add user`, () => {

        cy.get(`#Registration`).click();

        cy.wait(200);

        cy.get(`a[href="/users"]`).click();

        cy.get('#createButton').click();

        cy.get(`#group`).select('TestGroup123')

        cy.get('input[name="fullname"]').type('Test Name');

        cy.get('input[name="username"]').type('test');

        cy.get('input[name="initials"]').type('TN');

        // Fill in the password field
        cy.get('input[name="password"]').type('Test123!');
        cy.get('input[name="confirmPassword"]').type('Test123!');

        cy.get('button[type="submit"]').click();

    });

    it(`Edit User`, () => {

        cy.get(`#Registration`).click();

        cy.wait(200);

        cy.get(`a[href="/users"]`).click();

        cy.get('#globalSearch').type('Test Name');

        cy.get('#mainTableBody') // Select the tbody by its ID
            .find('tr') // Find tr elements within tbody
            .should('have.length', 2) // Assert that the length of tr elements is 2 (1 row and inline create)

        cy.get('#editButton').click();

        cy.wait(200);

        cy.get('input[name="fullname"]').type(' 123');

        cy.get('button[type="submit"]').click();

    });

    it(`Logout as all permissions user and login as New User`, () => {

        cy.get('#logout').click();

        cy.wait(200);

        cy.get('input[name="username"]').type('test');

        // Fill in the password field
        cy.get('input[name="password"]').type('Test123!');

        cy.get('#login-button').click(); // Select the tbody by its ID

        cy.get('form').submit();

        cy.contains('Dashboard');

        cy.wait(200);

        cy.get(`#Registration`).click();

        cy.wait(200);

        //make sure that the user has the correct permissions to access this page
        cy.get(`a[href="/users"]`).click();

        cy.get(`a[href="/groups"]`).click();
    });

    it(`Delete User`, () => {

        cy.get(`#Registration`).click();

        cy.wait(200);

        cy.get(`a[href="/users"]`).click();

        cy.get('#globalSearch').type('Test Name 123');

        cy.get('#mainTableBody') // Select the tbody by its ID
            .find('tr') // Find tr elements within tbody
            .should('have.length', 2) // Assert that the length of tr elements is 2 (1 row and inline create)

        cy.get('#deleteButton').click();

        cy.wait(200);

        cy.get('#deleteButtonConfirm').click();

    });

    it(`Delete Group`, () => {

        cy.get(`#Registration`).click();

        cy.wait(200);

        cy.get(`a[href="/groups"]`).click();

        cy.get('#globalSearch').type('TestGroup123');

        cy.get('#mainTableBody') // Select the tbody by its ID
            .find('tr') // Find tr elements within tbody
            .should('have.length', 2) // Assert that the length of tr elements is 2 (1 row and inline create)

        cy.get('#deleteButton').click();

        cy.wait(200);

        cy.get('#deleteButtonConfirm').click();

    });
});

