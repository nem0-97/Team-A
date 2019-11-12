describe('Enter a nonexistent user', function() {
    it('Succesfully loads dashboard', function(){
      cy.viewport(1920,1080)
      cy.visit('/')
    })

    it('Succesfully goes to login page', function(){
      cy.get('#navBarBtn > .MuiIconButton-label > .MuiSvgIcon-root').click()
      cy.get('[href="/Login"] > .MuiListItemText-root > .MuiTypography-root').click()
      cy.get('.makeStyles-drawerHeader-8 > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
      cy.url().should('include', '/Login')
    })

    it('Login in with invalid information', function() {

      const stub = cy.stub()  
      cy.on ('window:alert', stub)

      cy.get('#email').type("not valid")
      cy.get('#password').type('not valid')
      cy.get(':nth-child(4) > .MuiButtonBase-root').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Incorrect login information')      
      })
      
    })
})