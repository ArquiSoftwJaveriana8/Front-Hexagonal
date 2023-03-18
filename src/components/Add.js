import React, {useState} from "react";

function Add(){
    const [isDifferentEndpoint, setIsDifferentEndpoint] = useState(false);

    

    const handleCheckboxChange = (event) => {
        setIsDifferentEndpoint(event.target.checked);
    };

    //Se crea un estado para el metodo POST para guardar los datos del formulario 
    const [formData, setFormData] = useState({
        name: '',
        color: '',
        size: '',
        brand: '',
    });

    //Poner la informacion actualizada
    const handleInputChange = (event) => {
        setFormData({
          name: formData.name,
          color: formData.color,
          size: formData.size,
          brand: formData.brand,
          [event.target.name]: event.target.value
        });
    };

    //Creacion de funcion para enviar el formulario como solicitud POST
    const handleSubmit = async (event) => {
        event.preventDefault();
        const endpoint = isDifferentEndpoint ? 'http://localhost:24/api/products-xml' : 'http://localhost:24/api/products';
        let body = null;
        let contentType = null;
        if (isDifferentEndpoint) {
          // Si se debe enviar como XML
          const formData = new FormData(event.target);
          body = formData;
          contentType = "multipart/form-data";
        } else {
          // Si se debe enviar como JSON
          body = JSON.stringify(formData);
          contentType = "application/json";
        }
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': contentType
          },
          body: body
        });
        console.log(formData.color)
        const data = await response.json();
        console.log(data);
      };

    return(
        <div className="formDiv">
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label>
                <label>
                    Color
                    <input type="text" name="color" value={formData.color} onChange={handleInputChange} />
                </label>
                <label>
                    Size
                    <input type="text" name="size" value={formData.size} onChange={handleInputChange} />
                </label>
                <label>
                    Brand
                    <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} />
                </label>
                <div>
                    <div>
                        <label htmlFor="differentEndpoint"> Save as a local file</label>
                    </div>
                    <input type="checkbox" id="differentEndpoint" class="myCustomCheckbox"  name="differentEndpoint" onChange={handleCheckboxChange} />
                </div>

                <div className="buttonContainer">
                    <button type="submit" className='buttonAdd'> Submit </button>
                </div>
            </form>
            
        </div>
    );
}

export default Add;