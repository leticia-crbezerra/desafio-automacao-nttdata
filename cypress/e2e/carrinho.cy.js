let authToken;

describe('Testes automatizados de API para o desafio técnico da NTT Data', () => {
    before(() => {
        cy.request({
            method: 'POST', 
            url: 'https://serverest.dev/login',
            body: {
                "email": Cypress.env('login_email'),
                "password": Cypress.env('login_password')
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Login realizado com sucesso");
            expect(response.body.authorization).to.not.be.null;
            authToken = response.body.authorization;
        });
        cy.log(authToken);
    }) 

    it('Deve validar senha incorreta', () => {
        cy.request({
            method: 'POST', 
            url: 'https://serverest.dev/login',
            body: {
                "email": Cypress.env('login_email'),
                "password": Cypress.env('login_wrong_password')
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.message).to.eq("Email e/ou senha inválidos")
        });
    })
    
    it('Cadastrar carrinho', () => {
        cy.request({
            method: 'POST', 
            url: 'https://serverest.dev/carrinhos',
            failOnStatusCode: false,
            headers: {
                Authorization : `${authToken}`
            },
            body: {
                "produtos": [
                    {
                        "idProduto": "xDldIkmCg6ZZgEfJ",
                        "quantidade": 1
                    },
                    {
                        "idProduto": "tjQzSu78H26PzNNY",
                        "quantidade": 3
                    }
                ]
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq("Cadastro realizado com sucesso");
            expect(response.body._id).to.not.be.null;
        });
    }) 

    it('Listar carrinho atribuído ao usuário logado', () => {
        cy.request("GET", "https://serverest.dev/carrinhos")
        .then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body)
        })
    })
    
    it('Excluir um carrinho', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://serverest.dev/carrinhos/cancelar-compra',
            failOnStatusCode: false,
            headers: {
                Authorization : `${authToken}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('Registro excluído com sucesso. Estoque dos produtos reabastecido')
        })
    }) 
})