import { h } from 'preact';
import styled from 'styled-components';
import config from '../config';

const Header = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  padding: 8px;
  display: flex;
  color: inherit;
  box-sizing: border-box;
  justify-content: center;
  -webkit-text-stroke: inherit;
  -webkit-text-fill-color: inherit;
  a {
    text-decoration: none;
  }
`;
const GlobIcon = styled.i`
  &:hover {
    opacity: 0.8;
    font-size: 28px;
  }
  transition-duration: 0.2s;
  font-size: 24px;
  margin-right: 8px;
`;

export default () => (
  <Header>
    {Object.keys(config).map(key => (
      <a href={config[key]}>
        <GlobIcon className={`glob glob-${key}`} />
      </a>
    ))}
  </Header>
);
