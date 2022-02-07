import PropTypes from 'prop-types'

function CreateImageUploadInput ({ onClick, onChange, files }) {
  return (
    <div id="upload-box">
      <input type="file" multiple accept=".jpg, .png" onChange={event => onChange(event.target.files)} />
      {
        files
          ? (
          <button onClick={onClick}>Create</button>
            )
          : (
        <p/>
            )
      }

    </div>
  )
}

CreateImageUploadInput.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  files: PropTypes.any
}

export default CreateImageUploadInput
