import React, { useState } from 'react'
import api from '../utils/api'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [selectedRole, setSelectedRole] = useState("user")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = {
                email,
                password,
                role: selectedRole
            }

            const res = await api.post("/user/login", data)
            localStorage.setItem("token", res.data.token)
            navigate("/product")
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-5">
                    Role:-
                    <select onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="vendor">Vendor</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input required type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Login
