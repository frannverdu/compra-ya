import createNavbar from "./components/navbar.js";
createNavbar();

window.onload = function () {
  updateCartButton();
};

async function getRandomItems() {
  try {
    const response = await fetch("../categories.json");
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    const data = await response.json();
    const selectedItems = [];
    while (selectedItems.length < 3) {
      const randomCategory = data[Math.floor(Math.random() * data.length)];
      const randomItem =
        randomCategory.items[
          Math.floor(Math.random() * randomCategory.items.length)
        ];
      if (!selectedItems.includes(randomItem)) {
        selectedItems.push(randomItem);
      }
    }

    let activeItem = true;
    selectedItems.forEach((item) => {
      addCarouselItem(item, activeItem);
      activeItem = false;
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

getRandomItems();

function addCarouselItem(item, activeItem) {
  const carousel = document.getElementById("carousel");

  const carouselItemHTML = `
  <div class="carousel-item ${activeItem ? "active" : ""}">
    <img src="${item.image}" class="carousel-image w-100 img-fluid" alt="...">
    <div class="card carousel-caption d-none d-md-block bg-dark mx-2">
      <h5>${item.name}</h5>
      <p class="mb-1">${item.description}</p>
    </div>
  </div>
`;
  carousel.insertAdjacentHTML("beforeend", carouselItemHTML);
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
