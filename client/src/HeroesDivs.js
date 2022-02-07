import PropTypes from 'prop-types'

function HeroesDivs ({ heroes, onClick }) {
  return (
    <div id="heroes-area">
      {heroes.map(hero =>
        <div key={hero.id}>
          <img src={'http://localhost:3000/static/' + hero.imageIds.id} width={100} height={100}></img>
          <p onClick={() => onClick(hero.id)}>{hero.nickname}</p>
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

// editHero?.id === hero.id
// ? (
// <div key={hero.id} >
//   <EditTitleInput value={editHero.title} onChange={current => setEditHero(previous => ({ ...previous, ...current }))}/>
//   <EditTextInput value={editHero.text} onChange={current => setEditHero(previous => ({ ...previous, ...current }))}/>
//   <Save onClick={() => {
//     saveFn(editHero)
//     setEditHero(null)
//   }}/>
// </div>
//   )
// : (
// <div key={hero.id}>
//   <p>{hero.title}</p>
//   <p>{hero.text}</p>
//   <Edit onClick={() => setEditHero(hero)}/>
//   <Delete onClick={() => deleteFn(hero.id)}/>
// </div>
//   )
