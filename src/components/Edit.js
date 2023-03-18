import React, { useState } from 'react';

function Edit({ product, onUpdate }) {
  const [formData, setFormData] = useState(product);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    onUpdate(formData);
  };

  return (
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
                <div className="buttonContainer">
                    <button type="submit" className='buttonAdd'> Submit </button>
                </div>
            </form>
            
        </div>
  );
}

export default Edit;