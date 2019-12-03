import React, { useState } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);
  const [car, setCar] = useState('mercedes');

  const onClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>You clicked {count} </p>
      <button onClick={onClick}>Click me</button>
    </div>
  );
};

export default Example;
