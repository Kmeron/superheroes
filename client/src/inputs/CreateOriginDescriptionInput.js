import PropTypes from 'prop-types'

function CreateOriginDescriptionInput ({ value, onChange }) {
  return (
    <div className="input-line">
      <textarea type="text" id="origin_description" value={value} onChange={event => onChange({ origin_description: event.target.value })} />
    </div>
  )
}

CreateOriginDescriptionInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default CreateOriginDescriptionInput
