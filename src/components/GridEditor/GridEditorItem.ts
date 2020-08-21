import styled from "styled-components/macro";
import { dotted, wavyZigzag } from "../../lib/backgrounds";
interface GridEditorItemProps {
  number: number;
}
const GridEditorItem = styled.div<GridEditorItemProps>`
  padding: ${({ theme }) => theme.space[2]}px;
  background: ${({ number }) => (number % 2 === 0 ? wavyZigzag : dotted)};
  border-radius: ${({ theme }) => theme.space[2]}px;
  ::before {
    width: min-content;
    height: min-content;
    padding-right: ${({ theme }) => theme.space[3]}px;
    padding-left: ${({ theme }) => theme.space[3]}px;
    font-weight: bold;
    text-align: center;
    background-color: var(--color-background);
    border-radius: ${({ theme }) => theme.space[1]}px;
    content: "${({ number }) => number}";
  }
`;

export default GridEditorItem;
