import Home from './pages/Home';
import {Routes, Route, Navigate } from 'react-router-dom';

function App() {


  return (
    <Routes>
      <Route path='/r/:subreddit/:sort' element={<Home /> }></Route>
      <Route path= '/' element={<Navigate to='/r/popular/hot'  replace/>}></Route>
    </Routes>
  );  
}

export default App;
