import React, { useEffect } from 'react'
import './Item.sass'

export default function ({ _sail }) {


    return  <div className="container-item">
    <div className="container-item__image">
        <img src="img/bh_aerolight_disc.jpg" alt=""/>
    </div> 

    <div className="container-item__info">
        <h3>{_sail.title}</h3>
        <p>{_sail.description}</p>
        <div className="container-item__prices">

            <p className="container-item__price">{_sail.price}</p>
            <p className="container-item__discounted">{_sail.price} €</p>
        </div>

        <div className="container-item__tocart"><a href="#">Add To Cart</a></div>

    </div>
</div>  

}//que no estoy seguro de que a vos se te baje la imagen en si desde la api...yo creo que a vos se te baja el nombre pero cuando se baja el nombre tendrias que hacer una llamada a api para pedirle la imagen guardada, me explico?
// dentro de badabici-data  // pictures => tengo la imagen guardada de como se queda  "grabada" en la DB es un nombre super largo . jpg
// vale, pero acordate que la imagen en si no se guarda en base de datos, se guarda una referencia. Eso es lo que entendi yo por lo menos de los chicos que usan fotos
//si a vos te esta llegando ese churro super largo no creo que sea correcto. para mi desde api cuando vas a mandara sails tenes que no solo buscar la imagen en db si no tambien en la logica pedirla al fichero donde se guardan realmente
// mmmmm, ui, no se me ocurre lo que dices....
// Osea, todo ese lio que les hace hacer manu con las imagenes...es porque no se pueden guardar en base de datos...se guardan en un storage aparte...que en tu caso es en disco local en el ordenador
//entonces cuando a vos pedis una imagen a la api, la api con la referencia que tiene en base de datos tiene que use fs(file system) para leer esa imagen que esta en disco y ahi mandarla.
//Pero acordate NO se guarda la imagen en db  // y eso no se puede hacer (fs)desde el compo / logica de APP?
// No creo, porque ahora vos tenes acceso a tu disco, pero puede ser
//eso ya no se...pero acordate que vos ahora estas corriendo React en node pero normalmente no es asi asi que fs no existe
//Estoy bastante seguro que lo tenes que ahcer desde la logica de API, preguntale alex que ya pinta imagenes en su app
// alex park? Si // que jodienda esto de las imageenes
//jajaj sisi tiene su juego...por eso yo lo dejo como extra...ya bastante problemas tengo. Pero a vos no te queda otra jajaj
//esta claro... juer , bueno a ver si pillo uno de los 2 i me hacen ver la luz porque sin imagenes no hay paraiso
//Mira alex ya las pinto, y ramon tenia bastante claro lo de las imagenes tambien me parece
////ok! hare eso, voy a cenar algo i luego les digo algo a ver...
