
let cart = 0;
let currentCategory = "all";
let currentLanguage = "fa";

const search = document.getElementById("search");
const cards = document.querySelectorAll(".product-card");
const buttons = document.querySelectorAll(".filter");

function filterProducts() {
  const query = search.value.toLowerCase().trim();
  let visible = 0;

  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const category = card.dataset.category;

    const matchesSearch = name.includes(query);
    const matchesCategory =
      currentCategory === "all" ||
      category === currentCategory;

    const show = matchesSearch && matchesCategory;
    card.hidden = !show;

    if (show) visible++;
  });

  document.getElementById("emptyMessage").hidden = visible !== 0;
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    currentCategory = button.dataset.category;
    filterProducts();
  });
});

search.addEventListener("input", filterProducts);

document.querySelectorAll(".buy-btn").forEach(button => {
  button.addEventListener("click", () => {
    cart++;
    document.getElementById("cartCount").textContent = cart;

    const message = currentLanguage === "fa"
      ? "محصول به سبد خرید اضافه شد!"
      : "Product added to cart!";

    alert(message);
  });
});

document.getElementById("languageBtn").addEventListener("click", () => {
  currentLanguage = currentLanguage === "fa" ? "en" : "fa";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir =
    currentLanguage === "fa" ? "rtl" : "ltr";

  document.querySelectorAll("[data-fa]").forEach(element => {
    element.textContent = element.dataset[currentLanguage];
  });

  document.getElementById("languageBtn").textContent =
    currentLanguage === "fa" ? "EN" : "FA";

  search.placeholder = currentLanguage === "fa"
    ? "جستجوی عطر..."
    : "Search perfumes...";

  document.getElementById("emptyMessage").textContent =
    currentLanguage === "fa"
      ? "محصولی پیدا نشد."
      : "No products found.";

  filterProducts();
});
