import Handlebars from 'handlebars'
import header from './pages/header.js'
import footer from './pages/footer.js'
import { sum } from './pages'
import './css/scss/style.scss'

const pages = {
    home: import('./pages/home.js'),
    projects: import('./pages/projects.js'),
    contact: import('./pages/contact.js')
}

let source = `
<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    ${header}
    <main role="main" class="inner cover px-3"></main>
    ${footer}
</`

// document.body.innerHTML = source;
let template = Handlebars.compile(source);

let someData = {};
let html = template(someData);
document.body.innerHTML = html;

const mainEl = document.querySelector('main');

renderPage('home');

let renderPage = async function(name) {
    let temp = pages[name]
    debugger;
    let template = await pages[name]
    mainEl.innerHTML = template.default
    debugger;
    mainEl.insertAdjacentHTML('beforeend', `
        <output>
            Result of 1 + 2 -> <span>${sum(1,2)}</span>
        </output>
    `)
    debugger;
}

const toggleClass = (activeLink, currentLink) => {
    if(activeLink === currentLink) {
        return ;
    } else {
        activeLink.classList.remove('active')
        currentLink.classList.add('active')
    }
}

const initClickHandlers = () => {
    const navEl = document.querySelector('nav')

    navEl.addEventListener('click', ev => {
        if (ev.target.tagName === 'A') {
            const activeLink = navEl.querySelector('.active')
            const currentLink = ev.targer
            toggleClass(activeLink, currentLink)
            renderPage(currentLink.name)
        }
    })
}
