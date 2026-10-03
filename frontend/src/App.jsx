import  {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Register from './pages/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import UserProfile from './pages/UserProfile.jsx'

function App() {
return(
  <>
  <Router>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
        <Route element={<ProtectedRoute/>}>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/profile' element={<UserProfile/>}></Route>
        </Route>
    </Routes>
  </Router>
  </>
)
}
export default App
