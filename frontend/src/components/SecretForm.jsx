import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createSecret} from '../features/secrets/secretSlice'

function SecretForm() {
    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = e=>{
        e.preventDefault()
        dispatch(createSecret({text}))
        setText('')
    }
    return <>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Secret</label>
                    <input type="text" name='text' id='text' value={text} onChange={(e)=>setText(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button className='btn btn-block' type='submit'>Add Secret</button>
                </div>
            </form>
        </section>
    </>
}

export default SecretForm