import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import api from "./utils/api";
import Product from "./pages/Product";


function App() {

  const token = localStorage.getItem("token")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await api.get("/auth/checkRole", {
          headers: {
            Authorization: token
          }
        })
        setUser(res.data.user)
      } catch (error) {
        setUser(null)
      }
    }

    verifyToken()
  }, [])


  return (
    <div className="container">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/product" element={<Product token={token} user={user} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
