import React from 'react'
import PropTypes from 'prop-types'
import ReactFilestack from 'filestack-react'
import { head, map, compose } from 'lodash/fp'

const FILESTACK_API_KEY = 'AnARH4cA6SiuvN5hCQvdCz'

const Uploader = ({ input: { onChange, value }, meta: { error, touched } }) => (
  <div className="Uploader">
    <ReactFilestack
      apikey={FILESTACK_API_KEY}
      options={{
        accept: ['jpg', 'pdf', 'png'],
        maxSize: 10000000,
        fromSources: ['local_file_system', 'webcam'],
        transformations: { crop: true, rotate: true },
      }}
      buttonText={value ? 'File uploaded' : 'Select file to upload'}
      buttonClass="area"
      onSuccess={(files) => onChange(compose(head, map((file) => file.url))(files.filesUploaded))}
    />
    {touched && error && <div className="error-text">{error}</div>}
  </div>
)

Uploader.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired, // redux-form injected props
  meta: PropTypes.shape({ // redux-form injected props
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    touched: PropTypes.bool,
  }).isRequired,
}

export default Uploader
