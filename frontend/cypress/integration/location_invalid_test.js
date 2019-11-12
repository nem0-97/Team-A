describe('Test to see when entering invalid address, pop up occurs', function() {
    it('Succesfully loads dashboard', function(){
      cy.viewport(1920,1080)
      cy.visit('/')
    })
    
    it('Clicks on the search by location', function() {

      const stub = cy.stub()  
      cy.on ('window:alert', stub)

      cy.get('#standard-search').type("not valid").type('{enter}')
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('This is not a valid address honey')      
      })
      
    })
})