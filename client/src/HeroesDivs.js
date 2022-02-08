import PropTypes from 'prop-types'

function HeroesDivs ({ heroes, onClick }) {
  return (
    <div id="heroes-area">
      {heroes.map(hero =>
        <div key={hero.id}>
          <img src={'http://localhost:3000/static/' + hero.imageIds.id} width={100} height={100}></img>
          <div>
          <button onClick={() => onClick(hero.id)}>{hero.nickname}</button>
          </div>
        </div>
      )}
    </div>
  )
}

HeroesDivs.propTypes = {
  heroes: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

export default HeroesDivs
