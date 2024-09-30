import produtoPage from "../pageObjects/produtoPage";

describe('Testes automatizados E2E para o desafio técnico da NTT Data', () => {
  const produto = new produtoPage();
  beforeEach(() => {
    cy.loginViaAPI(Cypress.env('login_email'), Cypress.env('login_password'))
  })

  it('Tentar cadastrar um produto sem informar os campos obrigatórios', () => {
    cy.visit('/admin/cadastrarprodutos')
    produto.clickBotaoCadastrarProduto()
    produto.scrollToTop()
    produto.verificarCamposObrigatorios()
  })

  it('Cadastrar produto com PageObjects', () => {
    cy.visit('/admin/cadastrarprodutos')    
    produto.setNomeProduto('HyperX Solocast')
    produto.setPrecoProduto('330')
    produto.setDescricaoProduto('Microfone USB fácil de usar para streamers e criadores de conteúdo.')
    produto.setQuantidadeProduto('30')
    produto.setImagemProduto('cypress/fixtures/hyperx-solocast.jpeg')
    produto.clickBotaoCadastrarProduto()
    produto.verificarCadastroSucesso()

  })

  it('Excluir produto', () => {
    cy.visit('/admin/listarprodutos')
    produto.deleteProduto()
    produto.verificarProdutoExcluido()

  })
})