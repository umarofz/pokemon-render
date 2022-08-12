let elPokemonTemplate = document.querySelector("#pokemon__temp").content;
let elBookmarkTemplate = document.querySelector("#pokemon__template").content;
let elPokemonWrapper = document.querySelector(".list1");
let elForm = document.querySelector(".form");
let elWeightInput = document.querySelector(".weight__input");
let elHeightInput = document.querySelector(".height__input");
let elSelectCategories = document.querySelector(".categories");
let elBookmarkList = document.querySelector(".bookmark__list");


let pokemonArray = pokemons.slice(0, 30);
let localPokemons = JSON.parse(localStorage.getItem("bookmarkedPokemons"))
let bookmarkedPokemons = localPokemons ? localPokemons : []
renderBookmarks(bookmarkedPokemons)


let normolizedArray = pokemonArray.map(function(item) {
    return {
        id: item.id,
        name: item.name,
        img: item.img,
        type: item.type,
        height: item.height,
        weight: item.weight
    }
})


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

let pokemonCategories = getCategories(normolizedArray);

function renderCategories(array, wrapper) {
    let tempFragment = document.createDocumentFragment();

    for (const item of array) {
        let newOption = document.createElement("option")
        newOption.textContent = item;
        newOption.value = item;

        tempFragment.appendChild(newOption)
    }

    wrapper.appendChild(tempFragment)
}
renderCategories(pokemonCategories.sort(), elSelectCategories)


function renderPokemons(array) {
    elPokemonWrapper.innerHTML = null
    let tempFragment = document.createDocumentFragment();

    for (const item of array) {
        let templateItem = elPokemonTemplate.cloneNode(true)
        templateItem.querySelector(".pokemon__img").src = item.img;
        templateItem.querySelector(".pokemon__title").textContent = item.name;
        templateItem.querySelector(".pokemon__type").textContent = item.type;
        templateItem.querySelector(".pokemon__weight").textContent = item.weight + " kg";
        templateItem.querySelector(".pokemon__height").textContent = item.height + " m";
        templateItem.querySelector(".bookmark__btn").dataset.bookmarkId = item.id;

        tempFragment.appendChild(templateItem)
    }

    elPokemonWrapper.appendChild(tempFragment)
}
renderPokemons(normolizedArray)


elForm.addEventListener("submit", function(evt) {
    evt.preventDefault()


    let inputWeight = elWeightInput.value.trim();
    let inputHeight = elHeightInput.value.trim();
    let selectedCategory = elSelectCategories.value.trim();

    let filteredPokemons = normolizedArray.filter(function(item) {
        let select = selectedCategory == "all" ? true : item.type.includes(selectedCategory);
        let validation = item.weight >= Number(inputWeight) && item.height >= Number(inputHeight) && select

        return validation
    })

    renderPokemons(filteredPokemons)
})


elPokemonWrapper.addEventListener("click", function(evt) {
    let currentBookmarkId = evt.target.dataset.bookmarkId;

    if (currentBookmarkId) {
        let foundMovie = normolizedArray.find(function(item) {
            return item.id == currentBookmarkId
        })
        
        if (bookmarkedPokemons.length == 0) {
            bookmarkedPokemons.unshift(foundMovie)
            localStorage.setItem("bookmarkedPokemons", JSON.stringify(bookmarkedPokemons))
        }else{
            let isMovieInArray = bookmarkedPokemons.find(function(item) {
                return item.name == foundMovie.name
            }) 
            
            if (!isMovieInArray) {
                bookmarkedPokemons.unshift(foundMovie)
                localStorage.setItem("bookmarkedPokemons", JSON.stringify(bookmarkedPokemons))
            }
        }
        renderBookmarks(bookmarkedPokemons)
    }
})


function renderBookmarks(arrayOfMovies) {
    elBookmarkList.innerHTML = null;

    let fragment = document.createDocumentFragment();

    for (const item of arrayOfMovies) {
        let bookmarkItem = elBookmarkTemplate.cloneNode(true)

        bookmarkItem.querySelector(".bookmark__title").textContent = item.name
        bookmarkItem.querySelector(".bookmark__btn__remove").dataset.bookmarkedId = item.id

        fragment.appendChild(bookmarkItem)
    }

    elBookmarkList.appendChild(fragment)
}

elBookmarkList.addEventListener("click", function(evt) {
    let bookmarkedPokemonId = evt.target.dataset.bookmarkedId

    if (bookmarkedPokemonId) {
        let foundBookmarkedMovie = bookmarkedPokemons.findIndex(function(item) {
            return item.id == bookmarkedPokemonId
        })
        
        bookmarkedPokemons.splice(foundBookmarkedMovie, 1);
        localStorage.setItem("bookmarkedPokemons", JSON.stringify(bookmarkedPokemons))
    }
    renderBookmarks(bookmarkedPokemons);
})