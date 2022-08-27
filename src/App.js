import Movies from "./components/movies";
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
  return (
    <main className="container">
      <Movies />
    </main>
  );
}
}

export default App;
