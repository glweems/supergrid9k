import styled from "styled-components";

export const Control = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.space.common};
  grid-template-columns: 70px auto min-content;
  margin-bottom: 6px;

  .control-label {
    grid-row: 1/2;
    grid-column: 1/-1;
  }

  .add-entry {
    grid-column: 1/-1;
    font-size: 90%;
  }
`;
