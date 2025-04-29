const domain = "http://82.112.241.233:1338";
const currency = "$";

// State
let books = [];
let filteredBooks = [];
let currentFilter = {
  category: 'all',
  priceRange: { min: 0, max: 1000 },
  search: '',
  sort: 'default'
};

// Fetch all books
const getAllBooks = async () => {
  try {
    const res = await axios.get(`${domain}/api/books`, {
      params: {
        populate: "*",
        pagination: { pageSize: 100 }
      }
    });
    books = res.data.data;
    filteredBooks = [...books];
    renderBooks();
    return books;
  } catch (err) {
    console.error("Error fetching books:", err);
    return [];
  }
};

// Fetch all categories
const getAllCats = async () => {
  try {
    const res = await axios.get(`${domain}/api/categories`, {
      params: {
        populate: "*",
        pagination: { pageSize: 100 }
      }
    });
    return res.data.data;
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
};

// Render sidebar categories & wire clicks
const loadSidebarCategories = async () => {
  const cats = await getAllCats();
  const ul = document.getElementById("sidebarCategories");
  if (!ul) return;

  // "All" button
  let html = `
    <li>
      <button
        type="button"
        class="nav-link active"
        data-category="all"
      >
        All (${books.length})
      </button>
    </li>
  `;

  // One per category
  html += cats.map(cat => `
    <li>
      <button
        type="button"
        class="nav-link"
        data-category="${cat.name.toLowerCase()}"
      >
        ${cat.name} (${cat.books?.length || 0})
      </button>
    </li>
  `).join("");

  ul.innerHTML = html;

  // Attach handlers
  ul.querySelectorAll("button[data-category]").forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active class
      ul.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Update filter & re-render
      currentFilter.category = btn.dataset.category;
      filterBooks();
    });
  });
};

// Filter logic
const filterBooks = () => {
  filteredBooks = books.filter(book => {
    // Category
    if (currentFilter.category !== 'all') {
      const bookCat = (book.category?.name || "").toLowerCase();
      if (bookCat !== currentFilter.category) {
        return false;
      }
    }
    // Price
    const price = Number(book.salePrice ?? book.price);
    if (
        price < currentFilter.priceRange.min ||
        price > currentFilter.priceRange.max
    ) {
      return false;
    }
    // Search
    if (
        currentFilter.search &&
        !book.name.toLowerCase().includes(currentFilter.search)
    ) {
      return false;
    }
    return true;
  });

  // Sort
  switch (currentFilter.sort) {
    case 'price-low':
      filteredBooks.sort((a, b) =>
          (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
      );
      break;
    case 'price-high':
      filteredBooks.sort((a, b) =>
          (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
      );
      break;
    case 'name':
      filteredBooks.sort((a, b) =>
          a.name.localeCompare(b.name)
      );
      break;
  }

  renderBooks();
};

// Render grid
const renderBooks = () => {
  const container = document.getElementById('booksContainer');
  if (!container) return;

  container.innerHTML = filteredBooks.map(book => `
    <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp">
      <div class="shop-box-items">
        <div class="book-thumb center">
          <a href="shop-details.html?id=${book.documentId}">
            <img src="${domain}${book.cover.url}" alt="${book.name}" />
          </a>
          ${book.salePrice ? `
            <ul class="post-box">
              <li>-${Math.round(((book.price - book.salePrice) / book.price) * 100)}%</li>
            </ul>
          ` : ''}
        </div>
        <div class="shop-content">
          <h3>
            <a href="shop-details.html?id=${book.documentId}">${book.name}</a>
          </h3>
          <ul class="price-list">
            <li>${currency}${book.salePrice ?? book.price}</li>
            ${book.salePrice ? `<li><del>${currency}${book.price}</del></li>` : ''}
          </ul>
          <div class="shop-button">
            <a href="shop-details.html?id=${book.documentId}" class="theme-btn">
              <i class="fa-solid fa-basket-shopping"></i> View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
};

// Init
document.addEventListener('DOMContentLoaded', async () => {
  await getAllBooks();
  await loadSidebarCategories();

  // Search
  const searchInput = document.querySelector('.search-input');
  searchInput?.addEventListener('input', e => {
    currentFilter.search = e.target.value.trim().toLowerCase();
    filterBooks();
  });

  // Price
  const minPrice = document.querySelector('.input-min');
  const maxPrice = document.querySelector('.input-max');
  minPrice?.addEventListener('change', e => {
    currentFilter.priceRange.min = Number(e.target.value);
    filterBooks();
  });
  maxPrice?.addEventListener('change', e => {
    currentFilter.priceRange.max = Number(e.target.value);
    filterBooks();
  });

  // Manual "Filter" button (if you have one)
  document.querySelector('.filter-btn')
      ?.addEventListener('click', filterBooks);

  // Sort
  const sortSelect = document.querySelector('#sortSelect');
  sortSelect?.addEventListener('change', e => {
    currentFilter.sort = e.target.value;
    filterBooks();
  });
});
