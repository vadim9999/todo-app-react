// Create a Title component that'll render an <h1> tag with some styles
import styled,{keyframes} from 'styled-components'

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
export const Wrapper = styled.section`
  padding: 4em;
  
  background: red;
  color: red;
`;
// Use Title and Wrapper like any other React component – except they're styled!
// render(
//   <Wrapper>
//     <Title>
//       Hello World!
//     </Title>
//   </Wrapper>
// );


const shake = keyframes`
0%{
    transform: translate(0px, 0px)
}
50%{
    transform: translate(15px, 0px)
}
}
100%{
    transform: translate(0px, 0px)
}
`

const shake1 = keyframes`
0%{
    transform: translate(0px, 0px)
}
50%{
    transform: translate(14px, 0px)
}
100%{
    transform: translate(0px, 0px)
}
`
// const emptyFieldShadow = keyframes`
// 0%{

// }
// `
let toggle = 0
export const InputTask = styled.input.attrs(props =>({
    type: "text",
    className: "input-change-task",
    onChange:props.onChange,
    value: props.value,
    hidden: props.hidden,
    
}))
`    ${props => {
    if (props.shakeField) return `box-shadow: 2px 2px 5px 4px rgb(249, 149, 42);`
    // return `animation: ${shake} 2s linear infinite;`  // error!!!
}}
    

     animation-name:  ${props => {
        console.log("In custom element");
        console.log(props.shakeField);
        if(props.shakeField){
            console.log("shake",shake);
            console.log("shake1", shake1);
            console.log({...shake});
            
            // return shake
            // console.log(shake);
            // const clonedShake = shake;
            // return shake
            if (toggle %2 === 0){
                console.log("return shake");
                toggle++;
                return shake
            }else {
                console.log("return empty shake");
                toggle++;
            return  shake1;
            }
            
            
            
            
            // return `${shake}`
            // return (`2s linear 1;`)
        }
         
        }};
     animation-duration: 2s;
     animation-iteration-count: ${props => 1};
   
`
 