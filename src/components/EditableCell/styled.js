import styled from 'styled-components'

// export const editableCell= () => styled.
//     position:"relative";


// export const editableCellWrap = {
//     padding: "5px 12px",
//     cursor: "pointer",
// }

// export const editableCellValueWrap = {
//     border: '1px solid #d9d9d9',
//     borderRadius: '4px',
//     padding: '4px 11px',
//     // cursor: 'pointer',
// }

export const EditableCellValueWrap = styled.div`
    padding: 5px 12px;
    cursor: pointer;

    &:hover{
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        padding: 4px 11px;
    }
`