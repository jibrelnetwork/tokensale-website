import cx from 'classnames'
import React from 'react'
import LogRocket from 'logrocket'
import PropTypes from 'prop-types'
import { lifecycle } from 'recompose'
import { head, map, compose } from 'lodash/fp'

const Uploader = ({ input: { onChange, value }, meta: { error, touched } }) => (
  <div className={cx('Uploader', { 'with-preview': !!value.size })}>
    <label>
      <span className="upload-button">
        Upload your passport
      </span>
      <span className="edit-document" title="Upload another file" />
      <input
        type="file"
        name="document"
        accept=".jpg, .jpeg, .png, .pdf"
        className="upload-input"
        onChange={(e) => onChange(
          compose(
            head,
            map((file) => file)
          )(e.target.files)
        )}
      />
    </label>
    <div className="preview">
      {!!value.size && (
        (value.type !== 'application/pdf') ? (
          <img
            src={window.URL && window.URL.createObjectURL(value)}
            alt="Document"
            className="image"
          />
        ) : (
          <iframe
            src={window.URL && window.URL.createObjectURL(value)}
            className="pdf"
            title="Document"
          />
        )
      )}
    </div>
    {touched && error && <div className="error-text">{error}</div>}
  </div>
)

Uploader.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
  }).isRequired, // redux-form injected props
  meta: PropTypes.shape({ // redux-form injected props
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    touched: PropTypes.bool,
  }).isRequired,
}

const enhance = lifecycle({
  async componentDidMount() {
    try {
      const fileInput = document.createElement('input')
      fileInput.setAttribute('type', 'file')
      LogRocket.track('Uploader|InputFileTest|Success')
    } catch (error) {
      LogRocket.track('Uploader|InputFileTest|Error')
    }
    try {
      window.URL.createObjectURL(new window.Blob())
      LogRocket.track('Uploader|ShowPreviewTest|Success')
    } catch (error) {
      LogRocket.track('Uploader|ShowPreviewTest|Error')
    }
  },
})

export default enhance(Uploader)
