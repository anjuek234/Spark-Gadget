import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Signup.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const LOCAL_USER_KEY = 'localSignupUser'

function saveLocalUser(user) {
  localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user))
}

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name || !email || !password || !confirm) {
      setError('Please fill in all fields')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    if (!agree) {
      setError('You must agree to the terms')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(
        `${API_URL}/api/signup`,
        { name, email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )

      if (response.data?.success) {
        navigate(`/login?created=1&email=${encodeURIComponent(email)}`)
      } else {
        setError(response.data?.message || 'Signup failed. Please try again.')
      }
    } catch (err) {
      saveLocalUser({ name, email, password })
      navigate(`/login?created=1&email=${encodeURIComponent(email)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Create account</h1>
          <p>Start your journey with MyApp — it only takes a minute</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="form-input" disabled={loading} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="form-input" disabled={loading} />
          </div>

          <div className="form-group two-col">
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" className="form-input" disabled={loading} />
            </div>

            <div>
              <label htmlFor="confirm">Confirm</label>
              <input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat password" className="form-input" disabled={loading} />
            </div>
          </div>

          <label className="terms">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} disabled={loading} />
            <span>I agree to the <a href="#terms">terms and privacy policy</a></span>
          </label>

          <button className="signup-btn" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}
