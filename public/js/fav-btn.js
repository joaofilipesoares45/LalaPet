const favBtn = document.querySelector('.fav-div');
const fav = document.querySelector('.fav')
const favRoll = document.querySelector('.fav-roll')
const main = document.querySelector('.temp-prod')
const favLenght = document.querySelector('.fav-lenght')


function preencheFav() {
    const lista = req(localStorage.Fav)
    if (lista !== 'Nenhum Item aqui') {
        favRoll.innerHTML = ''
        favRoll.removeAttribute('nd')

        for (let i = 0; i < lista.length; i++) {
            const element = lista[i];
            const card = document.createElement('div')
            card.classList.add(`fav-card`)
            card.classList.add(i)
            card.setAttribute('name', `${element.title}`)
            card.innerHTML = `<div class="card-top-fav"><img src="${element.image}" alt=""></div><hr><div class="card-bottom-fav"><h4>${element.title}</h4><p>${element.obs}</p><hr><p class="price-fav">R$${element.price},00</p></div><button class="add-cart-btn">Adicionar ao carrinho</button>`
            favRoll.append(card)
        }
    } else {
        favRoll.innerHTML = '<h3>Nenhum item marcado como favorito</h3><p>Volte ao inicio para conferir nossos produtos!<p>'
        favRoll.setAttribute('nd', true)
    }
}
preencheFav()
function lenFav() {
    const favList = req(localStorage.Fav)
    if (favList.length != 16) {
        favLenght.innerText = favList.length
        favLenght.style = 'visibility: visible;'
    } else {
        favLenght.innerText = 0
        favLenght.style = 'visibility: hidden;'
    }
     
    favLenght.removeAttribute('active')
    const time = setInterval(() => {
        favLenght.setAttribute('active', true)

    }, 100)

}
lenFav()

roll.forEach(element => {
    element.addEventListener('click', (e) => {
        const favList = req(localStorage.Fav)
        if (e.target.tagName === 'svg') {
            const index = e.target.parentElement.parentElement.classList[1]
            const selectProduct = req(localStorage.Data)[index];

            if (favList !== 'Nenhum Item aqui') {
                if (e.target.hasAttribute('active')) {
                    e.target.removeAttribute('active');
                    favList.forEach(element => {
                        if (element.title === selectProduct.title) {
                            favList.splice(favList.indexOf(element), 1)
                        }
                    });
                } else {
                    e.target.setAttribute('active', true)
                    favList.push(selectProduct)
                }
                localStorage.Fav = JSON.stringify(favList)
            } else {
                if (e.target.hasAttribute('active')) {
                    e.target.removeAttribute('active')
                } else {
                    e.target.setAttribute('active', true)
                }
                localStorage.Fav = JSON.stringify([selectProduct])
            }
            if (favList.length != 16) {
                favLenght.innerText = favList.length
            } else {
                favLenght.innerText = 1
            }
            preencheFav()
            lenFav()
        }
    })
});

favBtn.addEventListener('click', (e) => {
    if (fav.hasAttribute('active')) {
        fav.removeAttribute('active')
        favBtn.removeAttribute('active')
    } else {
        fav.setAttribute('active', true)
        favBtn.setAttribute('active', true)
        shoppingCartBtn.removeAttribute('active')
        cart.removeAttribute('active')
    }
})

const optDiv = document.querySelector('.opt-div');

favRoll.addEventListener('click', (e) => {
    const listaCart = req(localStorage.shoppingCart);
    const listaFav = req(localStorage.Fav)

    if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Adicionar ao carrinho') {
        const addCartBtn = e.target
        const card = addCartBtn.parentElement
        const index = addCartBtn.parentElement.classList[1];
        const nameCard = card.getAttribute('name')
        if (listaCart !== 'Nenhum Item aqui') {
            if (listaCart.includes(listaFav[index])) {

            } else {
                listaCart.push(req(localStorage.Fav)[index])
                localStorage.shoppingCart = JSON.stringify(listaCart);
                listaFav.splice(index, 1)
                localStorage.Fav = JSON.stringify(listaFav)
            }

        } else {
            localStorage.shoppingCart = JSON.stringify([req(localStorage.Fav)[index]])
            listaFav.splice(index, 1)
            localStorage.Fav = JSON.stringify(listaFav)
        }
        preencheCard(localStorage.tempJunho, divMae2)
        preencheCard(localStorage.Data, divMae1)
        preencheCarrinho()
        preencheFav()
        lenFav()
        popAdd.removeAttribute('active')
        const time = setInterval(() => {
            popAdd.setAttribute('active', true)

        }, 100)
    }
})


