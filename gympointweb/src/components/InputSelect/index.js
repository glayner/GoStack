import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import Select from 'react-select';

import { Container } from './styles';

export default function ReactSelect({ name, options, setChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleChange(data) {
    setValue(data);
    if (setChange) {
      setChange(data);
    }
  }

  return (
    <Container>
      <Select
        name="techs"
        options={options}
        value={value}
        placeholder="Selecione o plano"
        onChange={data => handleChange(data)}
        ref={ref}
        className="selectInput"
      />

      {error && <span>{error}</span>}
    </Container>
  );
}

ReactSelect.propTypes = {
  name: PropTypes.string.isRequired,
  setChange: PropTypes.func
};

ReactSelect.defaultProps = {
  setChange: PropTypes.null
};
