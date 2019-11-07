describe('Test if you can find a restaurant by location', function() {
    it('Succesfully loads dashboard', function(){
      cy.viewport(1920,1080)
      cy.visit('/')
    })
    it('Clicks on the search by location', function() {
      
      cy.get('#standard-search').type("619n 4th Street").should('have.value','619n 4th Street')
      cy.contains('619 North 4th Street').click()
      cy.url().should('include', '/RestSearch?lat=')
   
      
    })
    it('Does it contain restaurants?', function() {
        cy.get('.MuiGridList-root > :nth-child(1)')
      })
  })