/*fetch('https://skylabcoders.herokuapp.com/api/hotwheels/vehicles?q=nissan&price=50%3C100')
    .then(res => res.json())
    .then(vehicles => 
        fetch('https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/' + vehicles[0].id)
    )
    .then(res => res.json())
    .then(console.log)/**/

; (async () => {
    const res = await fetch('https://skylabcoders.herokuapp.com/api/hotwheels/vehicles?q=nissan&price=50%3C100')

    const vehicles = await res.json()

    const res2 = await fetch('https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/' + vehicles[0].id)

    console.log(await res2.json())
})()