import styled from "styled-components/macro";

export const Control = styled.div`
  display: grid;
  grid-column-gap: ${({ theme }) => theme.space.common};
  grid-template-columns: 70px auto auto;
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
