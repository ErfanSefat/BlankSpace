const URL = "https://erfansefat.github.io/BlankSpace/items.json";
const container = document.getElementById("item-container");
const removeBtn = document.getElementById("remove-filters");
const cart = document.getElementById("cart");
let fullPrice = 0;
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
    carting.addEventListener("click", function(){
        addToCart(element);
    });

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
function ShowCart(){
    if (cart.style.display === "none")
    {cart.style.display = "block"}
    else{cart.style.display = "none"}
}
function addToCart(element){
    console.log(element);

    const item_in_cart = document.createElement("div");
    item_in_cart.className = "item-in-cart";
    cart.appendChild(item_in_cart);

    const in_cart_img = document.createElement("img");
    in_cart_img.src = `./Pictures/vinyls/${element.item_img}`;
    item_in_cart.appendChild(in_cart_img);

    const in_cart_txts = document.createElement("div");
    in_cart_txts.className = "in-cart-txts";

    const cart_spans = document.createElement("div");
    cart_spans.className = "cart-spans";

    const in_cart_itemName = document.createElement("div");
    in_cart_itemName.innerHTML = element.item_name;

    const in_cart_itemPrice = document.createElement("span");
    in_cart_itemPrice.innerHTML = `$${element.item_price}`;

    const in_cart_itemRemove = document.createElement("span");
    in_cart_itemRemove.innerHTML = "remove";
    in_cart_itemRemove.className = "remove-from-cart";
    in_cart_itemRemove.addEventListener('click', function(){
        cart.removeChild(this.parentElement.parentElement.parentElement);
        fullPrice -= element.item_price;
        updateTotalPrice();
        //console.log(fullPrice);
    });

    cart_spans.appendChild(in_cart_itemPrice);
    cart_spans.appendChild(in_cart_itemRemove);

    in_cart_txts.appendChild(in_cart_itemName);
    in_cart_txts.appendChild(cart_spans);
    item_in_cart.appendChild(in_cart_txts);

    fullPrice += element.item_price;
    updateTotalPrice();
}
function updateTotalPrice(){
    const number = document.getElementById("totalPrice");
    number.innerHTML = `$${fullPrice}`;
}