describe('Test to see when entering nonexisting restaurant, no restaurants there', function() {
    it('Succesfully loads dashboard', function(){
      cy.viewport(1920,1080)
      cy.visit('/')
    })
    it('Clicks on the search by name', function() {
      
      cy.get('input[type=text]').type("hello").should('have.value','hello')
      cy.get('button[type=button]').get("#search").click()
      cy.url().should('include', '/RestNameSearch?restName=')
   
      
    })
    it('Does it contain restaurants?', function() {
        cy.get('.MuiGridList-root > :nth-child(1)').should('not.exist')
    })
})