import { BrowserRouter as Router} from "react-router-dom";
import { useEffect, useState } from 'react'
import './App.css';
import Header from './components/Header';

function App() {

  const [platforms, setPlatforms] = useState([])
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
        fetch('http://localhost:9292/platforms')
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data')
                }
                return res.json();
            })
            .then(data => {
              setPlatforms(data);
              setIsPending(false);
              setError(null);
              setRefresh(false);
            })
            .catch(err => {
              setIsPending(false);
              setError(err.message);
            })
          }
}, []);


  return (
    <Router>
      <div className="game-app">
        <Header platforms={ platforms } />
      </div>
    </Router>
  );
}

export default App;
