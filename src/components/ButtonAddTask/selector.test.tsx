import {getPagination} from './selector'
import {TasksTypes} from '../Interfaces'

describe('testing getPagination',()=>{
  it('checks on returning count of pages from 2 tasks', ()=>{
    const tasks = [{
      name:'task'
    },
    {
      name:'task2'
    }]
    const result = getPagination(tasks)

    expect(result).toBe(1)
  })

  it('checks on returning count (1 page) from 0 tasks', ()=>{
    const tasks:TasksTypes[] = []

    const result = getPagination(tasks)
    expect(result).toBe(1)
  })
})