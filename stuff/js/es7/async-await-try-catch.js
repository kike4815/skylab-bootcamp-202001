function findFirstVehicleByPrice(value) {
    if (typeof value !== 'number') throw new TypeError(`${value} is not a number`)

    return (async () => {
        const res = await fetch(`https://skylabcoders.herokuapp.com/api/hotwheels/vehicles?price=${value}`)

        const vehicles = await res.json()

        if (!vehicles.length) throw new Error(`no vehicles with price ${value}`)

        const res2 = await fetch(`https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/${vehicles[0].id}`)

         return await res2.json()
        
           })()
}

/*try {
    findFirstVehicleByPrice('1000')
        .then(console.log)
        .catch(console.error)
} catch(error) {
    console.error(error)
}/**/

; (async ()=> {
    try {
        const vehicle = await findFirstVehicleByPrice('1000')

        console.log(vehicle)
    } catch(error) {
        console.error(error)
    }
})()