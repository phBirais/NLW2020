function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {

        for(const state of states){
            ufSelect.innerHTML  +=  `<option value ="${state.id}">${state.nome}</option>`   
        }
    } )
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade </option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for(const city of cities){
            citySelect.innerHTML  +=  `<option value ="${city.nome}">${city.nome}</option>`   
        }
        citySelect.disabled = false
    } )
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) 
//----------------------------------------------------------------------------------
// items de coleta

//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

//  repetição para varrer todos os items de coleta
for(const item of itemsToCollect){
    //se tiver o evento de clicar, chama a função handle...
    item.addEventListener("click", handleSelectedItem) 
}


const collectedItems = document.querySelector("input[name=items]")

//coleção de dados selecionados
let selectedItems = []


//função que vai ser executado e recebe um evento (click)
function handleSelectedItem(event){
    //variavel que recebe o target do evento
    const itemLi = event.target
    //adicionar ou remover uma classe com js - funciona como botao on/of
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados, se sim:
    //pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => { //executa uma função anonima em cada item
        const itemFound = item == itemId //comparando o id do item que tem selected com os ids do array
        return itemFound
    })

    //se já estiver selecionado,
    if (alreadySelected >= 0 ) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item  => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{//se não estiver selecionado, 
        //adicionar a seleção
        selectedItems.push(itemId)
    }
    console.log(selectedItems)
    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}