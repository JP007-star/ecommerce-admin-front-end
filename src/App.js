import './App.css';
import { useEffect } from 'react';
import { Route,Routes} from 'react-router-dom';
import { SignIn } from './containers/SignIn';
import { SignUp } from './containers/SignUp';
import { Home } from './containers/Home';
import PrivateRoute from './components/HOC/PrivateRoute';
import { isUserLoggedIn} from './actions';
import { useDispatch ,useSelector } from 'react-redux';


function App() {
  const dispatch = useDispatch()
  const auth=useSelector(state =>state.auth)


  useEffect(() => {
      if(!auth.authenticate){
          dispatch(isUserLoggedIn());
      }
  },[])

  return (
    <>
    <div className="App">
      
         <Routes>
           <Route path="/"    exact={false}    element={<PrivateRoute><Home/></PrivateRoute>}/>
           <Route path="/signin" element={<SignIn/>}/>
           <Route path="/signup" element={<SignUp/>}/>
          
         </Routes>
      
      
    </div>
    </>
  );
}

export default App;
