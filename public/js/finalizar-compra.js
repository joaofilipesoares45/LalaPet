const modal = document.querySelector('.modal-response')
const modalH3 = document.querySelector('.modal-h3')
const modalP = document.querySelector('.modal-p')
const modalBtn = document.querySelector('.modal-btn')

const resRoll = document.querySelector('.res-roll');
const totalPrice = document.querySelector('.total-price');
const totalCompra = [];

function editModal(txtH3, txtP) {
    modal.style.visibility = 'visible'
    modalH3.innerText = ''
    modalH3.innerText = txtH3
    modalP.innerText = ''
    modalP.innerText = txtP
}

function preencheResumo(lista) {
    const card = document.createElement('div');
    card.classList.add('res-card');

    const image = document.createElement('img');
    image.src = lista.image;

    const hr1 = document.createElement('hr');

    const divObs = document.createElement('div');
    divObs.classList.add('card-obs');

    const title = document.createElement('h4');
    title.innerText = lista.title;

    const obs = document.createElement('p');
    obs.innerText = lista.obs;

    const hr2 = document.createElement('hr');

    const price = document.createElement('p');
    price.classList.add('price');
    price.innerText = `R$ ${lista.price},00`;

    const divFloor = document.createElement('div');
    divFloor.classList.add('card-floor');

    divObs.append(title, obs);
    divFloor.append(divObs, hr2, price);
    card.append(image, hr1, divFloor);
    resRoll.append(card);
    let element = 0
    for (let i = 0; i < totalCompra.length; i++) {
        element += Number(totalCompra[i]);
        totalPrice.innerText = `Total: R$ ${element},00`
    }
}

function req() {
    const lista = JSON.parse(localStorage.shoppingCart);
    for (let i = 0; i < lista.length; i++) {
        const element = lista[i];
        totalCompra.push(element.price);
        preencheResumo(element);
    };
};

req()


const buyNav = document.querySelector('.buy-nav')
const resumeDiv = document.querySelector('.res-div')
const adressDiv = document.querySelector('.adr-form')


let dataBuy = document.querySelector('.data-buy')
dataBuy = dataBuy.children

for (let i = 0; i < dataBuy.length; i++) {
    const element = dataBuy[i];
    if (element.hasAttribute('active')) {

    } else {
        element.style.display = 'none'
    }
}


function activeCheck() {
    const lista = buyNav.children
    const divs = []
    for (let i = 0; i < lista.length; i++) {
        const element = lista[i];
        if (element.hasAttribute('index')) {
            divs.push(element)
        }
    }
    for (let i = 0; i < dataBuy.length; i++) {
        const element = dataBuy[i];
        if (element.hasAttribute('active')) {
            for (let i = 0; i < divs.length; i++) {
                const elt = divs[i];
                if (elt.attributes[0].value === element.attributes[1].value) {
                    elt.setAttribute('active', true)
                } else {
                    element.removeAttribute('active')
                    elt.removeAttribute('active')
                }
            }
        };
    }
}

activeCheck()

buyNav.addEventListener('click', (e) => {
    switch (e.target.tagName) {
        case 'BUTTON':
            const index = e.target.parentElement.attributes[0].value

            for (let i = 0; i < dataBuy.length; i++) {
                const element = dataBuy[i];
                const val = element.attributes[1].value;
                if (val === index) {
                    element.style.display = 'block'
                    element.setAttribute('active', true)
                    activeCheck()
                }
                else {
                    element.style.display = 'none'
                    activeCheck()
                }
            }
            break
        case 'DIV':
            const idx = e.target.attributes[0].value

            for (let i = 0; i < dataBuy.length; i++) {
                const element = dataBuy[i];
                const val = element.attributes[1].value;
                if (val === idx) {
                    element.style.display = 'block'
                    element.setAttribute('active', true)
                    activeCheck()
                }
                else {
                    element.style.display = 'none'
                    activeCheck()
                }
            }
            break
    }

})

const formAdress = document.querySelector('form');

formAdress.addEventListener('submit', (e) => {
    e.preventDefault()
})
formAdress.addEventListener('keyup', (e) => {
    if (e.target.tagName === 'INPUT') {
        const input = e.target
        if (input.value !== '') {
            input.setAttribute('active', true)
            input.style.animation = 'var(--input-animation)'
        } else {
            input.removeAttribute('active')
        }
    }
})

const payForm = document.querySelector('.pay-methods')

