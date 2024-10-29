
import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import Home from './pages/Home';
import PageTitle from './components/PageTitle';
import Shop from './pages/Shop';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <PageTitle title="Home" />
          <Home />
        </>
      } />
      <Route path="/shop" element={
        <>
          <PageTitle title="Show Now" />
          <Shop />
        </>
      } />

    </Routes>
  );
}

export default App;
