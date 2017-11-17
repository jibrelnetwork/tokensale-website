import React from 'react'
import PropTypes from 'prop-types'
import ReactFilestack from 'filestack-react';
import { head, map, compose } from 'lodash/fp'

const FILESTACK_API_KEY = 'AnARH4cA6SiuvN5hCQvdCz'

const Uploader = ({ input: { onChange }, meta: { error, touched } }) => (
  <div className="Uploader">
    <ReactFilestack
      apikey={FILESTACK_API_KEY}
      options={{
        accept: ['image/*', '.pdf', '.doc', '.docx', '.docm'],
        fromSources: ['local_file_system', 'webcam'],
        transformations: { crop: true, rotate: true },
      }}
      buttonText="Select file to upload"
      buttonClass="classname"
      onSuccess={(files) => onChange(compose(head, map((file) => file.url))(files.filesUploaded))}
    />
    {touched && error && <div className="error">{error}</div>}
  </div>
)

Uploader.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
  }).isRequired, // redux-form injected props
  meta: PropTypes.shape({ // redux-form injected props
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    touched: PropTypes.bool,
  }).isRequired,
}

export default Uploader
