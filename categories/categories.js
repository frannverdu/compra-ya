import createNavbar from "../components/navbar.js";
createNavbar();
import { itemCard } from "../components/itemCard.js";

window.onload = function () {
  updateCartButton();
};

async function getCategories() {
  try {
    const response = await fetch("../categories.json");
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    const data = await response.json();
    setCategoriesData(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

await getCategories();

// Función para renderizar las cards de productos
function renderCards(items) {
  const container = document.getElementById("items-container");
  let cardsHTML = "";
  items.forEach((item) => {
    cardsHTML += `
        <div class="col col-12 col-sm-6 col-md-6 col-lg-4 p-2">
            ${itemCard(item)}
        </div>
    `;
  });
  container.innerHTML = cardsHTML;

  items.forEach((item) => {
    const button = document.getElementById(`btn-${item.id}`);
    if (button) {
      button.addEventListener("click", function () {
        const quantityInput = document.getElementById(`quantity-${item.id}`);
        const quantity = quantityInput ? quantityInput.value : 1;
        handleButtonClick(item, quantity);
      });
    }
  });
}

function handleButtonClick(item, q) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.item.id === item.id
  );
  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += Number(q);
  } else {
    cart.push({ item, quantity: Number(q) });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartButton();
}

function updateCartButton() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce(
    (sum, cartItem) => sum + Number(cartItem.quantity),
    0
  );

  const cartButton = document.getElementById("carritoButton");
  if (cartButton) {
    cartButton.innerHTML = `
      Carrito (${totalItems})
      <i class="fa-solid fa-cart-shopping fa-lg"></i>
    `;
  }
}

function addCategoryHeader(category) {
  const categoryHeaderDiv = document.getElementById("category-header");
  const title = document.getElementById("title");
  title.innerHTML = `Compra YA! - ${category.name}`;

  const categoryHTML = `
      <div class="d-flex align-items-center justify-content-between">
        <h3 class="m-0">${category.name} </h3>
        <h6 class="m-0">${category.items.length} items</h6>
      </div>
      <hr />
    `;
  categoryHeaderDiv.innerHTML += categoryHTML;
}

function setCategoriesData(data) {
  const categoryId = document.body.getAttribute("data-category-id");
  const categoryObject = data.find((item) => item.id === categoryId);
  addCategoryHeader(categoryObject);
  if (categoryObject) {
    renderCards(categoryObject.items);
  } else {
    console.error(`Categoría "${categoryId}" no encontrada.`);
  }
}
