import React, {useState} from 'react'
import db, {auth} from '../firebase/firebase'
import {setUserData} from './../reducers/authReducer'
import SignUp from './../components/SignUp'
import {connect} from 'react-redux'

const SignUpContainer = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const signUp = async (e) => {
    e.preventDefault()
    if (username && username.length < 20) {
      let result = await auth.createUserWithEmailAndPassword(email, password)
      try {
        setUserData(result.user)
        db.collection('users').doc(result.user.uid).set({
          displayName: username,
          photoURL: '',
          uid: result.user.uid,
          email: result.user.email,
          status: '',
        })
        auth.currentUser.updateProfile({
          displayName: username,
          photoURL: '',
        })
      } catch (e) {
        alert(e)
      }
    } else {
      alert('Username слишком длинный')
    }
  }
  return (
    <SignUp
      {...props}
      signUp={signUp}
      setUsername={setUsername}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  )
}

export default connect(null, {
  setUserData,
})(SignUpContainer)
