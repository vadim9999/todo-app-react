import {getTasksForTable, getSelectedRowKeysFromTasks, getColumns, getRowSelection} from '../../components/List/selectorTable'
import {TasksTypes} from '../../components/Interfaces'
// import moment from 'moment'
import 'jest-extended';

const tasks:TasksTypes[] = [
  {_id:'1',
    name:'task1',
  completed: true,
  date:'2019-12-11T14:42:24.844'
},
{_id:'2',
  name:'task2',
completed: false,
date:'2019-12-11T14:42:24.844'},
{_id:'3',
  name:'task2',
completed: true,
date:'2019-12-11T14:42:24.844'}
]

describe('testing function getTasksForTable()', ()=>{
  
  it('call without tasks',()=>{
    expect(getTasksForTable(undefined)).toEqual([])
  })
  
  it('checks tasks length',()=>{
    const result = getTasksForTable(tasks)
    expect(result).toHaveLength(3)
  })
  it('checks output types of tasks', ()=>{
    const result = getTasksForTable(tasks)
    
    result.forEach((item)=>{
      expect(item).toEqual({
        _id: expect.toBeString(),
        name:expect.toBeString(),
        completed: expect.toBeBoolean(),
        date: expect.toBeString(),
        key: expect.toBeNumber()
      })
    })
  
  })
})

describe('testing getSelectedRowKeysFromTasks()', ()=>{
  it('call with undefined',()=>{
    expect(getSelectedRowKeysFromTasks(undefined)).toBeArray()
  })
  it('checks length of rowKeys from tasks', ()=>{
    const result = getSelectedRowKeysFromTasks(tasks)
    expect(result).toHaveLength(2)
  })
  it('ckecks types in array',()=>{
    const result = getSelectedRowKeysFromTasks(tasks)
    result.forEach((key)=>{
      expect(key).toBeNumber()
    })
  })
})

describe('testing getColumns()',()=>{
  it("call with undefined",()=>{
    expect(getColumns({deleteTask:undefined, handleSave:undefined})).toBeArray()
  })

  it('checks on return values',()=>{
    let obj = {
      deleteTask:jest.fn(), 
      handleSave:jest.fn()
    }

    const result = getColumns(obj)

    // console.log(result);
    expect(result).toHaveLength(3)
  })
  it('call on cell',()=>{
    let obj = {
      deleteTask:jest.fn(), 
      handleSave:jest.fn()
    }
    const result = getColumns(obj)
    let objColumn = result[0].onCell({},
      {
      editable:true,
      dataIndex:'name',
      title:'Name'
    }
      );
    
      expect(objColumn).toBeObject()
  })
})

describe('testing getRowSelection()',()=>{
  const props = {
    tasks,
    currentSelectedRowKeys:[0,2],
    addCurrentSelectedRowKeys: jest.fn()
  }
  it('call with undefined',()=>{
    const result = getRowSelection(props)
    
    expect(result).not.toBeUndefined()
  })
  it('should return empty array with called undefined',()=>{
    const result = getRowSelection(undefined)
    expect(result).toBeArray()
  })

  it('call onSelectChange()',()=>{
    const result = getRowSelection(props)
    result.onChange([0,2])
    // console.log(result);
    
    // result.onChange([0,1,2])
    
  })
  it('call selectAllData',()=>{
    const result = getRowSelection(props)
    result.selections[0].onSelect()
  })

  it('call undoAllSelection',()=>{
    const result = getRowSelection(props)
    result.selections[1].onSelect()
  })
})