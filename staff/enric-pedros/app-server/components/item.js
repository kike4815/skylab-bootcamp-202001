
const Details = require('./details')
module.exports=function (props={}) {
    const { item: { id, name, thumbnail, price, isFav } }= props
    return `<li className="results--item item">
        <form action="/favs/${id}" method="POST"><button type='submit'> ${isFav ? `<span> '💖'</span>` :`<span> '🤍'</span>` }</button></form>
        <h3>${name}</h3>
        <form action='/details/${id}' method='GET'><button type='submit'name='query' value=${id}><img src=${thumbnail}></button></form>
        <span>${price} €</span>
    </li>`
}