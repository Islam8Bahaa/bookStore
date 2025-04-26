document.querySelector(".header-2-section").innerHTML = `
     <div class="container d-flex justify-content-between">
        <div class="header-2-wrapper col-12 d-flex justify-content-between">
          <div class="header-top-logo">
            <a href="index.html">
              <img src="./Bony Store.png" width="100" alt="img" />
            </a>
          </div>
          <div class="header-2-right d-flex justify-content-between">
            <div class="category-oneadjust gap-6 d-flex align-items-center">
              <div class="bd-header__category-nav p-relative">
                <div class="bd-category__click style-2">
                  <span><i class="icon-icon-15"></i> Categories </span>
                </div>
                <div class="category__items-2" style="display: none">
                  <div class="category-item">
                    <nav>
                      <ul id="catsMain">
                        <!-- <li>
                                                <a href="shop-details.html">
                                                    <span>Novel Books</span>
                                                    <span>(8)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="shop-details.html">
                                                    <span>Poetry Books</span>
                                                    <span>(5)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="shop-details.html">
                                                    <span>History Books</span>
                                                    <span>(7)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="shop-details.html">
                                                    <span>Movement Books</span>
                                                    <span>(3)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="shop-details.html">
                                                    <span>Independence Books </span>
                                                    <span>(4)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="shop-details.html">
                                                    <span>Technology Books</span>
                                                    <span>(2)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="shop-details.html">
                                                    <span>Political Books</span>
                                                    <span>(1)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="shop-details.html">
                                                    <span>Romantic Books</span>
                                                    <span>(7)</span>
                                                </a>
                                            </li> -->
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <form action="#" class="search-toggle-box d-md-block">
                <div class="input-area">
                  <input
                    type="text"
                    placeholder="Search For books for keyword"
                  />
                  <button class="cmn-btn">
                    <i class="far fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
            <!-- <div class="author-icon">
                        <div class="icon">
                            <img src="assets/img/icon/icon-23.svg" alt="icon">
                        </div>
                        <div class="content">
                            <span>Call Us Now</span>
                            <h5>
                                <a href="tel:+2085550112">+208-555-0112</a>
                            </h5>
                        </div>
                    </div> -->
            <div class="menu-cart">
              <a href="wishlist.html" class="cart-icon">
                <i class="fa-regular fa-heart"></i>
              </a>
              <a href="shop-cart.html" class="cart-icon">
                <i class="fa-regular fa-cart-shopping"></i>
              </a>
              <div class="header-humbager ml-30">
                <a class="sidebar__toggle" href="javascript:void(0)">
                  <div class="bar-icon-2">
                    <img src="assets/img/icon/icon-13.svg" alt="img" />
                  </div>
                </a>
              </div>
              <button
                type="button"
                class="theme-btn rounded-1"
                data-bs-toggle="modal"
                data-bs-target="#registrationModal"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>


`