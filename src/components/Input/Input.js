import React from 'react';

const Input = ({ input, ...props }) => (
  <input
    style={{ marginBottom: '10px' }}
    required
    className="form-control"
    value={input.value}
    onChange={input.onChange}
    {...props}
  />
);

export default Input;
