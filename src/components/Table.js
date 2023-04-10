import React, { useState, useEffect } from 'react';
import xml2js from 'xml2js';
import Edit from './Edit';

//metodo GET
function Table() {
  const [data, setData] = useState([]);
  const [dataxml, setDataxml] = useState([]);

  useEffect(() => {
    //Informacion JSON
    fetch('http://localhost:24/api/products')
      .then(response => response.json())
      .then(data => setData(data.products))
      .catch(error => console.log(error));


    /*fetch('http://localhost:24/api/products-xml')
    .then(response => response.text())
    .then(data => {
      xml2js.parseString(data, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const products = result.products;
          const xmlData = [];
          for (let i = 0; i < products.id.length; i++) {
            const product = {
              id: products.id[i],
              name: products.name[i],
              color: products.color[i],
              size: products.size[i],
              brand: products.brand[i],
              createdAt: products.createdAt[i],
              updatedAt: products.updatedAt[i]
            };
            xmlData.push(product);
          }
          //setDataxml(xmlData);
        }
      });
    })
    .catch(error => console.log(error));*/
  }, []);

  //Metodo DELETE
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:24/api/products/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        //getProducts();
      } else {
        throw new Error("Error eliminando el producto");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Metodo PUT
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEditClick = (id) => {
    setSelectedProduct(data.find(item => item.id === id));
    setShowForm(true);
  };
  

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Color</th>
            <th>Size</th>
            <th>Brand</th>
            <th className='buttonColum'>Delete</th>
            <th className='buttonColumEdit'>Modify</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.color}</td>
              <td>{item.size}</td>
              <td>{item.brand}</td>
              <td><button onClick={() => handleDelete(item.id)} className='deleteB'>Delete</button></td>
              <td>
                {showForm ? (
                  <button className='modify' disabled>Modify</button>
                ) : (
                  <button className='modify' onClick={() => handleEditClick(item.id)}>Modify</button>
                )}
              </td>
            </tr>
          ))}
          {dataxml.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.color}</td>
                <td>{item.size}</td>
                <td>{item.brand}</td>
                <td><button onClick={() => handleDelete(item.id)} className='deleteB'>Delete</button></td>
                <td>
                  {showForm ? (
                    <button className='modify' disabled>Modify</button>
                  ) : (
                    <button className='modify'>Modify</button>
                  )}
              </td>
              </tr>
            ))}
        </tbody>
      </table>
      {showForm && (
        <div className="buttonContainer">
          <Edit product={selectedProduct}/>
        </div>
      )}
    </div>
  );
}

export default Table;