describe('Test if you can find a restaurant by location', function() {
    it('Succesfully loads dashboard', function(){
      cy.viewport(1920,1080)
      cy.visit('/')
    })

    it('Clicks on the search by name', function() {
      cy.get('input[type=text]').type("Sushi").should('have.value','Sushi')
      cy.get('button[type=button]').get("#search").click()
      cy.url().should('include', '/RestNameSearch?restName=')
    })

    it('Does it contain restaurants?', function() {
        cy.get('.MuiGridList-root > :nth-child(1)')
    })
})