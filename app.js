const productForm = document.getElementById("product-form");
const downloadBtn = document.getElementById("download");
const itemsStored = document.getElementById("items-stored");

function getStoredProducts() {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : {};
}

let products = getStoredProducts();
updateItemsStored();

function updateItemsStored() {
    itemsStored.textContent = Object.keys(products).length;
}

function resetForm() {
    productForm.reset();
}

productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const upc = document.getElementById("upc").value;
    const mainDescription = document.getElementById("mainDescription").value;
    const generalDescription = document.getElementById("generalDescription").value;
    const altDescription = document.getElementById("altDescription").value;
    const size = document.getElementById("size").value;
    const unit = document.getElementById("unit").value;
    const lb = document.getElementById("lb").value;

    products[upc] = {
        MainDescription: mainDescription,
        generalDescription: generalDescription,
        AltDescription: altDescription,
        Size: size,
        Unit: unit,
        lb: lb,
    };

    
    localStorage.setItem("products", JSON.stringify(products));
    updateItemsStored();
    resetForm();
});

downloadBtn.addEventListener("click", () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "products.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

    products = {};
    localStorage.removeItem("products");
    updateItemsStored();
});
