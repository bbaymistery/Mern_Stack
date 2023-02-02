import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/authAction'

const Login = () => {
  const initialState = { email: '', password: '' }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData

  const [typePass, setTypePass] = useState(false)
  const { auth: { token }, alert: { loading, success } } = useSelector(state => state)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (token) history.push("/")
  }, [token, history])

  //!nbunu ozumuz ekledik hani girene error falan olsa bilek niye girmedi ve sairee
  useEffect(() => {
    if (success?.includes("mail")) {
      alert(success)
    }
  }, [success])

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(login(userData))
  }

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h5 className="text-uppercase text-center mb-4">V-Social</h5>

        <div className="form-group">
          <label style={{ fontSize: '15px' }} htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name="email"
            aria-describedby="emailHelp" onChange={handleChangeInput} value={email} />

          <small style={{ fontSize: '13px' }} id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label style={{ fontSize: '15px' }} htmlFor="exampleInputPassword1">Password</label>

          <div className="pass">

            <input type={typePass ? "text" : "password"}
              className="form-control" id="exampleInputPassword1"
              onChange={handleChangeInput} value={password} name="password" />

            <small style={{ fontSize: '12px' }} onClick={() => setTypePass(!typePass)}>
              {typePass ? 'Hide' : 'Show'}
            </small>
          </div>

        </div>

        <button type="submit" className="btn btn-dark w-100"
          disabled={email && password ? false : true}>
          {loading ? "..." : "Login"}
        </button>

        <p className="my-2" style={{ fontSize: '13px' }}>
          You don't have an account?
          &nbsp;
          <Link to="/register" style={{ color: "crimson" }}>
            Register Now
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login