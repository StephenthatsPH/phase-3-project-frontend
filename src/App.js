import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="game-app">
        <Header />
      </div>
    </Router>
  );
}

export default App;
