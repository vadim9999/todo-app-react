import {getKeys} from '../../components/ButtonSave/selector'

describe('testing getKeys', ()=>{
  it('testing on return value',()=>{
  const selecterRowKeys = [1,2,3,4]
  const currentSelectedRowKeys = [2,3,4]

  const result =  getKeys(selecterRowKeys,currentSelectedRowKeys)

  expect(result).toEqual([1])

  })
  
  it('checks if all arrays will empty',()=>{
    const result = getKeys([],[])
    expect(result).toEqual([])
  })
})