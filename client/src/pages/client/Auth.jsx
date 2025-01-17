import React, { useState } from 'react'
import AuthComponent from '../../components/common/AuthComponent'
import { clientLogin, clientSignup } from '../../utils/api/clientApi'
import {actions} from '../../redux/authSlice'
import { useDispatch } from 'react-redux'

function Auth() {
  const [errorEncountered, setError] = useState('')
  const [verificationState, setVerificationState] = useState(true)
  const dispatch = useDispatch()

  async function handleLogin(e) {
    e.preventDefault()
    const email = e.target[0].value
    const pass = e.target[1].value
  
    // console.log(email, pass)
    const response = await clientLogin(email, pass)
    // console.log(response)
    if(response.error){
      console.log(response.error)
      return setError(response.error)
    }
    if(response.message == 'Email sent successfully'){
      return setVerificationState(false)
    }
    // console.log(response.client, response.token)
    dispatch(actions.setClientToken(response.token))
    localStorage.setItem('CLIENT_TOKEN', response.token)
  }
  async function handleSignup(e){
    e.preventDefault()
    const fullname = e.target[0].value
    const email = e.target[1].value
    const pass = e.target[2].value
    const confirmPass = e.target[3].value

    if(pass != confirmPass){
      return setError("Password doesn't match")
    }
    const response = await clientSignup(fullname, email, pass)
    console.log(response)

    if(response.error){
      console.log(response.error)
      return setError(response.error)
    }
    if(response.message = 'Email sent successfully')
      return setVerificationState(false)
  }
  return (
    <AuthComponent 
      handleLogin = {handleLogin} 
      handleSignup = {handleSignup}
      errorEncountered = {errorEncountered} 
      setError = {setError}
      userType = 'client'
      verificationState = {verificationState}
    />
  )
}

export default Auth