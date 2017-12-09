import cx from 'classnames'
import React from 'react'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import { last } from 'lodash/fp'

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
}) => (
  <div className="Uploader">
    <Dropzone
      name={name}
      accept="image/jpg, image/png, image/jpeg, application/pdf"
      onDrop={(files) => onChange(last(files))}
      maxSize={10000000}
      multiple={false}
      className={cx('area', file.preview && file.type && 'with-file')}
    >
      {file.preview && file.type ? (
        file.type.match('image')
          ? <img src={file.preview} alt="Document" className="image" />
          : file.type === 'application/pdf'
            ? <div>{file.name}</div>
            : undefined
      ) : <div className="hint">Upload your passport</div>}
    </Dropzone>
    {touched && error && <div className="error-text">{error}</div>}
  </div>
)

Uploader.propTypes = {
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