payForm.addEventListener('click', (e) => {
    switch (e.target) {
        case payForm.children[0]:
            if (e.target.hasAttribute('active')) {
                e.target.style.height = '25px'
                e.target.removeAttribute('active')
            } else {
                e.target.style.height = '310px'
                e.target.setAttribute('active', true)
            }

            break
        case payForm.children[1]:
            if (e.target.hasAttribute('active')) {
                e.target.style.height = '25px'
                e.target.removeAttribute('active')
            } else {
                e.target.style.height = '300px'
                e.target.setAttribute('active', true)
            }
            break
    }
})

const btnPayCard = document.querySelector('.btn-pay-card')

const lista = payForm.children[0].children
const inputLista = []
for (let i = 0; i < lista.length; i++) {
    const element = lista[i];
    if (element.tagName === 'INPUT') {
        inputLista.push(element)
    }
}
function checkCard() {
    const validCardCVV = [{ numero: '1231 2312 3123 1231', cvv: '345' }];
    for (let i = 0; i < validCardCVV.length; i++) {
        const element = validCardCVV[i];

        if (element.numero === inputLista[0].value && element.cvv === inputLista[3].value) {
            btnPayCard.style.visibility = 'visible';
            inputLista[0].removeAttribute('notvalid');
            inputLista[3].removeAttribute('notvalid');
            payForm.children[0].children[9].innerText = ''
            inputLista.forEach(element => {
                element.style.background = 'rgba(9, 226, 9, 0.184'
                element.style.borderBottom = 'solid 2px green'
            });
        } else {
            inputLista[3].setAttribute('notvalid', true);
            inputLista[0].setAttribute('notvalid', true);
            const h4 = payForm.children[0].children[9];
            h4.innerText = 'Número do cartão ou CVV inválido'
            h4.style.color = 'red'
            inputLista.forEach(element => {
                element.style.background = 'transparent'
                element.style.borderBottom = 'solid 2px gray'
            });
        }

    } '1231231231231231'
}

btnPayCard.addEventListener('click', (e) => {
    modal.style.visibility = 'visible'
    modalH3.innerText = ''
    modalH3.innerText = 'Dados Recebidos'
    modalP.innerText = ''
    modalP.innerText = 'Aguarde a confirmação do pagamento, será enviado para seu email a comfirmação da'
})

payForm.addEventListener('keyup', (e) => {
    const check = []
    for (let i = 0; i < inputLista.length; i++) {
        const element = inputLista[i];
        if (element.value === '') {
            check.push(false)
        }
    }
    if (check.includes(false)) {
        btnPayCard.style.visibility = 'hidden'

    } else {
        if (inputLista[3].value.length >= 3) {
            checkCard()
        } else {
            btnPayCard.style.visibility = 'hidden'
        }
    }
    if (inputLista[0].value === '') {
        inputLista[0].removeAttribute('notvalid')
    }
    if (inputLista[0].value.length === 16) {
        const numberCard = inputLista[0].value
        inputLista[0].value = `${numberCard[0] + numberCard[1] + numberCard[2] + numberCard[3]} ${numberCard[4] + numberCard[5] + numberCard[6] + numberCard[7]} ${numberCard[8] + numberCard[9] + numberCard[10] + numberCard[11]} ${numberCard[12] + numberCard[13] + numberCard[14] + numberCard[15]}`;
    }
    if (inputLista[2].value.length === 4) {
        const valCard = inputLista[2].value
        inputLista[2].value = valCard[0] + valCard[1] + '/' + valCard[2] + valCard[3];
    }
})


const payPix = document.querySelector('.pay-pix');
const payCode = document.querySelector('.pay-code')

payPix.addEventListener('click', (e) => {
    if (e.target.classList[0] === 'copy-code') {
        navigator.clipboard.writeText(payCode.innerHTML)
            .then(() => {
                modal.style.visibility = 'visible'
                modalH3.innerText = ''
                modalH3.innerText = 'Lala pet diz:'
                modalP.innerText = ''
                modalP.innerText = 'Copiado para a área de transferência'
            })
            .catch(err => {
                console.log('Something went wrong', err);
            })
    }
})
modalBtn.addEventListener('click', () => {
    modal.style.visibility = 'hidden'
})

const adrBtn = document.querySelector('.adr-btn');

adrBtn.addEventListener('click', (e) => {

    for (let i = 0; i < formAdress.children.length; i++) {
        const element = formAdress.children[i];
        if (element.tagName === 'INPUT') {
            if (element.value !== '') {
                editModal('Dados Coletados', 'Uma mensagem será enviada para seu Whatsapp confirmando os dados da compra')
                const time = setInterval(() => {
                    window.location.href = 'index.html'
                    localStorage.shoppingCart = JSON.stringify([])
                }, 3000)

            }
        }
    }
})