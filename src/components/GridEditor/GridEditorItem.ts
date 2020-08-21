import styled from "styled-components/macro";
import { dotted, wavyZigzag } from "../../lib/backgrounds";
interface GridEditorItemProps {
  number: number;
}
const GridEditorItem = styled.div<GridEditorItemProps>`
  padding: var(--space-2);
  background: ${({ number }) => (number % 2 === 0 ? wavyZigzag : dotted)};
  border-radius: var(--space-2);
  ::before {
    width: min-content;
    height: min-content;
    padding-top:var(--space-1);
    padding-right:var(--space-3);
    padding-bottom:var(--space-1);
    padding-left: var(--space-3);
    font-weight: bold;
    text-align: center;
    background-color: var(--color-background);
    border-radius: var(--space-1);
    content: "${({ number }) => number}";
  }
`;

export default GridEditorItem;
