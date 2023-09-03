const confBuy = document.querySelector('.conf-buy')
const cart = document.querySelector('.cart')
const listaprodutosCarrinho = document.querySelector('.cart-roll')
const shoppingCartBtn = document.querySelector('.shopping-cart')
const popAdd = document.querySelector('.info-popup')



shoppingCartBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (cart.hasAttribute('active')) {
        cart.removeAttribute('active')
        shoppingCartBtn.removeAttribute('active')
    } else {
        cart.setAttribute('active', true)
        shoppingCartBtn.setAttribute('active', true)
        favBtn.removeAttribute('active')
        fav.removeAttribute('active')
    }
})

function createElement(dataproduct, index) {
    const cardBody = document.createElement('div')
    cardBody.classList.add('cart-body')
    cardBody.classList.add(`${index}`)
    cardBody.innerHTML = `<div><img src="${dataproduct.image}" alt="" class="cart-img"><div class="cart-floor"><h4>${dataproduct.title}</h4><p>${dataproduct.obs}</p><p class="cart-price">R$${dataproduct.price},00</p></div></div><button class="cart-remover-btn">Remover da sacola</button>`

    listaprodutosCarrinho.append(cardBody)
}
function preencheCarrinho() {
    const lista = req(localStorage.shoppingCart)
    if (lista === 'Nenhum Item aqui') {
        cart.setAttribute('none',true)
    }
    if (cart.hasAttribute('none')) {
        cart.innerHTML = 'O carrinho está vazio!<br> <a href="index.html">Voltar para o inicio<a>'
    } else {
        listaprodutosCarrinho.innerHTML = ''
        for (let i = 0; i < lista.length; i++) {
            const element = lista[i];
            createElement(element, i)
        }
    }
}


preencheCarrinho()
// localStorage.shoppingCart = localStorage.Data

roll.forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.classList[0] === 'buy-btn' && e.target.textContent !== 'No carrinho!') {
            const buyBtn = e.target
            if (e.target.hasAttribute('active')) {
                buyBtn.textContent = 'confirmar'
            } else {
                buyBtn.setAttribute('active', true)
                buyBtn.textContent = 'Confirmar'
            }

            if (buyBtn.textContent === 'confirmar') {
                const indexProduct = e.target.parentElement.parentElement.classList[1];
                buyBtn.innerHTML = 'No carrinho!'
                buyBtn.style = 'background-color: rgb(0, 208, 0); color: white;'

                let selectedProduct

                if (element.classList[0] === 'div-roll') {
                    selectedProduct = req(localStorage.Data)[indexProduct];
                }

                if (element.classList[0] === 'mounth-content') {
                    selectedProduct = req(localStorage.tempJunho)[indexProduct];
                }

                const shoppingCart = req(localStorage.shoppingCart)

                popAdd.removeAttribute('active')
                const time = setInterval(() => {
                    popAdd.setAttribute('active', true)
                }, 100)

                if (shoppingCart !== 'Nenhum Item aqui') {
                    shoppingCart.push(selectedProduct)
                    localStorage.shoppingCart = JSON.stringify(shoppingCart)
                    
                    preencheCarrinho()
                } else {
                    localStorage.shoppingCart = JSON.stringify([selectedProduct])
                    listaprodutosCarrinho.innerHTML = ''
                    // createElement(selectedProduct, 0)
                    preencheCarrinho()
                    window.location.href = 'index.html'
                }
                // cart.removeAttribute('none')
                // cart.innerHTML = '<h3>Carrinho</h3><div class="cart-roll"></div><a class="sacola-btn" href="finalizar-compra.html">Continuar para entrega</a>'
                
            }
        }
    });
});

listaprodutosCarrinho.addEventListener('click', (e) => {
    e.preventDefault()
    const cartList = req(localStorage.shoppingCart)
    switch (e.target.classList[0]) {
        case 'cart-remover-btn':
            const selectedCard = e.target.parentElement.classList[1];
            cartList.splice(selectedCard, 1);
            localStorage.shoppingCart = JSON.stringify(cartList)
            listaprodutosCarrinho.innerHTML = ''
            preencheCarrinho()
            preencheCard(localStorage.tempJunho, divMae2)
            preencheCard(localStorage.Data, divMae1)
            break;
    }
});
