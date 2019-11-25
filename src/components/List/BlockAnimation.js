import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';

const rotateBlock = keyframes`
    0%{
        transform: rotateY(0deg)
    }
    50%{
        transform: rotateY(90deg)
    }
    100%{
        transform: rotateY(0deg)
    }
`;

const rotateBlock1 = keyframes`
    0%{
        transform: rotateY(0deg)
    }
    50%{
        transform: rotateY(91deg)
    }
    100%{
        transform: rotateY(0deg)
    }
`;

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
});
let currentPageTmp = -1;
let toggle = 0;

const ConnectedBlockAnimation = styled.div.attrs((props) => ({

}))`
    /* animation-name: ${(props) => {
    console.log('props');
    if (props.currentPageTmp !== currentPageTmp) {
      currentPageTmp = props.currentPage;
      toggle++;
      console.log('currentPage', props.currentPage);
      if (toggle % 2 === 0) {
        return rotateBlock;
      }
      return rotateBlock1;
    }
  }};
    animation-duration:1s;
    animation-iteration-count:1; */
    
`;

const BlockAnimation = connect(mapStateToProps)(ConnectedBlockAnimation);
export default BlockAnimation;
