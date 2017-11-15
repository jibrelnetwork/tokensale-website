import React from 'react'

/* eslint-disable react/prop-types */

const Input = ({
  type,
  input,
  label,
  meta: {
    error,
    touched,
  },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
)

export default Input
