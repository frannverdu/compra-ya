import navbar from "../components/navbar.js";
import itemCard from "../components/itemCard.js";



document.getElementById("navbar-container").innerHTML = navbar;

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
