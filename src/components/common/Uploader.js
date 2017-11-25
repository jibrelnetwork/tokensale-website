import React from 'react'
import PropTypes from 'prop-types'
import ReactFilestack from 'filestack-react'
import { head, map, last, compose } from 'lodash/fp'

const getFileType = (file) => last(file.split('.'))
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
      buttonText={
        value.url
          ? value.type === 'pdf'
            ? (
              <object
                data={value.url}
                type="application/pdf"
                className="pdf"
              >
                <iframe
                  src={`https://docs.google.com/viewer?url=${value.url}&embedded=true`}
                  title="pdf"
                />
              </object>
            )
            : <img src={value.url} alt="Document" className="image" />
          : 'Select file to upload'
      }
      buttonClass="area"
      onSuccess={(files) => onChange(
        compose(
          head,
          map(({ url, filename }) => ({ url, type: getFileType(filename) }))
        )(files.filesUploaded)
      )}
    />
    {touched && error && <div className="error-text">{error}</div>}
  </div>
)

Uploader.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.shape({
      url: PropTypes.string,
      type: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired, // redux-form injected props
  meta: PropTypes.shape({ // redux-form injected props
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    touched: PropTypes.bool,
  }).isRequired,
}

export default Uploader
