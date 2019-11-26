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
      cy.get('#standard-search').type('5000n Park')
      cy.contains("West 5000N Road").click()
      cy.get('#city').type('testing')
      cy.get('#zipCode').type('00000')
      cy.get('#openTime').type('09:00')
      cy.get('#closeTime').type('09:00')
      cy.get('#next').click()

      cy.get('#firstName').type('testing')
      cy.get('#lastName').type('testing')
      cy.get('#email').type('testing@testing.com')
      cy.get('#password').type('testing')

      cy.get('#next').click()

      cy.get('#create').click()

    })

    it('Succesfully sees restaurant in dashboard', function() {
      cy.get('#navBarBtn > .MuiIconButton-label > .MuiSvgIcon-root').click()
      cy.get(':nth-child(3) > [href="/"] > .MuiListItemText-root').click()
      cy.get('.makeStyles-drawerHeader-8 > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
      cy.get('.App > :nth-child(2) > :nth-child(1)').contains('testing')
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
})