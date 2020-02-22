function Item({item:{id, name, thumbnail, price},  onItemClick}) {
    return <li onClick={()=>onItemClick(id)}>
        <h3>{name}</h3>
        <img src={thumbnail} />
        <span>{price}</span>
    </li>
}