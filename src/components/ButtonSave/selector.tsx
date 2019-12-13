

export const getKeys = (selectedRowKeys:number[], 
  currentSelectedRowKeys:number[]) =>{

  const keysNotFounded = [];
    const changedRowKeys = [...currentSelectedRowKeys];

    for (let i = 0; i < selectedRowKeys.length; i++) {
      let founded = false;
      for (let j = 0; j < changedRowKeys.length; j++) {
        if (selectedRowKeys[i] === changedRowKeys[j]) {
          changedRowKeys.splice(j, 1);
          founded = true;
          break;
        }
      }

      if (!founded) {
        keysNotFounded.push(selectedRowKeys[i]);
      }
    }

    // changedRowKeys[...keysNotFounded]

    const result = changedRowKeys.concat(keysNotFounded);
    return result
}