import React, { useState } from 'react';

const Edit = ({ product}) => {
    //Valores recibidos
    const [id, setId] = useState(product.id);
    const [name, setName] = useState(product.name);
    const [color, setColor] = useState(product.color);
    const [size, setSize] = useState(product.size);
    const [brand, setBrand] = useState(product.brand);

    const [isDifferentEndpoint, setIsDifferentEndpoint] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsDifferentEndpoint(event.target.checked);
    };

    //Creacion de funcion para enviar el formulario como solicitud PUT
    const handleEditSubmit = (event) => {
        event.preventDefault();
        const updatedProduct = {
          name: event.target.name.value,
          color: event.target.color.value,
          size: event.target.size.value,
          brand: event.target.brand.value,
        };
        fetch(`http://localhost:24/api/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      };
    

    return (
        <div className="formDiv">
            <form onSubmit={handleEditSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            
                <label htmlFor="color">Color</label>
                <input type="text" id="color" value={color} onChange={(e) => setColor(e.target.value)} />
            
                <label htmlFor="size">Size</label>
                <input type="text" id="size" value={size} onChange={(e) => setSize(e.target.value)} />
            
                <label htmlFor="brand">Brand</label>
                <input type="text" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
            
                <div className="buttonContainer">
                    <button className='buttonAdd' type="submit">Submit</button>
                </div>
            </form>
        </div>
      );
}

export default Edit;