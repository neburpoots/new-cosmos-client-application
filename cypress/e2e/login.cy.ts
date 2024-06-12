describe('Login', () => {
    it('should fill in the login form and submit', () => {
      // Visit the page with the authentication form
      cy.visit('/auth/login');

      // Fill in the username field
      cy.get('input[name="username"]').type('stoop');

      // Fill in the password field
      cy.get('input[name="password"]').type('Welkom123!');

      cy.get('#login-button').click(); // Select the tbody by its ID

      // Optionally, you can check for a successful login by asserting that
      // the URL changed or some element that is visible only after login appears
      cy.contains('Dashboard');
    });
});
  