import { Icon } from '@/lib/Icons';
import { gridGapUnits, gridUnits, prettyControlName } from '@/lib/utils';
import { GridControlObjKey } from '@/store/grid';
import {
  Box,
  ButtonPrimary,
  FormGroup,
  TextInput,
  TextInputProps,
} from '@primer/components';
import { Select, SelectProps } from '@rebass/forms/styled-components';
import { Unit } from 'css-grid-template-parser';
import {
  FieldArray,
  FieldHookConfig,
  useField,
  useFormikContext,
} from 'formik';
import React from 'react';
import styled from 'styled-components/macro';
import If from '../If';
import { GridState } from '../../css-grid-template-parser/GridState';

export interface EditorControlStackProps {
  name: GridControlObjKey;
  maxHeight?: React.CSSProperties['maxHeight'];
}
export const EditorControlStack: React.FC<EditorControlStackProps> = (
  props
) => {
  const { name } = props;
  const { values } = useFormikContext<GridState>();

  const isGap = name === 'gridGap';
  const options = name === 'gridGap' ? gridGapUnits : gridUnits;
  const canDelete = name !== 'gridGap' && values[name].length < 2;
  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => {
        const handleAdd = () => {
          arrayHelpers.insert(
            values[name].length + 1,
            values[name].slice(-1)[0]
          );
        };
        const handleRemove = (event) => {
          const elIndex = event.currentTarget.name.replace('.remove', '');
          arrayHelpers.remove(Number(elIndex));
        };

        return (
          <FormGroup margin={0}>
            <FormGroup.Label className="control-label">
              {prettyControlName(name)}
            </FormGroup.Label>

            <If isTrue={!isGap}>
              <ButtonPrimary
                name={name}
                onClick={handleAdd}
                width="100%"
                marginBottom={4}
              >
                +
              </ButtonPrimary>
            </If>

            <Ul>
              {values[name].map(({ amount, unit }, index) => {
                const step = getStep(name, unit);
                return (
                  <Box as="li" key={`${name}[${index}]`}>
                    <InputGroup>
                      <If isTrue={unit !== 'auto'}>
                        <AmountField
                          name={`${name}[${index}].amount`}
                          type="number"
                          value={unit === 'auto' ? '' : amount}
                          className="form-control"
                          disabled={unit === 'auto'}
                          min={0}
                          step={step}
                        />
                      </If>
                      <div className="input-group-append">
                        <SelectField
                          name={`${name}[${index}].unit`}
                          className="btn btn-outline-secondary"
                          width={75}
                        >
                          {options.map((option, optionIndex) => (
                            <option key={`${option}[${optionIndex}]`}>
                              {option}
                            </option>
                          ))}
                        </SelectField>
                        <If isTrue={!isGap}>
                          <button
                            name={`${index}.remove`}
                            className="btn btn-outline-secondary"
                            onClick={handleRemove}
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
                          </button>
                        </If>
                      </div>
                    </InputGroup>
                  </Box>
                );
              })}
            </Ul>
          </FormGroup>
        );
      }}
    />
  );
};

type AmountFieldProps = FieldHookConfig<string> & TextInputProps;
const AmountField: React.FC<AmountFieldProps> = (props) => {
  const [field] = useField(props);
  return <TextInput {...field} {...props} />;
};
type SelectFieldProps = FieldHookConfig<string> & SelectProps;

const SelectField: React.FC<SelectFieldProps> = (props) => {
  const [field] = useField(props);
  return <Select {...field} {...props} />;
};

const InputGroup = styled.div`
  button,
  select {
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
  display: flex;
  flex-wrap: wrap;
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

  .input-group-append > .btn:not(:last-child) {
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
  select {
    border-radius: 0 !important;
    margin-right: 3px;
    /* border-width: 0 !important; */
    outline: none !important;
  }
`;

const Ul = styled.ul`
  height: auto;
  overflow-y: auto;
  padding-right: var(--space-2);
`;
function getStep(name: GridControlObjKey, unit: Unit) {
  switch (name) {
    case 'gridGap':
      switch (unit) {
        case 'px':
          return 2;
        default:
          return 1;
      }

    default:
      switch (unit) {
        case 'fr':
          return 1;
        case '%':
          return 5;
        case 'px':
          return 10;
        default:
          return 1;
      }
  }
}
