describe('Test to see if can leave review', function() {
    it('Succesfully logged in', function(){
      cy.viewport(1920,1080)
      cy.visit('/')
    })

    it('Login and leave comment',function(){
    	cy.get('#navBarBtn > .MuiIconButton-label > .MuiSvgIcon-root').click()
      	cy.get('[href="/Login"] > .MuiListItemText-root > .MuiTypography-root').click()
      	cy.get('.makeStyles-drawerHeader-8 > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
        cy.get('#email').type('test@test.dk') 
        cy.get('#password').type('test')
        cy.get(':nth-child(4) > .MuiButtonBase-root').click()

    	cy.get('#navBarBtn > .MuiIconButton-label > .MuiSvgIcon-root').click()
      	cy.get(':nth-child(3) > [href="/"] > .MuiListItemText-root').click()
      	cy.get('.makeStyles-drawerHeader-8 > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
    	cy.get(':nth-child(3) > .MuiGridListTile-tile > a > .MuiGridListTileBar-root > .MuiGridListTileBar-actionIcon > .MuiButtonBase-root').click()
    	cy.url().should('include', '/RestPage?')

    	cy.get('.MuiInputBase-root').type("great food!")
    	cy.get('form > .MuiButtonBase-root').click()
    })

    it('Check if the review is there', function() {
    	cy.get('.MuiContainer-root > :nth-child(1) > .MuiPaper-root').contains("great food!")
    })
})