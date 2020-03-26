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
        }),
        new Product({
            category: 'bicicleta',
            subcategory: 'montaña',
            title: 'BH-DISC4',
            description:'bici de montaña con cuadro de fibra de carbono apta para carretera para semi-profesionales',
            price: '3000 €',
            image: 'bh-disc4.jpg',
            quantity: '10',
            discount: 10
        }),
        new Product({
            category: 'bicicleta',
            subcategory: 'montaña',
            title: 'BH-G8',
            description:'bici de montaña con cuadro de fibra de carbono apta para carretera para profesionales',
            price: '8999 €',
            image: 'bici-bh-g8.jpg',
            quantity: '5',
            discount: 5
        }),    
        new Product({
            category: 'bicicleta',
            subcategory: 'montaña',
            title: 'WILLIER CENTO',
            description:'bici de montaña con cuadro de fibra de carbono apta para terrenos montañosos y de alta exigencia',
            price: '2899 €',
            image: 'willier-cento.jpg',
            quantity: '15',
            discount: 15
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





