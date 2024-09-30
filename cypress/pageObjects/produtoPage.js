class produtoPage {
    setNomeProduto(nomeProduto) { cy.get('[data-testid="nome"]').type(nomeProduto); }
    setPrecoProduto(precoProduto) { cy.get('[data-testid="preco"]').type(precoProduto); }
    setDescricaoProduto(descricaoProduto) { cy.get('[data-testid="descricao"]').type(descricaoProduto); }
    setQuantidadeProduto(quantidadeProduto) { cy.get('[data-testid="quantity"]').type(quantidadeProduto); }
    setImagemProduto(imagemProduto) { cy.get('input[type=file]').selectFile(imagemProduto); }
    clickBotaoCadastrarProduto() { cy.get('button[type=submit]').click(); }
    verificarCadastroSucesso() { cy.get('tr td:nth-child(1)').should('contain', 'HyperX Solocast'); }
    scrollToTop() { cy.scrollTo('top'); }
    verificarCamposObrigatorios() { cy.get('.alert').should('be.visible'); }
    deleteProduto() {
        cy.get('tbody > tr > td:nth-child(1)').each(($td, index, $tds) => {
            const t = $td.text();
            if (t.includes('HyperX Solocast')) {
                cy.get('tbody > tr > td:nth-child(1)')
                    .eq(index).next().next().next().next().next().then(function (d) {
                        const r = d.text()
                        expect(r).to.contains('Excluir');
                    }).click()
            }
        })
    }

    verificarProdutoExcluido() { cy.get('tr td:nth-child(1)').should('not.contain', 'HyperX Solocast'); }
}

export default produtoPage;