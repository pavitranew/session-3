const nav = document.getElementById('main');
const navbar = nav.querySelector('.navitems');
const siteWrap = document.querySelector('.site-wrap');

fetchLab(null, function (content) {
  const markup =
  `<ul>
  ${content.map(
    listItem => `<li><a href="#${listItem.label}">${listItem.label}</a></li>`
  ).join('')}
  </ul>`;
  navbar.innerHTML = markup;
})

let topOfNav = nav.offsetTop;

function fixNav() {
  if(window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}


function navigate() {
  let newloc = location.hash.substr(1);
  fetchLab(newloc, function (content) {
    let newContent = content.filter(contentItem => contentItem.label == newloc);
    siteWrap.innerHTML = `
    <h2>${newContent[0].header}</h2>
    ${newContent[0].content}
    `;
  })
}

function fetchLab(hash, callback) {
  fetch('https://api.mlab.com/api/1/databases/bcl/collections/entries?apiKey=oZ92RXFzah01L1xNSWAZWZrm4kn6zF0n')
  .then( (response) => {
    if (response.status != 200) {
      window.alert("Sorry, looks like there's been an error" + response.status);
      return;
    }
    response.json().then(function(data) {
      let api = data;
      callback(api);
    })
  })
}

// function fetchData(hash, callback) {
//   var xhr = new XMLHttpRequest();
  
//   xhr.onload = function () {
//     callback(JSON.parse(xhr.response));
//   };
  
//   xhr.open('GET', 'http://localhost:3004/content', true);
//   xhr.send();
// }


if (!location.hash) {
  location.hash = '#watchlist';
}

navigate();

window.addEventListener('scroll', fixNav);
window.addEventListener('hashchange', navigate);



const logo = document.querySelector('.logo')

logo.addEventListener('click', showMenu);

function showMenu(e) {
  document.body.classList.toggle('show');
  const navLinks = document.querySelectorAll('.navitems a');
  navLinks.forEach(link => link.addEventListener('click', dump))
  console.log(navLinks)
  e.preventDefault();
}

function dump(){
  document.body.classList.toggle('show');
}