const button = document.getElementById("submit");
const results = document.getElementById("results");
const clipboardB = document.getElementById("clipboardB");
let url = "https://instagram.com/akbarcoder";
button.addEventListener("click", async (e) => {
  const postData = async (postUrl, url = {}) => {
    const res = await fetch(postUrl, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(url),
    });
    try {
      return await res.json();
    } catch (error) {
      console.log("error", error);
    }
  };
  fullUrl = document.getElementById("urlInput").value;
  console.log(fullUrl);
  let response = postData("http://localhost:2000/fUrl", {
    url: fullUrl,
  });
  response = await response;
  console.log(response.fU);
  results.innerHTML = `You short url: <a class="shortUrl" href="${response.fU}" target="_blank">${response.fU}</a>`;
  url = response.fU;
});
function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}
clipboardB.addEventListener("click", (e) => {
  copyToClipboard(url);
  clipboardB.innerHTML = "Copied short url!!!";
  setTimeout(() => {
    clipboardB.innerHTML = "Copy short url!";
  }, 3000);
});
