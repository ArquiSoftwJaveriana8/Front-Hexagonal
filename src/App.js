import './App.css';
import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import Add from './components/Add';

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };


  return (
    <div>
      <h1 className='title'>Products table</h1>
      <Table/>
        <div className="buttonContainer">
          {!showForm && <button className='buttonAdd' onClick={handleClick}>Add</button>}
          {showForm && <Add />}
        </div>
    </div>
  );
}

export default App;
