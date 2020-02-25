

module.exports = (req,res)=>{
    const {session:{query}} = req

    res.redirect(`/search?query=${query}`)
} 