const inputPesquisa = document.querySelector('.input-search');

inputPesquisa.addEventListener('keyup', (e) => {
    const inputValue = inputPesquisa.value
    if (inputValue !== ''
        && inputValue.length >= 3) {
        divMae1.innerHTML = ''
        const lista = req(localStorage.Data)
        const listTitles = []
        const li = []
        for (let i = 0; i < lista.length; i++) {
            const element = lista[i];
            const title = element['title'].toLowerCase();
            listTitles.push(title)
            switch(title.includes(inputValue.toLowerCase())){
                case true:
                    const dataProd = req(localStorage.Data)[listTitles.indexOf(title, 0)];
                    geraCard(dataProd, i, divMae1)
                    li.push(true)
                    break
                case false:
                    li.push(false)
                    break
            }
            
        }
        if(li.includes(true)){     
            }else{
                divMae1.innerHTML = ''
                divMae1.style.textalight = 'center'
                divMae1.innerHTML = 'Que pena, <br>não encontramos o que você está procurando'
            }
    }
    if (inputValue === '') {
        console.clear()
        divMae1.innerHTML = ''
        preencheCard(localStorage.Data,divMae1)
    }
})