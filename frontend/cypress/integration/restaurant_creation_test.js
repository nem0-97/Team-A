describe('Test if create restaurant and shows up in All Restaurants dashboard', function() {
    it('Succesfully loads home page', function(){
      cy.viewport(1920,1080)
      cy.visit('/')
    })

    it('Succesfully goes to restaurant signup page', function(){
      cy.get('#navBarBtn > .MuiIconButton-label > .MuiSvgIcon-root').click()
      cy.get('[href="/Restaurant"] > .MuiListItemText-root > .MuiTypography-root').click()
      cy.get('.makeStyles-drawerHeader-8 > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
      cy.url().should('include', '/Restaurant')
    })

    it('Succesfully create a restaurant', function(){
      cy.get('#restName').type('testing')
      cy.get('#city').type('mk')
      cy.get('#zipCode').type('mk')
      cy.get('.makeStyles-buttons-312 > .MuiButtonBase-root').click()

      cy.get('#firstName').type('testing')
      cy.get('#lastName').type('testing')
      cy.get('#email').type('testing')
      cy.get('#password').type('testing')

      cy.get('.makeStyles-buttons-312 > .MuiButtonBase-root').click()

      cy.get('.makeStyles-buttons-312 > .MuiButtonBase-root').click()
      cy.wait(3000);
      //cy.url().should('eq', Cypress.config().baseUrl + '/')
    // TODO(@mannat): check to see added to database?

    })

    // TODO(@mannat): check to see it shows up in dashboard
    it('Succesfully sees restaurant in dashboard', function(){
     // this.skip()
      cy.get('#navBarBtn > .MuiIconButton-label > .MuiSvgIcon-root').click()
      cy.get(':nth-child(3) > [href="/"]').click()
      cy.get('.makeStyles-drawerHeader-8 > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/')

      // see database updated, and how many restaurants there are, then check to see its visible in frontend
      // cy.get('.MuiPaper-root:last-child' > .MuiGridListTile-tile > a > .MuiGridListTileBar-root > .MuiGridListTileBar-titleWrap > .MuiGridListTileBar-title).should('eq', 'testing')
    })
})