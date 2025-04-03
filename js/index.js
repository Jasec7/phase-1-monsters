document.addEventListener('DOMContentLoaded', () => {
    console.log('monster')
    createMonster()
    let currentPage = 1;
    displayMonster(currentPage)

    const form = document.querySelector('form')
    form.addEventListener('submit',(e) =>{
        e.preventDefault()
        console.log(e)
        const name = document.getElementById('name')
        const age = document.getElementById('age')
        const description = document.getElementById('description')
        
        let newMonster= {
            name: name.value,
            age: age.value,
            description: description.value
        }
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
           'content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(newMonster)
    })
    const li = buildMonster(newMonster)
    const ul = document.querySelector('#monster-container ul')
     ul.appendChild(li)
        form.reset()
        
    });
    const back = document.getElementById('back')
    back.addEventListener('click',()=>{
        currentPage -= 1;
        displayMonster(currentPage) 

    });

    const forward = document.getElementById('forward')
    forward.addEventListener('click',()=>{
        currentPage += 1;
        displayMonster(currentPage) 
        console.log("Current page:", currentPage)
    });
})

function displayMonster(page){
    const divMonster = document.querySelector('#monster-container')
    divMonster.innerHTML = ''
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(data => {
        const ul = document.createElement('ul')
        data.forEach(monster => {
        const li = buildMonster(monster)
        ul.appendChild(li);
    })
    divMonster.appendChild(ul)
    console.log(data)
})
console.log(`Fetching monsters for page ${page}`)
}

function buildMonster(monster){
    const divMonster = document.querySelector('#monster-container')
    const li = document.createElement("li")
    li.textContent = `Name: ${monster.name}. Age: ${monster.age}. Description: ${monster.description}`
    return li;
};

function createMonster(){
const createMonst = document.getElementById('create-monster')
const form = document.createElement('form')
const nameInput = document.createElement('input')
const ageInput = document.createElement('input')
const descriptionInput = document.createElement('input')
const btn = document.createElement('button')

nameInput.id = 'name'
nameInput.type = 'text'
nameInput.placeholder = 'Name' 

ageInput.id = 'age'
ageInput.type = 'number'
ageInput.placeholder = 'Age'

descriptionInput.id = 'description'
descriptionInput.type = 'text'
descriptionInput.placeholder = 'Description'

btn.id = 'button'
btn.textContent = 'Create Monster'

form.appendChild(nameInput)
form.appendChild(ageInput)
form.appendChild(descriptionInput)
form.appendChild(btn)

createMonst.appendChild(form)
};



