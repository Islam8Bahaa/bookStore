// js/auth.js
(() => {
  const API = "http://82.112.241.233:1338/api/auth/local";

  // ─── Helpers ────────────────────────────────────────────────────────────────
  function saveSession(jwt, user) {
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
  }
  function clearSession() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common.Authorization;
  }
  function getUser() {
    return JSON.parse(localStorage.getItem("user") || "null");
  }
  function showError(msg) {
    alert(msg); // or your toast
  }

  // ─── Auth calls ──────────────────────────────────────────────────────────────
  async function register({ username, email, password }) {
    const res = await axios.post(`${API}/register`, {
      username, email, password
    });
    return res.data; // { jwt, user }
  }
  async function login({ email, password }) {
    const res = await axios.post(API, {
      identifier: email,
      password
    });
    return res.data; // { jwt, user }
  }

  // ─── UI wiring ───────────────────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
    // If already logged in, update header
    const user = getUser();
    if (user) {
      document.querySelector(".header-2-section").insertAdjacentHTML("beforeend", `
        <div class="ms-auto d-flex align-items-center bg-body-secondary justify-content-center">
          <span class="me-3 fs-2 fw-bold ">Welcome, ${user.username || user.email}</span>
          <button id="logoutBtn" class="btn btn-sm btn-btn-outline-primary">Log out</button>
        </div>
      `);
      document.getElementById("logoutBtn").onclick = () => {
        clearSession();
        window.location.reload();
      };
    }

    // ── Login Modal ────────────────────────────────────────────────────────────
    const loginModal = document.getElementById("loginModal");
    const loginBtn   = loginModal.querySelector(".loginBtn .theme-btn");
    loginBtn.addEventListener("click", async e => {
      e.preventDefault();
      const emailEl    = loginModal.querySelector('input[name="email"]');
      const passEl     = loginModal.querySelector('input[name="password"]');
      const email      = emailEl.value.trim();
      const password   = passEl.value;
      if (!email || !password) return showError("Email & password required");
      try {
        const { jwt, user } = await login({ email, password });
        saveSession(jwt, user);
        // hide modal
        bootstrap.Modal.getInstance(loginModal).hide();
        window.location.reload();
      } catch (err) {
        showError(err.response?.data?.error?.message || "Login failed");
      }
    });

    // ── Registration Modal ──────────────────────────────────────────────────────
    const regModal = document.getElementById("registrationModal");
    // we assume the *first* password field is the one to send,
    // the second is “confirm”
    const regBtn   = regModal.querySelector(".form-wrapper .theme-btn");
    regBtn.addEventListener("click", async e => {
      e.preventDefault();
      const usernameEl = regModal.querySelector('input[name="name"]');
      const emailEl    = regModal.querySelector('input[name="email"]');
      const pwEls       = Array.from(regModal.querySelectorAll('input[name="password"]'));
      const username   = usernameEl.value.trim();
      const email      = emailEl.value.trim();
      const password   = pwEls[0].value;
      const confirm    = pwEls[1]?.value;
      if (!username || !email || !password) {
        return showError("All fields are required");
      }
      if (password !== confirm) {
        return showError("Passwords do not match");
      }
      try {
        const { jwt, user } = await register({ username, email, password });
        saveSession(jwt, user);
        bootstrap.Modal.getInstance(regModal).hide();
        window.location.reload();
      } catch (err) {
        showError(err.response?.data?.error?.message || "Registration failed");
      }
    });

    // ── Attach JWT to all future axios calls if we already had one ────────────
    const storedJwt = localStorage.getItem("jwt");
    if (storedJwt) {
      axios.defaults.headers.common.Authorization = `Bearer ${storedJwt}`;
    }
  });
})();
