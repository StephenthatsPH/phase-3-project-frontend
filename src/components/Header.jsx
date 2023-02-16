import { Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import GamesList from "./GamesList";
import GameForm from "./GameForm";
import PlatformForm from "./PlatformForm";
import PlatformsList from "./PlatformsList";
import Home from "./Home";


function Header({ platforms, onGameDelete, onGameEdit, onAddPlatform, onAddGame }) {

  return (
    <>
      <header className="App-header">
        <nav className="navbar">
          <h1>G A M E T R A X</h1>
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/platformslist">  Platforms</NavLink>
          <NavLink to="/platforms/:id" />
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/platformslist">
            <PlatformsList platforms={platforms} />
            <PlatformForm onAddPlatform={onAddPlatform} />
          </Route>
          <Route exact path="/platforms/:id">
            <GamesList
              platforms={platforms}
              onGameDelete={onGameDelete}
              onGameEdit={onGameEdit}
            />
            <GameForm
              platforms={platforms}
              onAddGame={onAddGame}
            />
          </Route>
        </Switch>
      </header>
    </>
  );
}

export default Header;