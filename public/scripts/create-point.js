function populateDistricts() {
  const districtSelect = document.querySelector("select[name=district]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then(res => res.json())
  .then(districts => {

    for(const district of districts) {
      districtSelect.innerHTML += `<option value="${district.id}">${district.nome}</option>`
    }
  })
}

populateDistricts()

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const districtInput = document.querySelector("input[name=district]")

  const districtValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  districtInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios`

  citySelect.innerHTML = "<option value>Selecione a cidade</option>"
  citySelect.disabled = true

  fetch(url)
  .then(res => res.json())
  .then(cities => {

    for(const city of cities) {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }

    citySelect.disabled = false
  })
}

document
.querySelector("select[name=district]")
.addEventListener("change", getCities)

//Itens de recolha

const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
  //Add ou remover uma class
  const itemLi = event.target
  
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  console.log('ITEM ID: ', itemId)

  //Verificar se existem items selecionados, se sim
  //pegar os items selecionados

  const alreadySelected = selectedItems.findIndex(item => {
    const itemFound = item == itemId  //true ou false
    return itemFound
  })

  //Se já estiver selecionado, tirar da seleção

  if(alreadySelected >= 0) {
    //Tirar da seleção
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })
    selectedItems = filteredItems
  } else {
    // adicionar da seleçao
    selectedItems.push(itemId)
  }

  console.log('selectedItems: ', selectedItems)

  //Atualizar o campo escondido com os items selecionados
  collectedItems.value = selectedItems

}