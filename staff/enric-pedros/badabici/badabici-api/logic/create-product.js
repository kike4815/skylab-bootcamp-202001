const { validate } = require('badabici-utils')
const { models: { User,Product } } = require('badabici-data')
const { NotAllowedError } = require('badabici-errors')
const fs = require('fs').promises
const path = require('path')

const filesDir = path.join(__dirname, `../data/products`)

module.exports = (userId, category,subcategory,title, description,price,quantity,discount) => {
    validate.string(category, 'category')
    if(subcategory) validate.string(subcategory, 'subcategory')
    validate.string(title,'title')
    validate.string(description, 'description')
    validate.string(price, 'price')
    validate.type(quantity,'quantity',String)
    // validate.type(discount,'discount',Number)
    
    category= category.toLowerCase()
    subcategory = subcategory.toLowerCase()
    title = title.toLowerCase()
    description = description.toLowerCase()
    price = price.toLowerCase()
    quantity = quantity.toLowerCase()


   
    return User.findOne({_id:userId, role: 'superadmin'}) 
        .then(user => {
            
            if (!user) throw new NotAllowedError(`this user ${userId} is not the superadmin`)

            const product= new Product({ category,subcategory,title,description,price,quantity,discount })
            return Promise.all([product.save()])
            .then(() => fs.mkdir(path.join(filesDir, product.id)))
            .then(() => product.id)
        })
        // .then( ({id} )=> id )
}