function Results ({ results, onClick, onFavClick }){
    return <ul className="list">
        {results.map(result => <Article key={result.id} result={ result } onClick= { onClick } onFavClick={onFavClick} />)}
    </ul>
}