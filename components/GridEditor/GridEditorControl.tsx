import { Icon } from '@/lib/Icons';
import { gridGapUnits, gridUnits, removeItemAtIndex } from '@/lib/utils';
import { GridControlObjKey } from '@/store/grid';
import Button from '@/ui/Button';
import { Input } from '@rebass/forms/styled-components';
import {
  auditEntry,
  Entry,
  flatten,
  GridState,
} from 'css-grid-template-parser';
import produce from 'immer';
import React from 'react';
import styled from 'styled-components/macro';
import useSWR, { mutate } from 'swr';
import Box from '../../ui/Box';
import If from '../If';
import Select from '../Select';
export interface GridEditorControlProps extends Entry {
  objKey: GridControlObjKey;
  index: number;
  endpoint: string;
  canDelete: boolean;
  entries: Entry[];
}

export const GridEditorControl: React.FC<GridEditorControlProps> = ({
  objKey,
  index,
  endpoint,
  amount,
  unit,
  canDelete,
  entries,
}) => {
  const { data, error } = useSWR<GridState>(endpoint, {
    refreshInterval: 0,
    revalidateOnMount: false,
    revalidateOnFocus: false,
  });
  const isGap = objKey === 'gridGap';

  const [state, setState] = React.useState<Entry>({ amount, unit });

  if (error) return <div>error</div>;

  const updateGrid = ({ amount, unit }) => {
    const newData = entries
      .map((obj, i) => {
        if (i === index) return `${amount}${unit}`;
        return `${obj.amount}${obj.unit}`;
      })
      .join(' ');

    return mutate(endpoint, { ...data, [objKey]: newData }, false);
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const { name, value } = event.target;

    const newVal = auditEntry({ ...state, [name]: value });
    setState(newVal);

    updateGrid(newVal);

    // if (!isDirty) setIsDirty(true);
  };

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
    const newData = removeItemAtIndex(entries, index);
    console.log('newData: ', newData);
    const obj = { ...data, [objKey]: flatten(newData) };
    console.log('obj: ', obj);
    mutate(
      endpoint,
      produce((draft) => {
        draft[objKey] = flatten(newData);
      }),
      false
    );
  };

  if (!data) return <div>loading</div>;

  return (
    <InputGroup className="input-group">
      <If isTrue={state.unit !== 'auto'}>
        <Input
          className="form-control"
          size="8"
          name="amount"
          value={state.amount}
          onChange={handleChange}
          type="number"
          min="0"
          autoComplete="off"
        />
      </If>

      <Box className="input-group-append" bg="bg">
        <Select
          className="btn btn-outline-secondary"
          name="unit"
          width={75}
          value={state?.unit}
          onChange={handleChange}
          options={isGap ? gridGapUnits : gridUnits}
        />

        <If isTrue={!isGap}>
          <Button
            className="btn btn-outline-secondary"
            onClick={handleDelete}
            disabled={canDelete}
          >
            <div>
              <Icon size={26}>
                <path
                  fillRule="evenodd"
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </Icon>
            </div>
          </Button>
        </If>
      </Box>
    </InputGroup>
  );
};

const InputGroup = styled.div`
  button {
    border-radius: 0;
  }
  button:focus {
    outline: 1px dotted;
    outline: 5px auto -webkit-focus-ring-color;
  }
  button,
  input {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  button,
  input {
    overflow: visible;
  }
  button {
    text-transform: none;
  }
  [type='button'],
  button {
    -webkit-appearance: button;
  }
  [type='button']::-moz-focus-inner,
  button::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }
  .form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .form-control {
      transition: none;
    }
  }
  .form-control::-ms-expand {
    background-color: transparent;
    border: 0;
  }
  .form-control:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #495057;
  }
  .form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  .form-control::-webkit-input-placeholder {
    color: #6c757d;
    opacity: 1;
  }
  .form-control::-moz-placeholder {
    color: #6c757d;
    opacity: 1;
  }
  .form-control:-ms-input-placeholder {
    color: #6c757d;
    opacity: 1;
  }
  .form-control::-ms-input-placeholder {
    color: #6c757d;
    opacity: 1;
  }
  .form-control::placeholder {
    color: #6c757d;
    opacity: 1;
  }
  .form-control:disabled {
    background-color: #e9ecef;
    opacity: 1;
  }
  .btn {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .btn {
      transition: none;
    }
  }
  .btn:hover {
    color: #212529;
    text-decoration: none;
  }
  .btn:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  .btn:disabled {
    opacity: 0.65;
  }
  .btn-outline-secondary {
    color: #6c757d;
    border-color: #6c757d;
  }
  .btn-outline-secondary:hover {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
  }
  .btn-outline-secondary:focus {
    box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
  }
  .btn-outline-secondary:disabled {
    color: #6c757d;
    background-color: transparent;
  }
  /* position: relative; */
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: stretch;
  align-items: stretch;
  width: 100%;
  .form-control {
    position: relative;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
    margin-bottom: 0;
  }
  .form-control:focus {
    z-index: 3;
  }
  .form-control:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .input-group-append {
    display: -ms-flexbox;
    display: flex;
  }
  .input-group-append .btn {
    position: relative;
    z-index: 2;
  }
  .input-group-append .btn:focus {
    z-index: 3;
  }
  .input-group-append .btn + .btn {
    margin-left: -1px;
  }
  .input-group-append {
    margin-left: -1px;
  }
  .input-group-append:last-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .input-group-append > .btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  @media print {
    *,
    ::after,
    ::before {
      text-shadow: none !important;
      box-shadow: none !important;
    }
  }
  * {
    border-radius: 0 !important;
    border-width: 0 !important;
    outline: none !important;
  }
`;
/* <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" style="background-clip: padding-box; background-color: rgb(255, 255, 255); border: 1px solid rgb(206, 212, 218); border-top-left-radius: 0px; border-top-right-radius: 0.25rem; border-bottom-right-radius: 0.25rem; border-bottom-left-radius: 0px; box-sizing: border-box; color: rgb(73, 80, 87); display: block; flex: 1 1 auto; font-size: 1rem; font-weight: 400; height: calc(1.5em + 2px + 0.75rem); line-height: 1.5; margin: 0px; min-width: 0px; overflow: visible; padding: 0.375rem 0.75rem; position: relative; transition-duration: 0.15s, 0.15s; transition-property: border-color, box-shadow; transition-timing-function: ease-in-out, ease-in-out; width: 1%;">

background-clip: padding-box;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0 .25rem .25rem 0;
  box-shadow: rgba(0,123,255,.25) 0 0 0 .2rem;
  box-sizing: border-box;
  color: #495057;
  display: block;
  flex: 1 1 auto;
  font-size: 1rem;
  font-weight: 400;
  height: calc(1.5em + 2px + .75rem);
  line-height: 1.5;
  margin: 0;
  min-width: 0;
  outline: 0;
  overflow: visible;
  padding: .375rem .75rem;
  position: relative;
  transition-duration: .15s,.15s;
  transition-property: border-color,box-shadow;
  transition-timing-function: ease-in-out,ease-in-out;
  width: 1%;
  z-index: 3; */
