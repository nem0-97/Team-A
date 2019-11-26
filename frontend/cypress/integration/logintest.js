describe('Test login functionality', function() {
    it('Go to loginpage', function(){
      cy.viewport(1920,1080)
      cy.visit('/Login')
    })

    it('Attempt to Login',function(){
        cy.get('#loginType').select('Customer login')
        cy.get('#email').type('lg@gg.com')
        cy.get('#password').type('1234')
        cy.get(':nth-child(4) > .MuiButtonBase-root').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
        cy.getCookie('userInfo').should('exist')
    })
})