const URL = "https://erfansefat.github.io/BlankSpace/items.json";
const container = document.getElementById("item-container");
const removeBtn = document.getElementById("remove-filters");
async function loadData(){
    const items = await fetch(URL);
    const data = items.json();
    return data;
}
async function getItems(){
    const items = await loadData();
    items.vinyls.forEach(element => {
        loadItem(element);
    });    
}
function loadItem(element){
    const card = document.createElement("div");
    card.className = "item-card";
    container.appendChild(card);

    const img = document.createElement("img");
    img.className = "item-img";
    img.src = `./Pictures/vinyls/${element.item_img}`;
    card.appendChild(img);

    const name = document.createElement("div");
    name.className = "item-name";
    name.textContent = element.item_name;
    card.appendChild(name);

    const info = document.createElement("div");
    info.className = "item-info";
    card.appendChild(info);
    const release = document.createElement("div");
    release.className = "item-release";
    release.textContent = element.release_year;
    const type = document.createElement("div");
    type.className = "item-type";
    type.textContent = element.type;

    const distance1 = document.createElement("img");
    distance1.src = "./Pictures/dis.svg";
    const distance2 = document.createElement("img");
    distance2.src = "./Pictures/dis.svg";

    const genre = document.createElement("div");
    genre.className = "item-genre";
    genre.textContent = element.genre;

    info.appendChild(release);
    info.appendChild(distance1);
    info.appendChild(genre);
    info.appendChild(distance2);
    info.appendChild(type);

    const pricebox = document.createElement("div");
    pricebox.className = "item-price";
    card.appendChild(pricebox);

    const carting = document.createElement("div");
    carting.className = "add-to-cart";
    carting.textContent = "Add to Cart";

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = `$${element.item_price}`;

    pricebox.appendChild(carting);
    pricebox.appendChild(price);

}
async function loadToMenuBoxes()
{
    //loading release date options the its menu
    const menuRelease = document.getElementById("menuRelease");
    const menuGenre = document.getElementById("menuGenre");
    const menuType = document.getElementById("menuType");
    const items = await loadData();
    const dateList = [];
    const typeList = [];
    const genreList = [];
    items.vinyls.forEach(element => {
        if (!dateList.includes(element.release_year))
        {dateList.push(element.release_year);}

        if (!typeList.includes(element.type))
        {typeList.push(element.type);}

        if (!genreList.includes(element.genre))
        {genreList.push(element.genre);}
    });
    dateList.forEach(element => {
        const date = document.createElement("div");
        date.className = "menu-options";
        date.textContent = element;
        date.addEventListener("click", function(){
            filterDate(element)
        });
        menuRelease.appendChild(date);
    });
    typeList.forEach(element => {
        const date = document.createElement("div");
        date.className = "menu-options";
        date.textContent = element;
        date.addEventListener("click", function(){
            filterType(element)
        });
        menuType.appendChild(date);
    });
    genreList.forEach(element => {
        const date = document.createElement("div");
        date.className = "menu-options";
        date.textContent = element;
        date.addEventListener("click", function(){
            filterGenre(element)
        });
        menuGenre.appendChild(date);
    });
}
loadToMenuBoxes();
getItems();
async function removeCards(){
    const cards = await document.querySelectorAll(".item-card");
    cards.forEach(element => {
        element.remove();
    });
}
async function filterGenre(whatToFilter){
    const items = await loadData();
    removeCards();
    items.vinyls.forEach(element => {
        if(element.genre === whatToFilter){
            loadItem(element);
        }
    });
    removeBtn.style.visibility = "visible";
}
async function filterDate(whatToFilter){
    const items = await loadData();
    removeCards();
    items.vinyls.forEach(element => {
        if(element.release_year === whatToFilter){
            loadItem(element);
        }
    });
    removeBtn.style.visibility = "visible";
}
async function filterType(whatToFilter){
    const items = await loadData();
    removeCards();
    items.vinyls.forEach(element => {
        if(element.type === whatToFilter){
            loadItem(element);
        }
    });
    removeBtn.style.visibility = "visible";
}
function hideBtn(){
    removeCards();
    getItems();
    removeBtn.style.visibility = "hidden";
}