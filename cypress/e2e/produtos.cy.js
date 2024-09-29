describe('Testes automatizados para o desafio técnico da NTT Data', () => {
  
  beforeEach(() => {
    cy.loginViaAPI(Cypress.env('login_email'), Cypress.env('login_password'))    
  }) 
  
  it('Tentar cadastrar um produto sem informar os campos obrigatórios', () => {
    cy.visit('https://front.serverest.dev/admin/cadastrarprodutos')
    cy.get('button[type=submit]').click()
    cy.scrollTo('top')
    cy.get('.alert').should('be.visible')
  })

  it('Cadastrar produto', () => {
    cy.visit('https://front.serverest.dev/admin/cadastrarprodutos')
    cy.get('[data-testid="nome"]').type('HyperX Solocast')
    cy.get('[data-testid="preco"]').type('330')
    cy.get('[data-testid="descricao"]').type('Microfone USB fácil de usar para streamers e criadores de conteúdo.')
    cy.get('[data-testid="quantity"]').type(30)
    cy.get('input[type=file]').selectFile('cypress/fixtures/hyperx-solocast.jpeg')
    cy.get('button[type=submit]').click()
    cy.get('tr td:nth-child(1)').should('contain', 'HyperX Solocast')
  })

  it('Excluir produto', () => {
    cy.visit('https://front.serverest.dev/admin/listarprodutos')
    cy.get('tbody > tr > td:nth-child(1)').each(($td, index, $tds) => {
      const t = $td.text();
      if(t.includes('HyperX Solocast')) {
        cy.get('tbody > tr > td:nth-child(1)')
          .eq(index).next().next().next().next().next().then(function(d) {
            const r = d.text()
            expect(r).to.contains('Excluir');
          }).click()
      }
    })
    cy.get('tr td:nth-child(1)').should('not.contain', 'HyperX Solocast')

  })
})