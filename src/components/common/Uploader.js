import React from 'react'
import PropType from 'prop-types'
import ReactFilestack from 'filestack-react';
import { head, map, compose } from 'lodash/fp'

const Uploader = ({ input: { onChange }, meta: { error } }) => (
  <div className="Uploader">
    <ReactFilestack
      apikey="AnARH4cA6SiuvN5hCQvdCz"
      options={{
        accept: ['image/*', '.pdf', '.doc', '.docx', '.docm'],
        fromSources: ['local_file_system', 'webcam'],
        transformations: { crop: true, rotate: true },
      }}
      buttonText="Select file to upload"
      buttonClass="classname"
      onSuccess={(files) => onChange(compose(head, map((file) => file.url))(files.filesUploaded))}
    />
    {error && <div className="error">{error}</div>}
  </div>
)

Uploader.propTypes = {
  input: PropType.shape({ // redux-form injected props
    onChange: PropType.func.isRequired,
  }).isRequired,
  meta: PropType.shape({ // redux-form injected props
    error: PropType.oneOfType([PropType.array, PropType.string]),
  }).isRequired,
}

export default Uploader
