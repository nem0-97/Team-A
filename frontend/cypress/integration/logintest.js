describe('Test login functionality', function() {
    it('Go to loginpage', function(){
      cy.viewport(1920,1080)
      cy.visit('/Login')
    })
    it('Attempt to Login',function(){
        cy.get('#loginType').select('Restaurant login')
        cy.get('#email').type('test@test.dk')
        cy.get('#password').type('1234')
        cy.get(':nth-child(4) > .MuiButtonBase-root').click()
    })
    it('Redirect',function(){
        cy.url().should('contain','http://localhost:3001/RestaurantView?id=5dc36c3946833108b7f64ad8')
    })
    it('Detect Cookie',function(){
        cy.getCookie('userInfo').should('exist')

    })
  
  })