describe('Testes automatizados para o desafio técnico da NTT Data', () => {
  
  beforeEach(() => {
    cy.loginViaAPI(Cypress.env('login_email'), Cypress.env('login_password'))    
  }) 
  
  
  
  it('passes', () => {
    cy.visit('https://front.serverest.dev/admin/home')
  })
})