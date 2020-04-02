
import React, { useEffect } from 'react'
import './Addproduct.sass'
import Blogo from '../img/Blogo.png'


export default function ({ goToCreate, onGoToSearch}) {
   
    function handleSubmit(event) {
        event.preventDefault()

        const { target: {
            category: { value: category },
            subcategory: { value: subcategory },
            title: { value: title },
            description: { value: description },
            price: { value: price },
            // image: { files: image },
            quantity: { value: quantity },
            discount: { value: discount }
            
            
        } } = event
        const [image] = event.target.image.files

        goToCreate(category,subcategory,title,description,price,image,quantity,discount)
    }
    function handleGoToSearch(event) {
        event.preventDefault()

        onGoToSearch()
    }

    return <>
            <h2>AÑADIR PRODUCTO</h2>

            <form  className="createProduct" onSubmit={handleSubmit}>
                <div className="imgcontainer">
                    <img src={Blogo} alt="Avatar" className="avatar"/>
                </div>

                    <div className="container-inputs">
                        <label name="category"><b>categoria</b></label>
                        <input type="text" className='container-inputs__text' placeholder="Enter category" name="category" required/>

                        <label name="subcategory"><b>subcategoria</b></label>
                        <input type="text" className='container-inputs__password' placeholder="Enter Subcategory" name="subcategory" required/>

                        <label name="titulo"><b>titulo</b></label>
                        <input type="text" className='container-inputs__password' placeholder="Enter title" name="title" required/>

                        <label name="descripcion"><b>description</b></label>
                        <textarea rows='5' className='container-inputs__password' placeholder="Enter Description" name="description" required/>

                        <label name="precio"><b>price</b></label>
                        <input type="text" className='container-inputs__password' placeholder="Enter Price" name="price" required/>

                        <label name="imagen"><b>image</b></label>
                        <input type="file" className='container-inputs__password' placeholder="Enter image" name="image" accept="image/*" required/>
                        
                        <label name="cantidad"><b>quantity</b></label>
                        <input type="text" className='container-inputs__password' placeholder="Enter quantity" name="quantity" required/>

                        <label name="descuento"><b>discount</b></label>
                        <input type='text' className='container-inputs__password' placeholder="Enter Discount" name="discount" required/>


                            <input type ='submit' className='button-login'value ='crear'/>

                    </div>


                            <div className="container-links">
                                <span className="psw"><a href="#" className="goBack" onClick={handleGoToSearch}>Go Back</a></span>
                            </div>
    
            </form>
        </>
}