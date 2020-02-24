

module.exports=function (props={}) {
    const { result: { id, name, year, price, image, color, maker, collection, description, url, isFav }, query }=props
    return `<li>
        <form action='/back'method='GET'><button>Go Back</button></form>
        <h3>${name} (${year})</h3>
        <img src=${image} />
        <span>${price} €</span>
        <p>${color}</p>
        <p>${maker}</p>
        <p>${collection}</p>

        <p>${description}</p>
        <a href=${url}>click HERE!!!!</a>
    </li>`
}