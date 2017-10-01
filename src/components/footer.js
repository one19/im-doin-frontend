import { h } from 'preact';
import styled from 'styled-components';
import { timeAgo } from '../utils';

const Footer = styled.footer`
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 8px;
  display: flex;
  color: inherit;
  box-sizing: border-box;
  justify-content: space-between;
  -webkit-text-stroke: inherit;
  -webkit-text-fill-color: inherit;
`;

type Props = {
  startTime: string,
  background?: string
};

export default ({ startTime, background = 'random' }: Props) => (
  <Footer>
    <small>
      Last updated: <strong>{timeAgo(startTime)}</strong>
    </small>
    <small>
      Background: <strong>{background}</strong>
    </small>
  </Footer>
);
