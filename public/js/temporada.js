const divMae1 = document.querySelector('.div-roll')
const divMae2 = document.querySelector('.mounth-content')
const roll = document.querySelectorAll('.roll')
const divLoadModal = document.querySelector('.modal-obs')


function loadModal() {
    divLoadModal.innerHTML = '<div class="load-div"><div class="load"></div></div>'
    divLoadModal.setAttribute('load',true)
}

function geraCard(dataproduct, index, divMae) {

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    cardBody.classList.add(`${index}`)
    // const buyBtn = document.querySelector('.buy-btn')
    // const favBtn = document.querySelector('.fav-btn')
    const favList = req(localStorage.Fav)
    const lista = req(localStorage.shoppingCart)

    let favActive
    for (let i = 0; i < favList.length; i++) {
        const element = favList[i];
        if (dataproduct.title === element.title) { 
            // favBtn.children[0].setAttribute('active', true)
            favActive = 'active="true"'
        }
    }

    let buyActive
    let buyText = 'Adicionar ao carrinho'
    for (let i = 0; i < lista.length; i++) {
        const element = lista[i];
        if (dataproduct.title === element.title) {
            cardBody.setAttribute('active',true)
            incart = 'incart="true"'
            buyActive = 'active="true"'
            buyText = 'No carrinho!'
        }
    }

    cardBody.innerHTML = `<div class="card-top">
    <img src="${dataproduct.image}" alt="">
</div>
<div class="card-floor">
    <h4>${dataproduct.title}</h4>
    <p>${dataproduct.obs}</p>
    <p class="price-prod">R$${dataproduct.price},00</p>
</div>
<div class="div-buy">
    <button class="buy-btn" ${buyActive}>${buyText}</button>
</div>
<button class="fav-btn">
    <svg ${favActive} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:serif="http://www.serif.com/" width="40px" height="40px" viewBox="0 0 64 64" version="1.1"
        xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
        <rect id="Icons" x="0" y="-256" width="250px" height="250px" style="fill:none;" />
        <g id="Icons1" serif:id="Icons">
            <g id="Strike" />
            <g id="H1" />
            <g id="H2" />
            <g id="H3" />
            <g id="list-ul" />
            <g id="hamburger-1" />
            <g id="hamburger-2" />
            <g id="list-ol" />
            <g id="list-task" />
            <g id="trash" />
            <g id="vertical-menu" />
            <g id="horizontal-menu" />
            <g id="sidebar-2" />
            <g id="Pen" />
            <g id="Pen1" serif:id="Pen" "/>
            <g id="clock" />
            <g id="external-link" />
            <g id="hr" />
            <g id="info" />
            <g id="warning" />
            <g id="plus-circle" />
            <g id="minus-circle" />
            <g id="vue" />
            <g id="cog" />
            <g id="logo" />
            <path
                d="M43.201,9.05c5.137,0.117 9.855,3.451 11.782,8.485c2.391,6.249 0.678,13.452 -2.495,19.624c-3.793,7.375 -10.791,12.703 -17.967,17.288c0,0 -2.796,1.351 -5.515,-0.403c-9.246,-6.021 -17.878,-13.963 -20.319,-24.82c-1.856,-8.258 1.162,-18.596 10.582,-20.034c4.721,-0.721 11.109,2.766 12.809,5.869c1.657,-3.095 6.565,-5.884 10.693,-6.008c0.215,-0.002 0.215,-0.003 0.43,-0.001Zm-0.345,4c-5.376,0.161 -9.147,5.813 -10.778,10.382c-0.469,-1.314 -0.547,-1.46 -0.837,-2.109c-0.213,-0.475 -0.441,-0.944 -0.686,-1.404c-2.768,-5.203 -9.656,-9.851 -15.327,-4.491c-5.945,5.618 -2.904,17.477 3.22,24.628c3.825,4.467 8.614,8.029 13.63,11.204c6.568,-4.158 13.216,-8.901 16.708,-15.645c3.642,-7.035 5.85,-16.548 -1.033,-21.12c-0.613,-0.408 -1.278,-0.739 -1.974,-0.98c-0.949,-0.329 -1.596,-0.481 -2.923,-0.465Z"
                style="fill-rule:nonzero;" />
            <g id="eye-slash" />
            <g id="eye" />
            <g id="toggle-off" />
            <g id="shredder" />
            <g id="spinner--loading--dots-" serif:id="spinner [loading, dots]" />
            <g id="react" />
        </g>
    </svg>
    </button>`
    divMae.append(cardBody)
};

// localStorage.shoppingCart = localStorage.Data
// localStorage.Data = localStorage.shoppingCart
function req(local) {
    const ListaProdutos = JSON.parse(local)
    if (ListaProdutos[0] !== undefined) {
        return ListaProdutos
    }
    if (ListaProdutos[0] === undefined) {
        return 'Nenhum Item aqui'
    }
}

function preencheCard(local, divMae) {
    const lista = req(local)
    divMae.innerHTML = ''
    for (let i = 0; i < lista.length; i++) {
        const element = lista[i];
        geraCard(element, i, divMae)
    }
};

preencheCard(localStorage.Data, divMae1)
preencheCard(localStorage.tempJunho, divMae2)

const lista = [(JSON.parse(localStorage.Data)[3]), (JSON.parse(localStorage.Data)[5]), (JSON.parse(localStorage.Data)[6]), (JSON.parse(localStorage.Data)[7])]
localStorage.tempJunho = JSON.stringify(lista)

const sect = document.querySelector('.temp-prod')

sect.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.classList[0] === 'ver-btn') {
        const target = e.target
        switch (target.classList[1]) {
            case 'ver-btn1':
                if (divMae1.hasAttribute('active')) {
                    divMae1.removeAttribute('active')
                    divMae1.scroll(0,0)
                    target.removeAttribute('active')
                } else {
                    divMae1.setAttribute('active', true)
                    target.setAttribute('active',true)
                }
                break
            case 'ver-btn2':
                if (divMae2.hasAttribute('active')) {
                    divMae2.removeAttribute('active')
                    divMae2.scroll(0,0)
                    target.removeAttribute('active')
                } else {
                    divMae2.setAttribute('active', true)
                    target.setAttribute('active',true)
                }
                break
        }
    }
})