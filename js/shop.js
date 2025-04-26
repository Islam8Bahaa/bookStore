const domain = "http://82.112.241.233:1338";
const currency = "$";

// State management
let books = [];
let filteredBooks = [];
let currentFilter = {
  category: 'all',
  priceRange: { min: 0, max: 1000 },
  search: '',
  sort: 'default'
};

const getAllBooks = async () => {
  try {
    const response = await axios.get(`${domain}/api/books`, {
      params: { 
        populate: "*",
        pagination: { pageSize: 100 }
      }
    });
    books = response.data.data;
    filteredBooks = [...books];
    renderBooks();
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

const filterBooks = () => {
  filteredBooks = books.filter(book => {
    // Category filter
    if (currentFilter.category !== 'all' && book.category?.name !== currentFilter.category) {
      return false;
    }
    
    // Price filter
    const price = book.salePrice || book.price;
    if (price < currentFilter.priceRange.min || price > currentFilter.priceRange.max) {
      return false;
    }
    
    // Search filter
    if (currentFilter.search && !book.name.toLowerCase().includes(currentFilter.search.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Sort books
  switch(currentFilter.sort) {
    case 'price-low':
      filteredBooks.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      break;
    case 'price-high':
      filteredBooks.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      break;
    case 'name':
      filteredBooks.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  renderBooks();
};

const renderBooks = () => {
  const container = document.getElementById('booksContainer');
  if (!container) return;

  container.innerHTML = filteredBooks.map(book => `
    <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp">
      <div class="shop-box-items">
        <div class="book-thumb center">
          <a href="shop-details.html?id=${book.id}">
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
            <a href="shop-details.html?id=${book.id}">${book.name}</a>
          </h3>
          <ul class="price-list">
            <li>${currency}${book.salePrice || book.price}</li>
            ${book.salePrice ? `<li><del>${currency}${book.price}</del></li>` : ''}
          </ul>
          <div class="shop-button">
            <a href="shop-details.html?id=${book.id}" class="theme-btn">
              <i class="fa-solid fa-basket-shopping"></i> View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  getAllBooks();

  // Search
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentFilter.search = e.target.value;
      filterBooks();
    });
  }

  // Price Range
  const minPrice = document.querySelector('.input-min');
  const maxPrice = document.querySelector('.input-max');
  if (minPrice && maxPrice) {
    minPrice.addEventListener('change', (e) => {
      currentFilter.priceRange.min = Number(e.target.value);
      filterBooks();
    });
    maxPrice.addEventListener('change', (e) => {
      currentFilter.priceRange.max = Number(e.target.value);
      filterBooks();
    });
  }

  // Category Filter
  const categoryButtons = document.querySelectorAll('[data-category]');
  categoryButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      currentFilter.category = e.target.dataset.category;
      filterBooks();
    });
  });

  // Sort
  const sortSelect = document.querySelector('#sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentFilter.sort = e.target.value;
      filterBooks();
    });
  }
});