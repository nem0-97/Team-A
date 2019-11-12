describe('Test if create customer', function() {
    it('Succesfully loads home page', function(){
      cy.viewport(1920,1080)
      cy.visit('/')
    })
    it('Succesfully goes to customer signup page', function(){
      cy.get('#navBarBtn > .MuiIconButton-label > .MuiSvgIcon-root').click()
      cy.get('[href="/customer"] > .MuiListItemText-root > .MuiTypography-root').click()
      cy.get('.makeStyles-drawerHeader-8 > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
      cy.url().should('include', '/customer')
    })

    it('Succesfully create a user', function(){
      cy.get('#firstName').type('mk')
      cy.get('#lastName').type('mk')
      cy.get('#email').type('mk')
      cy.get('#password').type('mk')
      cy.get('#signup-button > .MuiButton-label').click()
      cy.get('#tagline').should('be.visible')  
    })

    it('Succesfully goes to customer login page', function(){
      cy.get('#navBarBtn > .MuiIconButton-label > .MuiSvgIcon-root').click()
      cy.get('[href="/Login"] > .MuiListItemText-root > .MuiTypography-root').click()
      cy.get('.makeStyles-drawerHeader-8 > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
      cy.url().should('include', '/Login')
    })

    it('Succesfully logs in', function(){
      cy.get('#email').type('mk')
      cy.get('#password').type('mk')
      cy.get(':nth-child(4) > .MuiButtonBase-root').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/')

    })
})