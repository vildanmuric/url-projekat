function dodavanje(){

  const para = document.createElement('p');
  const url = document.getElementById('url').value;
  const button = document.createElement('button');
  const button2 = document.createElement('button');
  const copiedText = document.createElement('p');
  copiedText.style.color = '#0460FB';
  copiedText.textContent = 'Link je uspjesno kopiran!';
  copiedText.classList.add("copied-text");
  button.setAttribute('class', 'styled-button');
  button2.setAttribute('class', 'styled-button2');

  button.textContent='Copy';
  button.style.backgroundColor='#0460FB';
  button.style.color='white';
  button.style.borderRadius = '.6em';
  button.style.borderWidth = '2.5px 0 0 2.5px';
  button.style.borderColor = 'none';
  button.style.border = 'none'
  button.style.padding ='.6em 1em';
  button.style.marginLeft='1.9em';
  button.style.fontFamily='Montserrat, sans-serif';
  button.style.cursor = 'pointer';
  button.style.borderStyle = 'solid';
  
  button2.textContent='X';
  button2.style.backgroundColor='#9bb3dc';
  button2.style.color='white';
  button2.style.borderRadius = '.6em';
  button2.style.borderWidth = '2.5px 0 0 2.5px';
  button2.style.borderColor = 'none';
  button2.style.border = 'none'
  button2.style.padding ='.6em 1em';
  button2.style.marginLeft='1.9em';
  button2.style.fontFamily='Montserrat, sans-serif';
  button2.style.cursor = 'pointer';
  button2.style.borderStyle = 'solid';

  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/([^\s]*))?$/;
if (!url.match(urlPattern)) {
  alert("Invalid URL. Please enter a valid URL starting with http:// or https://");
  return;
}

const apiUrl = `https://api.shrtco.de/v2/shorten?url=${url}`;
fetch(apiUrl)
.then((response) => response.json())
.then((data) => {
  const node = document.createTextNode(data.result.short_link)
  para.appendChild(node);
  para.appendChild(button);
  para.appendChild(button2);
  document.getElementById('paragraf').appendChild(para);

  button.addEventListener('click', ()=>{
    const range = document.createRange();
    range.selectNode(node);
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
    document.body.appendChild(copiedText);
    copiedText.classList.add('animated');
  })

})
.catch((error) => {
  alert("An error occurred while shortening the URL. Please try again.");
});

  button2.addEventListener('click', ()=>{
    para.remove();
  })

  copiedText.addEventListener('animationend', ()=>{
    document.body.removeChild(copiedText);
  })
  

}

if (typeof(Storage)!=='undefined'){
  if (localStorage.pageState) {
    document.getElementById('linkovi') = localStorage.pageState;
  }
}

window.addEventListener('unload', ()=>{
  localStorage.pageState = document.getElementById('linkovi');
})