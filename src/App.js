import React, { Component } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import Instructions from "./components/Instructions";
import cards from "./cards.json";
import "./App.css";

class App extends Component {
  state = {
    score: 0,
    highScore: 0,
    cards: cards
  };

  randomRender = id => {
    this.state.cards.forEach((image) => {
      if (image.id === id) {
        if (image.clicked) {
          // $("#myModal").modal('toggle');
          alert('YOU LOST!! This card was previously selected.');
          this.setState({})
          this.resetGame();
          return false;
        }
        else {
          this.updateScore();
          image.clicked = true;
        }
        if (this.state.score >= this.state.highScore) {
          this.newHighScore();
        }
      }
    });
  }

  randomOrganize = (array) => {
    let copy = [], n = array.length, i;
    while (n) {
      i = Math.floor(Math.random() * array.length);
      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }
    this.setState({ cards: copy });
  }

  updateScore = () => {
    this.setState((newState) => ({
      score: newState.score + 1
    }), () => this.winning())
  }

  newHighScore = () => {
    this.setState((newState) => ({
      highScore: newState.score
    }))
  }

  winning = () => {
    if (this.state.score === this.state.cards.length) {
      alert('YOU WIN!! congratulations!')
      this.setState({});
      this.resetGame();
    }
    else {
      setTimeout(() => {
        this.randomOrganize(this.state.cards)
      }, 500);
    }
  }

  resetGame = () => {
    this.state.cards.forEach((image) => {
      image.clicked = false;
    })
    this.setState({ score: 0 })
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <Wrapper>
          <Header score={this.state.score} highScore={this.state.highScore} />
          <Instructions />
        {this.state.cards.map(card => {
          return <Card
            {...card}
            key={card.id}
            randomRender={this.randomRender}
            randomOrganize={() => this.randomOrganize(this.state.cards)}
          />;
        })}
      </Wrapper>
  )};
}

export default App;
