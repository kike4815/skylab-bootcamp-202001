function Search({ title, onSubmit }) {
    return <form className="search" onSubmit={event=> {
        event.preventDefault()
        const query = event.target.query.value
        onSubmit(query)
    }}>
        <h2>{title}</h2>
        <input type="text" name="query" placeholder="criteria" />
        <button type="submit">Search</button>

    </form>
    
    
    
} 
    
    
    
    
    
    
    
    
   