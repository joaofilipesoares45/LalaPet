const db = firebase.firestore();

const arquivo = document.querySelector('.input-img')
const ref = firebase.storage().ref('/lala pet img')

const form = document.querySelector('.div-form');
const inputImage = document.querySelector('.input-file')
const fileImg = document.querySelector('img')
const inputTitle = document.querySelector('.input-title')
const inputPrice = document.querySelector('.input-price')
const inputObs = document.querySelector('.input-obs')
const btn = document.querySelector('.adic-btn')
const produto = {}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    const img = inputImage.files[0]
    ref.child(`${img.name}`).put(img).then(snapshot => {
        ref.child(`${img.name}`).getDownloadURL().then(url => {
            console.log(url);
            if (inputImage.value !== '' && inputTitle.value !== '' && inputPrice.value !== '' && inputObs.value !== '') {
                produto.image = url
                produto.title = inputTitle.value
                produto.price = inputPrice.value
                produto.obs = inputObs.value
                produto.id = localStorage.Data.length
                db.collection('produtos').add({
                    produto: produto
                })
            }
        })
    })
});

