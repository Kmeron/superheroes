import PropTypes from 'prop-types'

function CreateCatchPhraseInput ({ value, onChange }) {
  return (
    <div className="input-line">
      <textarea type="text" id="catch_phrase" value={value} onChange={event => onChange({ catch_phrase: event.target.value })} />
    </div>
  )
}

CreateCatchPhraseInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default CreateCatchPhraseInput
