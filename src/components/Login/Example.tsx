import React, { useState, useEffect } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);
  const [car, setCar] = useState('mercedes');

  const onClick = () => {
    setCount(count + 1);
  };

  useEffect(() =>{
    console.log('Call effect');
    
    document.title = `You clicked${count}`
  })
  
  const onClickCar = () =>{
    setCar("Ok")
  }
  return (
    <div>
      <p>You clicked {count} </p>
      <button onClick={onClick}>Click me</button>
      <p>Car{car} </p>
      <button onClick={onClickCar}>clixk</button>
    </div>
  );
};

export default Example;
