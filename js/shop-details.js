const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const domain = "http://82.112.241.233:1338";
const currency = "$";

const getBookDetails = async () => {
  let final = {};
  await axios
    .get(domain + `/api/books/${id}`, { params: { populate: "*" } })
    .then((res) => {
      final = res.data.data;
    })
    .catch(() => {
      window.location.href = "404.html";
    });
  return final;
};

getBookDetails().then((res) => {
  document.querySelector("#bookName").innerText = res.name;
  document.querySelector("#bookDesc").innerText = res.desc;
  document
    .querySelector("#bookCover")
    .setAttribute("src", `${domain}${res.cover.url}`);
  document.querySelector("#bookPrice").innerText =
    currency + res.salePrice || res.price;
  document.querySelector("#pdf").innerText = res.content.url;
});
