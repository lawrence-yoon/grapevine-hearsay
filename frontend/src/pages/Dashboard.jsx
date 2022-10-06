import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import SecretForm from '../components/SecretForm'
import Spinner from '../components/Spinner'
import { getSecrets, reset } from '../features/secrets/secretSlice'
import SecretItem from '../components/SecretItem'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.auth)
  const {secrets, isLoading, isError, message} = useSelector((state)=>state.secrets)
  useEffect(()=>{
    if(isError){
      console.log(message)

    }
    if(!user){
      navigate('/login')
    }

    dispatch(getSecrets())

    return ()=>{
      dispatch(reset)
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading){
    return <Spinner/>
  }

  return <>
    <section className="heading">
      <h1>Hello {user&&user.name}</h1>
      <p>Dashboard</p>
    </section>
    <SecretForm/>
    <section className="content">
      {secrets.length>0?
        <div className='secrets'>
        {secrets.map((secret)=>(
          <SecretItem key={secret._id} secret={secret} />
        ))}
      </div>
      :<h3>You have no secrets</h3>}
    </section>
  </>
  
}

export default Dashboard