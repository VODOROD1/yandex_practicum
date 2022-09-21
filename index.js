import * as stable from "core-js/stable"
import * as runtime from "regenerator-runtime/runtime"
import header from './src/js/header.js'
import footer from './src/js/footer.js'
import { sum } from './src/js/index.ts'
import './src/css/style.css'
import './src/css/style.scss'

const pages = {
    home: import('./src/js/home.js'),
    projects: import('./src/js/projects.js'),
    contact: import('./src/js/contact.js')
}

document.body.innerHTML = `
    <div>
        ${header}
        <main role="main" class="inner cover"></main>
        ${footer}
    </div>
`

const mainEl = document.querySelector('main');

let renderPage = async function(name) {
    let template = await pages[name]
    mainEl.innerHTML = template

    mainEl.insertAdjacentElement('beforeend', `
        <output>
            Result of 1 + 2 -> <span>${sum(1,2)}</span>
        </output>
    `)
}

renderPage('home');

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
