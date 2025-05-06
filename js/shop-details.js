// js/shop-details.js

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const domain = "http://82.112.241.233:1338";
  const currency = "$";

  const getBookDetails = async () => {
    try {
      const res = await axios.get(`${domain}/api/books/${id}`, {
        params: { populate: "*" }
      });
      return res.data.data;
    } catch {
      window.location.href = "404.html";
    }
  };

  getBookDetails().then(res => {
    if (!res) return;

    // Title & Description
    document.querySelector("#bookName").innerText = res.name;
    document.querySelector("#bookDesc").innerText = res.desc;

    // Additional info
    const addEl = document.querySelector('#bookAdditional');
    if (res.additional) {
      addEl.innerText = res.additional;
    } else {
      addEl.innerText = '';
    }

    // Cover image
    const coverEl = document.querySelector("#bookCover");
    if (res.cover?.url) {
      coverEl.src = `${domain}${res.cover.url}`;
      coverEl.alt = res.name;
    }

    // Price
    const priceToShow = res.salePrice ?? res.price;
    document.querySelector("#bookPrice").innerText = currency + priceToShow;

    // PDF download link
    const pdfEl = document.querySelector("#pdf");
    if (res.content?.url) {
      pdfEl.href = `${domain}${res.content.url}`;
      pdfEl.download = "";
      pdfEl.innerHTML = `<i class="fa-solid fa-file-pdf"></i> Download PDF`;
      pdfEl.style.display = "inline-block";
    } else {
      pdfEl.style.display = "none";
    }

    // ─── AUDIO PREVIEW (15-minute cap) ────────────────────────────────────────
    const audioItem = Array.isArray(res.audio) ? res.audio[0] : res.audio;
    const audioUrl  = audioItem?.url;                     // now picks the first file
    const audioBtn  = document.getElementById("audioBtn");
    const audioEl   = document.getElementById("audioPlayer");
    const MAX_PREVIEW = 15 * 60;   

    if (audioUrl) {
      const src = `${domain}${audioUrl}`;
      audioEl.src            = src;
      audioEl.style.display  = "none";
      audioBtn.style.display = "inline-block";

      // start playback on click
      audioBtn.addEventListener("click", () => {
        audioEl.style.display  = "inline-block";
        audioEl.play();
      });

      // stop after preview limit
      audioEl.addEventListener("timeupdate", () => {
        if (audioEl.currentTime >= MAX_PREVIEW) {
          audioEl.pause();
          // audioEl.style.display  = "none";
          alert("15-minute preview ended.");
        }
      });

      // prevent seeking past limit
      audioEl.addEventListener("seeking", () => {
        if (audioEl.currentTime > MAX_PREVIEW) {
          audioEl.currentTime = MAX_PREVIEW;
        }
      });
    } else {
      audioEl.style.display  = "none";
      audioBtn.style.display = "none";
    }

    // Add-to-cart button wiring
    const btn = document.getElementById("addToCartBtn");
    btn.dataset.id    = String(res.id);
    btn.dataset.name  = res.name;
    btn.dataset.price = (priceToShow).toFixed(2);
    btn.dataset.cover = res.cover?.url ? `${domain}${res.cover.url}` : "";
  });
});
