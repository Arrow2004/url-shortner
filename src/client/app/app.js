const button = document.getElementById('submit');
const results = document.getElementById('results')
button.addEventListener('click', (e) =>{
    const postData = async(postUrl, url = {}) => {
        const res = await fetch(postUrl, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(url),
        })
        try {
            return await res.json()
        } catch (error) {
            console.log('error', error)
        }
         }
    fullUrl = document.getElementById('urlInput').value;
    console.log(fullUrl)
    const response = postData('http://localhost:2000/fUrl', {
    url: fullUrl,
    })

    response.then((res) => {
        console.log('Response keldi');
        console.log(res);
        results.innerHTML = `You short url: <a class="shortUrl" href="${res.fU}" target="_blank">${res.fU}</a>`
    })
})
function copyFunction() {
    var copyText = document.getElementsByTagName("a");
    var input = document.getElementById('clipboard')
    input.value = copyText[0].innerHTML;
    input.select();
    document.execCommand('copy');
    document.getElementById('clipboardB').innerHTML = 'Copied this url'
  }