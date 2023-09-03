const prodModal = document.querySelector(".modal-obs")
let data
function getnewList() {
    let newList = req(localStorage.shoppingCart)
    return newList
}
roll.forEach(element => {
    element.addEventListener('click', (e) => {
        if (e.target.classList[0] === 'card-body') {

            const card = e.target;
            getnewList()
            let incart = ['', 'Adicionar ao carrinho']
            if (card.hasAttribute('active')) {
                incart = ['incart="true"', 'No carrinho']
            }
            prodModal.innerHTML = ''
            const index = card.classList[1];
            const dataProduct = req(localStorage.Data)[index];
            data = dataProduct
            
            prodModal.setAttribute('active', true)
            prodModal.innerHTML = `<div class="select-prod-modal">
            <div class="prod-body">
                <div class="prod-img">
                    <img src="${dataProduct.image}" alt="">
                    <div class="fav-btn-prod">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            xmlns:serif="http://www.serif.com/" width="40px" height="40px" viewBox="0 0 64 64" version="1.1"
                            xml:space="preserve"
                            style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
                                <g id="Pen1" serif:id="Pen" />
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
                    </div>
                </div>
                <div class="prod-data">
                    <h3>${dataProduct.title}</h3>
                    <p>${dataProduct.obs}</p>
                    <hr>
                    <p class="price">R$${dataProduct.price},00</p>
                    <button class="close-modal"><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                    <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F"/>
                    </svg></button>

                    <button class="add-cart" ${incart[0]}>${incart[1]}</button>
                </div>
            </div>
        </div>`

        }
    })
});

prodModal.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        if (e.target.classList[0] === 'add-cart' && e.target.textContent === 'Adicionar ao carrinho') {
            let newList = getnewList();
            if (newList !== 'Nenhum Item aqui') {
                newList.push(data)
                localStorage.shoppingCart = JSON.stringify(newList)
            } else {
                newList = [data]
                localStorage.shoppingCart = JSON.stringify(newList)
                window.location.href = 'inicial.html'
            }
            popAdd.removeAttribute('active')
            const time = setInterval(() => {
                popAdd.setAttribute('active', true)

            }, 100)
            preencheCarrinho()
            preencheCard(localStorage.tempJunho, divMae2)
            preencheCard(localStorage.Data, divMae1)
        }
        if (e.target.classList[0] === 'add-cart' && e.target.textContent === 'No carrinho') {

        }
        prodModal.removeAttribute('active')
    }

})
