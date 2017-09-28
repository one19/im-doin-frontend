import styled from 'styled-components';

export default styled.i`
  font-family: 'ProgressivePunctuation';
  text-align: center;
  font-style: inherit;
  color: inherit;
  color: red;
  -webkit-text-stroke: inherit;
  -webkit-text-fill-color: inherit;
  ::before {
    content: '${p => p.type}';
  }
`;
