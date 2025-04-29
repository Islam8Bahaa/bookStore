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

    // Inject your new `additional` field:
    const addEl = document.querySelector('#bookAdditional');
    if (res.additional) {
      addEl.innerText = res.additional;
    } else {
      addEl.innerText = '';  // or hide the element
    }

    // Cover image
    const coverEl = document.querySelector("#bookCover");
    if (res.cover?.url) {
      coverEl.src = `${domain}${res.cover.url}`;
      coverEl.alt = res.name;
    }

    // Price (salePrice if present, else price)
    const priceToShow = res.salePrice ?? res.price;
    document.querySelector("#bookPrice").innerText = currency + priceToShow;

    // PDF download link
    const pdfEl = document.querySelector("#pdf");
    if (res.content?.url) {
      pdfEl.href = `${domain}${res.content.url}`;
      pdfEl.download = "";
      pdfEl.innerText = "Download PDF";
      pdfEl.style.display = "inline-block";
    } else {
      pdfEl.style.display = "none";
    }

    const btn = document.getElementById("addToCartBtn");
    btn.dataset.id    = String(res.id);
    btn.dataset.name  = res.name;
    btn.dataset.price = ((res.salePrice ?? res.price)).toFixed(2);
    btn.dataset.cover = res.cover?.url
        ? `${domain}${res.cover.url}`
        : "";
  });
});
