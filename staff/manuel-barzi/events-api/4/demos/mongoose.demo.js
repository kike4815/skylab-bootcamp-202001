const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        const cat = {
            name: { type: String, required: true }
        }

        const Cat = mongoose.model('Cat', cat)

        const kitty = new Cat({ name: 'Garfield' })

        return kitty.save()
            .then(() => console.log('meow'))

    })
    .then(() => mongoose.disconnect())