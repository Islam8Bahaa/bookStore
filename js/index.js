const domain = "http://82.112.241.233:1338";

const getFeaturedBooks = async () => {
  let final = [];
  await axios
    .get(`${domain}/api/featured-book`, {
      params: {
        populate: {
          books: {
            populate: ["cover", "category"],
          },
        },
      },
      pagination: { pageSize: 100 },
    })
    .then((res) => {
      final = res.data.data.books;
    });
  return final;
};

const getTopBooks = async () => {
  let final = [];
  await axios
    .get(`${domain}/api/top-book`, {
      params: {
        populate: {
          books: {
            populate: "cover",
          },
        },
      },
      pagination: { pageSize: 100 },
    })
    .then((res) => {
      final = res.data.data.books;
    });
  return final;
};

const getBestBooks = async () => {
  let final = [];
  await axios
    .get(`${domain}/api/best-book`, {
      params: {
        populate: {
          books: {
            populate: "cover",
          },
        },
      },
      pagination: { pageSize: 100 },
    })
    .then((res) => {
      final = res.data.data.books;
    });
  return final;
};

const getAllCats = async () => {
  let final = [];
  await axios
    .get(`${domain}/api/categories`, {
      params: { populate: "*" },
      pagination: { pageSize: 100 },
    })
    .then((res) => {
      final = res.data.data;
    });
  return final;
};

getAllCats().then((res) => {
  document.querySelector("#catsMain").innerHTML = "";
  res.forEach((el) => {
    document.querySelector("#catsMain").innerHTML += `            
    <li>
        <a href="shop-details.html">
            <span>${el.name}</span>
            <span>${el.books.length}</span>
        </a>
    </li>
    `;
  });
});
getTopBooks().then((res) => {
  const container = document.querySelector("#topBooks");
  container.innerHTML = "";
  res.forEach((el) => {
    container.innerHTML += `
      <div class="swiper-slide">
        <div class="shop-box-items style-2">
          <div class="book-thumb center">
            <a href="shop-details.html?id=${el.documentId}">
              <img src="${domain + el.cover.url}" alt="${el.name}" />
            </a>
            <ul class="post-box">
              <li>Hot</li>
              <li>-30%</li>
            </ul>
            <ul class="shop-icon d-grid justify-content-center align-items-center">
              <li><a href="wishlist.html"><i class="far fa-heart"></i></a></li>
              <li>
                <a href="shop-cart.html">
                  <img class="icon" src="assets/img/icon/shuffle.svg" alt="svg-icon"/>
                </a>
              </li>
              <li><a href="shop-details.html"><i class="far fa-eye"></i></a></li>
            </ul>
            <div class="shop-button">
              <button
                type="button"
                class="theme-btn add-to-cart"
                data-id="${el.id}"
                data-name="${el.name}"
                data-price="${((el.salePrice ?? el.price)).toFixed(2)}"
                data-cover="${domain + el.cover.url}"
              >
                <i class="fa-solid fa-basket-shopping"></i> Add To Cart
              </button>
            </div>
          </div>
          <div class="shop-content">
            <h5>${el.category?.name ?? "-"}</h5>
            <h3><a href="shop-details.html?id=${el.documentId}">${el.name}</a></h3>
            <ul class="price-list">
              <li>$${el.salePrice ?? el.price}</li>
              ${el.salePrice ? `<li><del>$${el.price}</del></li>` : ""}
            </ul>
          </div>
        </div>
      </div>
    `;
  });
});

getFeaturedBooks().then((res) => {
  const container = document.querySelector("#featuredBooks");
  container.innerHTML = "";
  res.forEach((el) => {
    container.innerHTML += `
      <div class="swiper-slide">
        <div class="shop-box-items style-4 wow fadeInUp" data-wow-delay=".2s">
          <div class="book-thumb center">
            <a href="shop-details.html?id=${el.documentId}">
              <img src="${domain + el.cover.url}" alt="${el.name}" />
            </a>
          </div>
          <div class="shop-content">
            <ul class="book-category">
              <li class="book-category-badge">${el.category?.name ?? "-"}</li>
            </ul>
            <h3><a href="shop-details.html?id=${el.documentId}">${el.name}</a></h3>
            <div class="book-availablity">
              <div class="details">
                <ul class="price-list">
                  <li>$${el.salePrice ?? el.price}</li>
                  ${el.salePrice ? `<li><del>$${el.price}</del></li>` : ""}
                </ul>
                <div class="progress-line"></div>
                <p>25 Books in stock</p>
              </div>
              <div class="shop-btn">
                  <button type="button" class="text-white  add-to-cart"
                  data-id="${el.id}"
                  data-name="${el.name}"
                  data-price="${((el.salePrice ?? el.price)).toFixed(2)}"
                  data-cover="${domain + el.cover.url}"
                  >
                  <i class="fa-regular fa-basket-shopping"></i>
                  </button>
<!--                 <a href="shop-cart.html" >-->
<!--                  <i class="fa-regular fa-basket-shopping"></i>-->
<!--                </a>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
});

getBestBooks().then((res) => {
  const container = document.querySelector("#bestBooks");
  container.innerHTML = "";
  res.forEach((el) => {
    container.innerHTML += `
      <div class="shop-box-items style-3 wow fadeInUp" data-wow-delay=".2s">
        <div class="book-thumb center">
          <a href="shop-details.html?id=${el.documentId}">
            <img src="${domain + el.cover.url}" alt="${el.name}" />
          </a>
        </div>
        <div class="shop-content">
          <ul class="book-category">
            <li class="book-category-badge">${el.category?.name ?? "-"}</li>
          </ul>
          <h3><a href="shop-details.html?id=${el.documentId}">${el.name}</a></h3>
          <ul class="price-list">
            <li>$${el.salePrice ?? el.price}</li>
            ${el.salePrice ? `<li><del>$${el.price}</del></li>` : ""}
          </ul>
          <div class="shop-button">
            <button
              type="button"
              class="theme-btn add-to-cart"
              data-id="${el.id}"
              data-name="${el.name}"
              data-price="${((el.salePrice ?? el.price)).toFixed(2)}"
              data-cover="${domain + el.cover.url}"
            >
              <i class="fa-solid fa-basket-shopping"></i> Add To Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
});