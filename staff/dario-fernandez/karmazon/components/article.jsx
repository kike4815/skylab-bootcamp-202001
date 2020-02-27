function Article({ result: { id, name, thumbnail, price, isFav }, onClick, onFavClick }){
    return <li className="article">
        <h3 className="article__name" onClick={ () =>onClick(id)}>{name}</h3>
        {isFav && <i className="fas fa-heart article__fav article__fav--faved" onClick={() => onFavClick(id)}></i>}
        {!isFav && <i className="fas fa-heart article__fav " onClick={() => onFavClick(id)}></i>}
        <img className="article__photo" src={thumbnail} onClick={ () =>onClick(id)} />
        <span className="article__price">{price}$</span>
    </li>
}