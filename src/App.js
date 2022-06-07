import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import { SignIn } from './containers/SignIn';
import { SignUp } from './containers/SignUp';
import { Home } from './containers/Home';

function App() {
  return (
    <div className="App">
        
      
       <Router>
         <Routes>
           <Route path="/" element={<Home/>}></Route>
           <Route path="/signin" element={<SignIn/>}/>
           <Route path="/signup" element={<SignUp/>}/>
          
         </Routes>
       </Router>
    </div>
  );
}

export default App;
