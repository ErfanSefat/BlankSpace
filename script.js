const URL = "https://erfansefat.github.io/BlankSpace/items.json";
const container = document.getElementById("item-container");
async function loadData(){
    const items = await fetch(URL);
    const data = items.json();
    return data;
}
async function loadItems(){
    const items = await loadData();
    items.vinyls.forEach(element => {
        const card = document.createElement("div");
        card.className = "item-card";
        container.appendChild(card);

        const name = document.createElement("div");
        name.className = "item-name";
        name.textContent = element.item_name;
        card.appendChild(name);
    });
}
loadItems();