function Results({ results, onItemClick}) {
    
    return <ul className="results">

        {results.map(item => {
            
            return <Item key={item.id} item={item}  onItemClick={onItemClick}/>
    
        })}

    </ul>
}