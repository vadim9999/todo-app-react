import React from 'react';
import { ButtonGroup, StyledButton } from './ButtonGroup';
import ButtonAddTask from '../ButtonAddTask/ButtonAddTask'
import ButtonSave from '../ButtonSave/ButtonSave'

class ButtonBlock extends React.Component<
 {},{}
> {
  render() {
    // const { currentSelectedRowKeys } = this.props;
    

    // const sortedKeys = selectedRowKeys.sort((a: number, b: number) => a < b);
    // let equalRowKeys = false;

    // if (
    //   JSON.stringify(sortedKeys) === JSON.stringify(selectedRowKeys)
    // ) {
    //   equalRowKeys = true;
    // }

    return (
      <ButtonGroup>
        <StyledButton>
          <ButtonSave />
        </StyledButton>
        <StyledButton>
          <ButtonAddTask />
        </StyledButton>
      </ButtonGroup>
    );
  }
}

export default ButtonBlock;
