describe('Test ordering spot functionality', function() {
    it('Go to homepage', function(){
      cy.viewport(1920,1080)
      cy.visit('/')
    })
    it('Go to restaurant with spots',function(){
        cy.get(':nth-child(3) > .MuiGridListTile-tile > a > .MuiGridListTileBar-root > .MuiGridListTileBar-actionIcon > .MuiButtonBase-root').click()
        cy.url().should('contain','/RestPage?ID')
    })  
    it('Order a spot',function(){
        cy.get('.MuiList-root > :nth-child(1) > .MuiButtonBase-root > .MuiButton-label').click()
        cy.url().should('contain','/Checkout')
    })
    it('Purchase a spot',function(){
        cy.get('#firstName').type('mk')
        cy.get('#lastName').type('mk')
        cy.get('#email').type('test@test.com')
        cy.get('#card').type('0000000000')
        cy.get('#month').type('04')
        cy.get('#year').type('1995')
        cy.get('#cvv').type('000')
        cy.get('#signup-button > .MuiButton-label').click()
        cy.url().should('contain','/')
    }) 
  
  })