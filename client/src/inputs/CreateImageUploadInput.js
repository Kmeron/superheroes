import PropTypes from 'prop-types'

function CreateImageUploadInput ({ onClick, onChange, isDisabled }) {
  return (
    <div id="upload-box">
      <input type="file" multiple accept=".jpg, .png" onChange={event => onChange(event.target.files)} />
      {

          <button disabled={isDisabled} onClick={onClick}>Create</button>

      }

    </div>
  )
}

CreateImageUploadInput.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired
}

export default CreateImageUploadInput
