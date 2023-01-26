import { Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import GamesList from "./GamesList";
import GameForm from "./GameForm";
import Home from "./Home";


function Header() {
  return (
    <>
      <header className="App-header">
        <nav className="navbar">
          <h1>G A M E T R A X</h1>
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/gameslist">  Games</NavLink>
          <NavLink to="/gameform">  Add Game</NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/gameslist" component={GamesList} />
          <Route exact path="/gameform" component={GameForm} />
        </Switch>
      </header>
    </>
  );
}

export default Header;