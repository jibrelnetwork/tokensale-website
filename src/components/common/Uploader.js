import cx from 'classnames'
import React from 'react'
import { last } from 'lodash/fp'
import Dropzone from 'react-dropzone'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

const MAX_FILE_SIZE = 10000000

const Uploader = ({
  input: {
    name,
    onChange,
    value: file,
  },
  meta: {
    error,
    touched,
  },
  label,
}) => (
  <div className="Uploader">
    <Dropzone
      name={name}
      accept="image/jpg, image/png, image/jpeg, application/pdf"
      onDrop={(acceptedFiles, rejectedFiles) => {
        const rejectedFile = last(rejectedFiles)
        if (rejectedFile) {
          if (rejectedFile.size > MAX_FILE_SIZE) {
            toast.warn(`File ${rejectedFile.name} is too big. The accepted file size is less than 10MB`)
          } else {
            toast.warn(`File ${rejectedFile.name} is not an accepted file type. The accepted file types are jpg, jpeg, png, pdf`)
          }
        }
        return onChange(last(acceptedFiles))
      }}
      maxSize={MAX_FILE_SIZE}
      multiple={false}
      className={cx('area', file.preview && file.type && 'with-file')}
    >
      {file.preview && file.type ? (
        file.type.match('image')
          ? <img src={file.preview} alt="Document" className="image" />
          : file.type === 'application/pdf'
            ? <div>{file.name}</div>
            : undefined
      ) : <div className="hint">{label}</div>}
    </Dropzone>
    {touched && error && <div className="error-text">{error}</div>}
  </div>
)

Uploader.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({ // redux-form injected props
    name: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({ // redux-form injected props
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    touched: PropTypes.bool,
  }).isRequired,
}

export default Uploader
