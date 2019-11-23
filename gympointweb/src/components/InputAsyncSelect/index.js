import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

import { useField } from '@rocketseat/unform';

import { Container } from './styles';

export default function InputAsyncSelect({ name, label, loadOptions }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    return selectRef.select.state.value;
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <AsyncSelect
        name={fieldName}
        defaultValue
        value={defaultValue}
        ref={ref}
        loadOptions={loadOptions}
        defaultOptions
        placeholder="Buscar aluno"
        className="asyncSelectInput"
      />

      {error && <span>{error}</span>}
    </Container>
  );
}
InputAsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  loadOptions: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};
