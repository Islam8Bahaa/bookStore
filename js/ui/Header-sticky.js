document.querySelector(".sticky-header").innerHTML += `
<div class="mega-menu-wrapper">
  <div class="header-main">
    <div class="container">
      <div class="row">
        <div class="col-6 col-xl-9">
          <div class="header-left">
            <div class="logo">
              <a href="index.html" class="header-logo">
                <img src="./Bony Store.png" width="100" alt="logo-img" />
              </a>
            </div>
            <div class="mean__menu-wrapper">
              <div class="main-menu">
                <nav id="mobile-menu">
                  <ul>
                    <li>
                      <a href="index.html"> Home </a>
                    </li>
                    <li>
                      <a href="shop.html">
                        Shop
                        <i class="fas fa-angle-down"></i>
                      </a>
                      <ul class="submenu">
                        <li><a href="shop.html">Shop Default</a></li>
                        <li><a href="shop-list.html">Shop List</a></li>
                        <li>
                          <a href="shop-details.html">Shop Details</a>
                        </li>
                        <li><a href="shop-cart.html">Shop Cart</a></li>
                        <li><a href="wishlist.html">Wishlist</a></li>
                        <li><a href="checkout.html">Checkout</a></li>
                      </ul>
                    </li>
                    <li class="has-dropdown">
                      <a href="about.html">
                        Pages
                        <i class="fas fa-angle-down"></i>
                      </a>
                      <ul class="submenu">
                        <li><a href="about.html">About Us</a></li>
                        <li class="has-dropdown">
                          <a href="team.html">
                            Author
                            <i class="fas fa-angle-down"></i>
                          </a>
                          <ul class="submenu">
                            <li><a href="team.html">Author</a></li>
                            <li>
                              <a href="team-details.html">Author Profile</a>
                            </li>
                          </ul>
                        </li>
                        <li><a href="faq.html">Faq's</a></li>
                        <li><a href="404.html">404 Page</a></li>
                      </ul>
                    </li>
                    <!-- <li>
                    <a href="news.html">
                      Blog
                      <i class="fas fa-angle-down"></i>
                    </a>
                    <ul class="submenu">
                      <li><a href="news-grid.html">Blog Grid</a></li>
                      <li><a href="news.html">Blog List</a></li>
                      <li>
                        <a href="news-details.html">Blog Details</a>
                      </li>
                    </ul>
                  </li> -->
                    <li>
                      <a href="contact.html">Contact</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-xl-3">
          <div class="header-right">
            <div class="category-oneadjust gap-6 d-flex align-items-center">
              <div class="icon">
                <i class="fa-sharp fa-solid fa-grid-2"></i>
              </div>
              <select name="cate" class="category">
                <option value="1">Category</option>
                <option value="1">Web Design</option>
                <option value="1">Web Development</option>
                <option value="1">Graphic Design</option>
                <option value="1">Softwer Eng</option>
              </select>
              <form action="#" class="search-toggle-box d-md-block">
                <div class="input-area">
                  <input type="text" placeholder="Author" />
                  <button class="cmn-btn">
                    <i class="far fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
