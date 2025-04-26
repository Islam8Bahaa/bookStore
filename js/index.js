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
  document.querySelector("#topBooks").innerHTML = "";
  res.forEach((el) => {
    document.querySelector("#topBooks").innerHTML += `
      <div class="swiper-slide">
              <div class="shop-box-items style-2">
                <div class="book-thumb center">
                  <a href="shop-details.html?id=${el.documentId}"
                    ><img src="${domain + el.cover.url}" alt="img"
                  /></a>
                  <ul class="post-box">
                    <li>Hot</li>
                    <li>-30%</li>
                  </ul>
                  <ul
                    class="shop-icon d-grid justify-content-center align-items-center"
                  >
                    <li>
                      <a href="shop-cart.html"><i class="far fa-heart"></i></a>
                    </li>
                    <li>
                      <a href="shop-cart.html">
                        <img
                          class="icon"
                          src="assets/img/icon/shuffle.svg"
                          alt="svg-icon"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="shop-details.html"><i class="far fa-eye"></i></a>
                    </li>
                  </ul>
                  <div class="shop-button">
                    <a href="shop-details.html" class="theme-btn"
                      ><i class="fa-solid fa-basket-shopping"></i> Add To
                      Cart</a
                    >
                  </div>
                </div>
                <div class="shop-content">
                  <h5>${el.category ? el.category.name : "-"}</h5>
                  <h3>
                    <a href="shop-details.html"
                      >${el.name}</a
                    >
                  </h3>
                  <ul class="price-list">
                    <li>$${el.salePrice ? el.salePrice : "-"}</li>
                    <li>
                      <del>$${el.price ? el.price : "-"}</del>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
    `;
  });
});

getFeaturedBooks().then((res) => {
  document.querySelector("#featuredBooks").innerHTML = "";
  res.forEach((el) => {
    document.querySelector("#featuredBooks").innerHTML += `
      <div class="swiper-slide">
      <div
        class="shop-box-items style-4 wow fadeInUp"
        data-wow-delay=".2s"
      >
        <div class="book-thumb center">
          <a href="shop-details.html?id=${el.documentId}"
            ><img src="${domain + el.cover.url}" alt="img"
          /></a>
        </div>
        <div class="shop-content">
          <ul class="book-category">
            <li class="book-category-badge">${
              el.category ? el.category.name : "-"
            }</li>
          </ul>
          <h3>
            <a href="shop-details.html"
              >${el.name}</a
            >
          </h3>
          <div class="book-availablity">
            <div class="details">
              <ul class="price-list">
                <li>$${el.salePrice}</li>
                <li>
                  <del>$${el.price}</del>
                </li>
              </ul>
              <div class="progress-line"></div>
              <p>25 Books in stock</p>
            </div>
            <div class="shop-btn">
              <a href="shop-cart.html">
                <i class="fa-regular fa-basket-shopping"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    `;
  });
});

getBestBooks().then((res) => {
  document.querySelector("#bestBooks").innerHTML = "";
  res.forEach((el) => {
    document.querySelector("#bestBooks").innerHTML += `
      <div class="shop-box-items style-3 wow fadeInUp" data-wow-delay=".2s">
            <div class="book-thumb center">
              <a href="shop-details.html?id=${el.documentId}"
                ><img src="${domain + el.cover.url}" alt="img"
              /></a>
            </div>
            <div class="shop-content">
              <ul class="book-category">
                <li class="book-category-badge">${
                  el.category ? el.category.name : "-"
                }</li>
              </ul>
              <h3>
                <a href="${domain + el.cover.url}">${el.name}</a>
              </h3>
              <ul class="price-list">
                <li>$${el.salePrice}</li>
                <li>
                  <del>$${el.price}</del>
                </li>
              </ul>
              <div class="shop-button">
                <a href="shop-details.html" class="theme-btn"
                  ><i class="fa-solid fa-basket-shopping"></i> Add To Cart</a
                >
              </div>
            </div>
          </div>
    `;
  });
});