import cx from 'classnames'
import React from 'react'
import axios from 'axios'
import LogRocket from 'logrocket'
import PropTypes from 'prop-types'
import { lifecycle } from 'recompose'
import ReactFilestack from 'filestack-react'
import { head, map, last, compose } from 'lodash/fp'

const getFileType = (file) => last(file.split('.'))
const FILESTACK_API_KEY = 'AnARH4cA6SiuvN5hCQvdCz'

const Uploader = ({ input: { onChange, value }, meta: { error, touched } }) => (
  <div className="Uploader">
    <ReactFilestack
      apikey={FILESTACK_API_KEY}
      options={{
        accept: ['jpg', 'jpeg', 'pdf', 'png'],
        maxSize: 10000000,
        fromSources: ['local_file_system', 'webcam'],
        transformations: { crop: true, rotate: true },
      }}
      buttonText={
        value.url
          ? value.type === 'pdf'
            ? (
              <iframe
                src={`https://docs.google.com/viewer?url=${value.url}&embedded=true`}
                title="pdf"
                width="100%"
                className="pdf"
              />
            )
            : <img src={value.url} alt="Document" className="image" />
          : 'Upload your passport'
      }
      buttonClass={cx('area', value.url && 'with-file')}
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

const enhance = lifecycle({
  async componentDidMount() {
    try {
      await axios.get(`https://cloud.filestackapi.com/prefetch?apikey=${FILESTACK_API_KEY}`)
      LogRocket.track('FileStack|Key|Success')
    } catch (error) {
      LogRocket.track('FileStack|Key|Error')
    }
    try {
      await axios.post(`https://www.filestackapi.com/api/store/s3?key=${FILESTACK_API_KEY}`)
      LogRocket.track('FileStack|Upload|Success')
    } catch (error) {
      LogRocket.track('FileStack|Upload|Error')
    }
  },
})

export default enhance(Uploader)
