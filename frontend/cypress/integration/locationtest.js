describe('Test if you can find a restaurant by location', function() {
    it('Succesfully loads dashboard', function(){
      cy.viewport(1920,1080)
      cy.visit('/')
    })
    it('Clicks on the search by location', function() {
      
      cy.get('#standard-search').type("4800 Highlands").should('have.value','4800 Highlands')
      cy.get('#standard-search').then(() => {
        cy.contains('4800 Highlands').click({ force:true })
      })
      cy.url().should('include', '/RestPage?ID=')
   
      
    })
    it('Does it contain restaurants?', function() {
        cy.get('.MuiPaper-root > :nth-child(1) > .MuiTypography-root')
    })
})