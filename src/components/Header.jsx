import { Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import GamesList from "./GamesList";
import GameForm from "./GameForm";


function Header() {
  return (
    <>
      <header className="App-header">
        <nav className="navbar">
            <h1>G A M E T R A X</h1>
            <NavLink exact to="/">Games</NavLink>
            <NavLink to="/gameform"> Add Game</NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={GamesList}/>
          <Route exact path="/gameform" component={GameForm}/>
        </Switch>
      </header>
    </>
  );
}

export default Header;