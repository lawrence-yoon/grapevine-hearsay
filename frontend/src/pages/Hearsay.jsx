import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import { getHearsay, reset } from '../features/secrets/secretSlice'
import HearsayItem from '../components/HearsayItem'

function Hearsay() {
  const dispatch = useDispatch()
  const {hearsay, isLoading, isError, message} = useSelector((state)=>state.secrets)
  useEffect(()=>{
    if(isError){
      console.log(message)
    }

    dispatch(getHearsay())

    return ()=>{
      dispatch(reset)
    }
  }, [isError, message, dispatch])

  if(isLoading){
    return <Spinner/>
  }

  return <>
  <section className="heading">
    <h1>This is hearsay.</h1>
    <p>Do not believe everything you read on the internet.</p>
  </section>
  {/* I need to get a way to fetch all the secrets, and render them here. It is a little foggy in my head because its obfuscated by auth. I suppose I need to get good at that stuff. */}
  <section className="content">
    {/* {secrets.length>0?
      <div className='secrets'>
      {secrets.map((secret)=>(
        <SecretItem key={secret._id} secret={secret} />
      ))}
    </div>
    :<h3>You have no secrets</h3>} */}
    {hearsay.map((secret)=>(
          <HearsayItem key={secret._id} secret={secret} />
    ))}
  </section>
</>
}

export default Hearsay