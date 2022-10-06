import React from 'react'
import {useDispatch} from 'react-redux'
import {deleteSecret} from '../features/secrets/secretSlice'

function SecretItem({secret}) {
  const dispatch = useDispatch()
  return (
    <div className='secret'>
        <div>
            {new Date(secret.createdAt).toLocaleString('en-US')}
        </div>
        <h3>{secret.text}</h3>
        <button onClick={()=>dispatch(deleteSecret(secret._id))} className="close">Delete</button>
    </div>
  )
}

export default SecretItem