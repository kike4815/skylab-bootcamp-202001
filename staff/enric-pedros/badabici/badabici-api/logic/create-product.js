const { validate } = require('badabici-utils')
const { models: { User,Product } } = require('badabici-data')
const { NotAllowedError } = require('badabici-errors')

module.exports = (id, category,subcategory,title, description,price,image,quantity,discount) => {
    validate.string(category, 'category')
    if(subcategory) validate.string(subcategory, 'subcategory')
    validate.string(title,'title')
    validate.string(description, 'description')
    validate.string(price, 'price')
    if(image) validate.string(image, 'image')
    validate.string(quantity,'quantity')
    validate.type(discount,'discount',Number)
    
    return User.findOne({_id:id, role: 'superadmin'})
        .then(user => {
            
            if (!user) throw new NotAllowedError(`this user ${id} is not the superadmin`)

            const product = new Product({ category,subcategory,title,description,price,image,quantity,discount })

            return product.save()
        })
        .then(() => { })
}