import PropTypes from 'prop-types'

function CreateRealNameInput ({ value, onChange }) {
  return (
    <div className="input-line">
      <input type="text" id="real_name" value={value} onChange={event => onChange({ real_name: event.target.value })} />
    </div>
  )
}

CreateRealNameInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default CreateRealNameInput
