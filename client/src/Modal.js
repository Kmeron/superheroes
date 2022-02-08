import PropTypes from 'prop-types'
import { useState } from 'react'
import createHeroImage from './api/createHeroImage'
import updateHero from './api/updateHero'
import './Modal.css'

const Modal = ({ heroModalData, onClose, onDelete, close }) => {
  const [editable, setEditable] = useState(false)
  const [editData, setEditData] = useState(null)
  const [screenImages, setScreenImages] = useState(null)
  const [removedImages, setRemovedImages] = useState([])
  const [newImages, setNewImages] = useState([])
  const handleOnClickImageDeleteButton = (id) => {
    const imagesToRemove = [...removedImages]
    imagesToRemove.push(...heroModalData.images.splice(heroModalData.images.findIndex(image => image.id === id), 1))
    setRemovedImages(imagesToRemove)
    setScreenImages([...heroModalData.images])
  }
  const handleOnClickSaveButton = async () => {
    if ((removedImages.length > editData.images.length) && !newImages.length) return
    const formData = new FormData()
    for (let i = 0; i < newImages.length; i++) {
      formData.append(`images[${i}]`, newImages[i])
    }
    try {
      const { data } = await createHeroImage(formData)
      delete editData.images
      const heroToUpdate = { ...editData, newImagesIds: data, removedImages }
      await updateHero(heroToUpdate)
    } catch (error) {
      alert(error.message)
    }
  }
  if (!heroModalData) return null
  return (
    !editable
      ? (
    <div className="modal">
      <div className="modal-content">

        <div className="modal-header">
          <h1>{heroModalData.nickname}</h1>
        </div>

        <div className="modal-body">
          <p>Real name:</p>
          <p>{heroModalData.real_name}</p>
          <p>Origin description:</p>
          <p>{heroModalData.origin_description}</p>
          <p>Superpowers:</p>
          <p>{heroModalData.superpowers}</p>
          <p>Catch phrase:</p>
          <p>{heroModalData.catch_phrase}</p>
          <p>Images:</p>
          {heroModalData.images.map(image =>
            <img key={image.id} src={'http://localhost:3000/static/' + image.id} width={100} height={100}></img>
          )}

        </div>

        <div className="modal-footer">
          <button onClick={() => {
            setEditable(true)
            setEditData(heroModalData)
            setScreenImages(heroModalData.images)
          }}>Edit</button>
          <button onClick={() => onDelete(heroModalData.id)}>Delete</button>
          <button onClick={onClose}>Close</button>
        </div>

      </div>
    </div>
        )
      : (
      <div className="modal">
      <div className="modal-content">

        <div className="modal-header">
          <p>Nickname:</p>
          <input type="text" value={editData.nickname}
          onChange={event => {
            setEditData({ ...editData, nickname: event.target.value })
          }}/>
        </div>

        <div className="modal-body">

          <p>Real name</p>
          <input type="text" value={editData.real_name}
            onChange={event => {
              setEditData({ ...editData, real_name: event.target.value })
            }}/>

          <p>Origin description:</p>
          <textarea type="text" value={editData.origin_description}
            onChange={event => {
              setEditData({ ...editData, origin_description: event.target.value })
            }}/>

          <p>Superpowers:</p>
          <textarea type="text" value={editData.superpowers}
            onChange={event => {
              setEditData({ ...editData, superpowers: event.target.value })
            }}/>

          <p>Catch phrase:</p>
          <textarea type="text" value={editData.catch_phrase}
            onChange={event => {
              setEditData({ ...editData, catch_phrase: event.target.value })
            }}/>

          <p>Images:</p>
          {screenImages.map(image =>
            <div key={image.id}>
            <img src={'http://localhost:3000/static/' + image.id} width={100} height={100}></img>
            <button onClick={() => handleOnClickImageDeleteButton(image.id)}>x</button>
            </div>
          )}

          <div id="upload-box">
                <input type="file" multiple accept=".jpg, .png" onChange={event => setNewImages(event.target.files)} />

          </div>

        </div>

        <div className="modal-footer">
          <button onClick={() => {
            handleOnClickSaveButton()
              .then(() => close())
              .then(() => {
                setEditable(false)
                setEditData(null)
              })
          }}>Save</button>
          <button onClick={() => onDelete(heroModalData.id)}>Delete</button>
          <button onClick={() => {
            onClose()
            setEditable(false)
            setEditData(null)
          }}>Close</button>
        </div>

      </div>
    </div>
        )
  )
}

Modal.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  heroModalData: PropTypes.any,
  close: PropTypes.func.isRequired
}

export default Modal
