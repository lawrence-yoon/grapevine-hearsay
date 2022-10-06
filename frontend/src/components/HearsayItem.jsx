import React from 'react'

function HearsayItem({secret}) {
    return (
      <div className='secret'>
          <div>
              {new Date(secret.createdAt).toLocaleString('en-US')}
          </div>
          <h3>{secret.text}</h3>
      </div>
    )
}

export default HearsayItem