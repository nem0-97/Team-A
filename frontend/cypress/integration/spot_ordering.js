describe('Test ordering spot functionality', function() {
    it('Go to homepage', function(){
      cy.viewport(1920,1080)
      cy.visit('/')
    })
    it('Go to restaurant with spots',function(){
        cy.get(':nth-child(7) > .MuiGridListTile-tile > a > .MuiGridListTileBar-root').click()
        cy.get(':nth-child(7) > .MuiGridListTile-tile > a > .MuiGridListTileBar-root > .MuiGridListTileBar-actionIcon > .MuiButtonBase-root').click()
        cy.url().should('contain','http://localhost:3001/RestPage?ID=5dc36c3946833108b7f64ad8')
    })  
    it('Order a spot',function(){
        cy.get('.MuiList-root > :nth-child(1) > .MuiButtonBase-root > .MuiButton-label').click()
        cy.url().should('contain','http://localhost:3001/Checkout?id=5dcf0de0f54e463a2e26fb75')
    })
    it('Purchase a spot',function(){
        cy.get('#firstName').type('mk')
        cy.get('#lastName').type('mk')
        cy.get('#email').type('mk')
        cy.get('#card').type('mk')
        cy.get('#month').type('mk')
        cy.get('#year').type('mk')
        cy.get('#cvv').type('mk')
        cy.get('#signup-button > .MuiButton-label').click()
        cy.url().should('contain','/')
    }) 
  
  })