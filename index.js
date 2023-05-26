const draggableList = document.querySelector('ul');
const check = document.querySelector('button');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

let listItems = []
let dragStartIndex;


createList()
function createList() {
    richestPeople.map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement('li')
            listItem.setAttribute('data-index', index)
            listItem.innerHTML = `
       <span class="number">${index + 1}</span>
       <div class="draggable" draggable = "true">
         <span class="person-name">${person}</span>
         <span class="icon"><ion-icon name="reorder-two-outline"></ion-icon></span>
       </div>
       `
            draggableList.appendChild(listItem)
            listItems.push(listItem)
        })

    drag()
}


function drag() {
    const draggableItems = draggableList.querySelectorAll('ul li')
    const draggable = document.querySelectorAll('.draggable');

    draggable.forEach(draggableItem => {
        draggableItem.addEventListener('dragstart', dragStart)
    })

    draggableItems.forEach(item => {
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', drop)
        item.addEventListener('dragleave', dragLeave)
    })
}


function dragStart() {
    dragStartIndex = this.closest('li').dataset.index
}

function dragEnter() {
    this.classList.add('over')
}

function dragOver(e) {
    e.preventDefault()
}

function dragLeave() {
    this.classList.remove('over')
}

function drop() {
    const dragEndIndex = this.closest('li').dataset.index;
    swapItems(dragStartIndex, dragEndIndex)
    this.classList.remove('over')
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}

function checkOrder() {
    listItems.forEach((item, index) => {
        const personName = item.querySelector('.draggable').innerText.trim()
        if (personName != richestPeople[index])
            item.classList.add('wrong')
        else {
            item.classList.add('right')
            item.classList.remove('wrong')
        }
    })
}

check.addEventListener('click', checkOrder)