import PropTypes from 'prop-types'

function CreateSuperpowersInput ({ value, onChange }) {
  return (
    <div className="input-line">
      <textarea type="text" id="superpowers" value={value} onChange={event => onChange({ superpowers: event.target.value })} />
    </div>
  )
}

CreateSuperpowersInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default CreateSuperpowersInput
