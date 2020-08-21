import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Board, Welcome, How2Play, HighScores } from './components'

export const App = () =>
  <Router>
    <Route exact={true} path="/">
      <Welcome />
      <Link to="/game">Start Game!</Link>
      <Link to="/how-2-play">How to Play</Link>
      <Link to="/high-scores">High Scores</Link>
    </Route>

    <Switch>
      <Route path="/game">
        <Board />
      </Route>

      <Route path="/how-2-play">
        <How2Play />
      </Route>

      <Route path="/high-scores">
        <HighScores />
      </Route>
      </Switch>
  </Router>
