'use strict'


function Results(props) {
    var list  = document.createElement('ul')
    list.classList.add('list')

    Component.call(this, list)
    
    props.results.forEach(function (element) {
        var resultItem = document.createElement('li')
        var title = document.createElement('h3')
        var link = document.createElement('a')
        link.target = '_blank'
        var rating = document.createElement('span')
        var description = document.createElement('p')
        title.innerText = element.title
        description.innerText = element.description
        link.href = element.link
        if(element.rating) {
            rating.innerText = element.rating
        }
        list.appendChild(resultItem)
        resultItem.appendChild(link)
        if(element.rating) {
            resultItem.appendChild(rating)
        }
        resultItem.appendChild(description)
        link.appendChild(title)
    })
}

Results.prototype = Object.create(Component.prototype)
Results.prototype.constructor = Results