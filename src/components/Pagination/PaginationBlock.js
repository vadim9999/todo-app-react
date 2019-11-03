import styled,{keyframes} from 'styled-components'

export const PaginationBlock = styled.div`
    /* border: 2px solid green; */
    font-size:x-large;
    background: linear-gradient(45deg, #a02a2a, rgb(75, 11, 11));
    border-radius: 5px;
    display:flex;
`

export const Item = styled.a`
    color: green;
    text-decoration: none;
    width: 30px;
    height: 30px;
    margin: 5px;
    &:hover {
        color:black;
        background-color: black;
    }
`