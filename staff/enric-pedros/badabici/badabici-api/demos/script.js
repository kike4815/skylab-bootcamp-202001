const { mongoose } = require('../../badabici-data')
const { models: { Product } } = require('../../badabici-data')
const fs = require('fs')
const path = require('path')
mongoose.connect('mongodb://localhost:27017/badabici', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const products = []
        products.push(new Product({
            category: 'bicicleta',
            subcategory: 'montaña',
            title: 'ORBEA GHOST-5',
            description:'bici de montaña con cuadro de fibra de carbono apta para terrenos montañosos y de alta exigencia',
            price: '1000 €',
            image: 'megamo-proof.jpg',
            quantity: '10',
            discount: 5
        })
        // , new Product({
            //per posar més productes
        // })
        )
        products.forEach(product => {
            fs.copyFile(path.join(__dirname,`/pictures/${product.image}`, ), path.join(__dirname, `../../badabici-data/pictures/${product._id}.jpg`), (err) => {
                if (err) throw err;
                console.log('source.txt was copied to destination.txt');
            });
            product.image = `http://localhost:8080/imagen/${product._id}`
        })
       
        return Promise.all(Product.create(products).then(() => mongoose.disconnect()))
    })





