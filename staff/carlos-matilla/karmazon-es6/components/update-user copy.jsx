function UpdateUser({onSubmit}){


   const onSubmitUpdated = (e)=>{
        e.preventDefault()
        const name = e.target.updateName.value
        const surname = e.target.updateSurname.value
        const username = e.target.updateUsername.value
        
        onSubmit(name, surname, username)
    }

    return <form className="update" onSubmit={onSubmitUpdated}>
        <h3>Update</h3>
        <input type="text" name="updateName" placeholder="New Name" />
        <input type="text" name="updateSurname" placeholder="New Surname"/>
        <input type="text" name="updateUsername" placeholder="New Username"/>
        <button type="submit">Update</button>
    </form>




}