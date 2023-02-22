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
          <NavLink to="/new-game"> New Game</NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/platformslist">
            <PlatformForm onAddPlatform={onAddPlatform} />
            <PlatformsList platforms={platforms} />
          </Route>
          <Route exact path="/platforms/:id/games">
            <GamesList
              platforms={platforms}
              onGameDelete={onGameDelete}
              onGameEdit={onGameEdit}
            />
          </Route>
          <Route exact path="/new-game">
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