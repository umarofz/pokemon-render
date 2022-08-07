let pokemonsSliced = pokemons.slice(0, 30);
let elList = document.querySelector(".list1")
let elForm = document.querySelector(".form")
let elWeightInput = document.querySelector(".weight__input")
let elHeightInput = document.querySelector(".height__input")      
let elCategories = document.querySelector(".categories")      



let normolizedArray = pokemonsSliced.map(item => {
    return {
        name: item.name,
        img: item.img,
        type: item.type,
        height: item.height,
        weight: item.weight
    }
})

function pokemonsItems(pokemons) {
    elList.innerHTML = null
    for (let item of pokemons) {
        let newLi = document.createElement("li")
        elList.appendChild(newLi)
        newLi.classList.add("card", "col-3", "text-center", "mb-4", "boxshadow", "me-3")
        newLi.height = 350;
        newLi.style.width = "300px"
        
        let img = document.createElement("img")
        img.src = item.img
        img.width = 200
        img.classList.add("mx-auto")
        newLi.appendChild(img)
        let h3 = document.createElement("h3")
        h3.textContent = item.name
        newLi.appendChild(h3)
        let p1 = document.createElement("h5")
        p1.textContent = item.type
        newLi.appendChild(p1)
        let p2 = document.createElement("h5")
        p2.textContent = item.weight
        newLi.appendChild(p2)
        let p3 = document.createElement("h5")
        p3.textContent = item.height
        newLi.appendChild(p3)
    }
}
pokemonsItems(normolizedArray)

function getCategories(array) {
    let categoriesArray = [];

    for (const item of array) {
        for (const itemCategory of item.type) {
            if (!categoriesArray.includes(itemCategory)) {
                categoriesArray.push(itemCategory)
            }
        }
    }

    return categoriesArray
}

let pokemonsCategories = getCategories(normolizedArray);

function renderCategories(array, wrapper) {
    let tempFragment = document.createDocumentFragment();

    for (const item of array) {
        let newOption = document.createElement("option")
        newOption.textContent = item
        newOption.value = item

        tempFragment.appendChild(newOption)
    }

    wrapper.appendChild(tempFragment)
}
renderCategories(pokemonsCategories.sort(), elCategories)

elForm.addEventListener("submit", function(evt) {
    evt.preventDefault()

    let inputHeight = elHeightInput.value.trim()
    let inputWeight = elWeightInput.value.trim()
    let categories = elCategories.value.trim()

    let filteredArray = normolizedArray.filter(function (item) {
        let isTrue = categories == "all" ? true: item.type.includes(categories)
        let validation = item.height >= inputHeight && isTrue;

        return validation
    })

    pokemonsItems(filteredArray, elList)
})