
export const getPagination = (tasks: object[]) => {
  let counter = 0;

  if(tasks.length === 0){
    return 1
  } else {
    tasks.forEach((elem, index) => {
      console.log(index);
        if (index % 10 === 0) {
          counter++;
          // return(<Item onClick= {this.onClick} key = {elem["_id"]} id={counter++}>{counter}</Item>)
        }
      
    });
  }
  
  return counter;
};

