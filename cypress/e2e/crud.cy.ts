import applications from "../crud-objects/applications";
import areas from "../crud-objects/areas";
import buildings from "../crud-objects/buildings";
import chemicalCompounds from "../crud-objects/chemical-compounds";
import floors from "../crud-objects/floors";
import gas from "../crud-objects/gas";
import principle from "../crud-objects/principle";
import ranges from "../crud-objects/ranges";
import samplePoints from "../crud-objects/sample-points";

let crudTestCases = [
    samplePoints,
    applications,
    buildings,
    floors,
    areas,
    principle,
    gas,
    ranges,
    chemicalCompounds,
]

crudTestCases.forEach(testCase => {

    describe(`${testCase.objectPlural} crud`, () => {

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

        if (testCase.createBody) {

            it(`Create ${testCase.objectSingle}`, () => {

                cy.get('#createButton').click();

                cy.wait(200);

                testCase.createBody.forEach(bodyElement => {

                    let itemValue = bodyElement.value;

                    if (bodyElement.useEditValue) {
                        itemValue = testCase.editItem;
                    }

                    if(bodyElement.type === 'checkbox') {
                        cy.get(`input[name=${bodyElement.name}]`).check({ force: true});
                        return;
                    }

                    if(bodyElement.type === 'textarea') {
                        cy.get(`#${bodyElement.name}`).type(itemValue);
                        return;
                    }

                    if(bodyElement.type === 'select') {
                        cy.get(`#${bodyElement.name}`).select(bodyElement.value)
                        return;
                    }

                    cy.get(bodyElement.type + '[name="' + bodyElement.name + '"]').type(itemValue);
                });

                cy.get('button[type="submit"]').click();

            });
        }

        if (testCase.editBody) {
            it(`Edit ${testCase.objectSingle}`, () => {

                cy.get('#globalSearch').type(testCase.editItem);

                cy.get('#mainTableBody') // Select the tbody by its ID
                .find('tr') // Find tr elements within tbody
                .should('have.length', 2) // Assert that the length of tr elements is 2 (1 row and inline create)

                cy.get('#editButton').click();

                cy.wait(200);

                testCase.editBody.forEach(bodyElement => {
                    if(bodyElement.type === 'checkbox') {
                        cy.get(`input[name=${bodyElement.name}]`).check({ force: true});
                        return;
                    }

                    if(bodyElement.type === 'select') {
                        cy.get(`#${bodyElement.name}`).select(bodyElement.value)
                        return;
                    }

                    cy.get(bodyElement.type + '[name="' + bodyElement.name + '"]').clear().type(bodyElement.value);
                });

                cy.get('button[type="submit"]').click();

            });
        }

        if (testCase.deleteItem) {
            it(`Delete ${testCase.objectSingle}`, () => {

                cy.get('#globalSearch').type(testCase.deleteItem);

                cy.get('#deleteButton').click();

                cy.wait(200);

                cy.get('#deleteButtonConfirm').click();

                cy.get('#mainTableBody') // Select the tbody by its ID
                    .should('not.exist'); // Assert that the length of tr elements is greater than 0

            });
        }
    });

});