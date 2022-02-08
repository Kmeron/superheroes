import './App.css'
import CreateNicknameInput from './inputs/CreateNicknameInput'
import CreateRealNameInput from './inputs/CreateRealNameInput'
import CreateOriginDescriptionInput from './inputs/CreateOriginDescriptionInput'
import CreateSuperpowersInput from './inputs/CreateSuperpowersInput'
import { useState, useEffect } from 'react'
import CreateCatchPhraseInput from './inputs/CreateCatchPhraseInput'
import CreateImageUploadInput from './inputs/CreateImageUploadInput'
import createHero from './api/createHero'
import createHeroImage from './api/createHeroImage'
import listHeroes from './api/listHeroes'
import HeroesDivs from './HeroesDivs'
import PageButtons from './PageButtons'
import Modal from './Modal'
import showHero from './api/showHero'
import deleteHero from './api/deleteHero'

function App () {
  const [heroData, setHeroData] = useState({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: ''
  })
  const [heroImage, setHeroImage] = useState(null)
  const [heroes, setHeroes] = useState([])
  const [totalHeroes, setTotalHeroes] = useState(0)
  const [offset, setOffset] = useState(0)
  const limit = 5
  const [heroModalData, setHeroModalData] = useState(null)
  const isDisabled = Object.values(heroData).some(value => !value) || !heroImage

  useEffect(() => {
    listHeroes({ limit, offset })
      .then(({ data, meta }) => {
        setHeroes(data)
        setTotalHeroes(meta.totalCount)
      })
      .catch(error => alert(error.message))
  }, [offset])

  const handleOnClickCreateButton = async () => {
    const formData = new FormData()
    for (let i = 0; i < heroImage.length; i++) {
      formData.append(`images[${i}]`, heroImage[i])
    }
    try {
      const imageIds = await createHeroImage(formData)
      await createHero({ ...heroData, imageIds: imageIds.data })
      setHeroData({
        nickname: '',
        real_name: '',
        origin_description: '',
        superpowers: '',
        catch_phrase: ''
      })
      setHeroImage(null)
      const { data, meta } = await listHeroes({ limit, offset: 0 })
      setHeroes(data)
      setOffset(0)
      setTotalHeroes(meta.totalCount)
    } catch (error) {
      alert(error.message)
    }
  }

  const handleOnClickPageButton = (params) => {
    setOffset(params.offset)
  }

  const handleOnClickModal = async (id) => {
    try {
      const { data } = await showHero(id)
      setHeroModalData(data)
    } catch (error) {
      alert(error.message)
    }
  }

  const handleOnClickModalDelete = async (id) => {
    await deleteHero(id)
    setHeroModalData(false)
    const { data, meta } = await listHeroes({ limit, offset })
    if (meta.offset >= meta.totalCount && meta.totalCount !== 0) {
      return setOffset(offset - 5)
    }
    setHeroes(data)
    setTotalHeroes(meta.totalCount)
  }

  const closeUpdatedModal = async () => {
    setHeroModalData(false)
    const { data } = await listHeroes({ limit, offset })
    setHeroes(data)
  }

  return (
    <div className="App">
      <h1>SUPERHEROES</h1>

      <div id="create-block">
        <p>Nickname:</p>
        <CreateNicknameInput
          value={heroData.nickname}
          onChange={current => setHeroData(previous => ({ ...previous, ...current }))}/>

        <p>Real name:</p>
        <CreateRealNameInput
          value={heroData.real_name}
          onChange={current => setHeroData(previous => ({ ...previous, ...current }))}/>

        <p>Origin description:</p>
        <CreateOriginDescriptionInput
          value={heroData.origin_description}
          onChange={current => setHeroData(previous => ({ ...previous, ...current }))}/>

        <p>Superpowers:</p>
        <CreateSuperpowersInput
          value={heroData.superpowers}
          onChange={current => setHeroData(previous => ({ ...previous, ...current }))}/>

        <p>Catch phrase:</p>
        <CreateCatchPhraseInput
          value={heroData.catch_phrase}
          onChange={current => setHeroData(previous => ({ ...previous, ...current }))}/>

        <p>Images:</p>
        <CreateImageUploadInput
        isDisabled={isDisabled}
        onChange={images => setHeroImage(images)}
        onClick={() => handleOnClickCreateButton()}/>

        <HeroesDivs heroes={heroes} onClick={id => handleOnClickModal(id)} />
        <Modal heroModalData={heroModalData}
        onClose={() => setHeroModalData(false)}
        onDelete={id => handleOnClickModalDelete(id)}
        close={() => closeUpdatedModal()}
        />

        <PageButtons totalCount={totalHeroes} limit={limit} offset={offset} onClick={params => handleOnClickPageButton(params)} />

      </div>

    </div>
  )
}

export default App
