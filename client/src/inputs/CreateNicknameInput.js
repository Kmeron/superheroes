import PropTypes from 'prop-types'

function CreateNicknameInput ({ value, onChange }) {
  return (
    <div className="input-line">
      <input type="text" id="nickname" value={value} onChange={event => onChange({ nickname: event.target.value })} />
    </div>
  )
}

CreateNicknameInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default CreateNicknameInput
