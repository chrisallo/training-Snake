
import React from "react";
import Block from "./block";

const BoardSize = {
  width: 25,
  height: 25
};
const StartPoint = {
  x: parseInt(BoardSize.width / 2),
  y: parseInt(BoardSize.height / 2),
  length: 3
};
const LENGTH_TO_WIN = 45;
const GAME_SPEED = 500;
const HARDCORE_GAME_SPEED = 300;

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    const initSnake = [];
    for(let i = 0; i < StartPoint.length; i++) {
      initSnake.push({ x: StartPoint.x, y: StartPoint.y + i });
    }
    this.interval = null;
    this.direction = 'up';
    this.state = {
      snake: initSnake, // array of point (x, y), first item is head
      apple: {}, // location of apple (x, y)
      point: 0
    };
    this.onKeydown = this.onKeydown.bind(this);
  }
  startGame() {
    this.interval = setInterval(() => {
      const newSnake = [];
      switch(this.direction) {
        case 'up':
          newSnake.push({
            x: this.state.snake[0].x,
            y: this.state.snake[0].y - 1
          });
          break;
        case 'down':
          newSnake.push({
            x: this.state.snake[0].x,
            y: this.state.snake[0].y + 1
          });
          break;
        case 'left':
          newSnake.push({
            x: this.state.snake[0].x - 1,
            y: this.state.snake[0].y
          });
          break;
        case 'right':
          newSnake.push({
            x: this.state.snake[0].x + 1,
            y: this.state.snake[0].y
          });
          break;
      }
      for(let i in this.state.snake) {
        newSnake.push(this.state.snake[i]);
      }
      newSnake.pop();
      this.setState({
        snake: newSnake
      });
    },
    GAME_SPEED);
  }
  stopGame() {
    if(this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  resetGame() {
    this.stopGame();
  }
  onKeydown(e) {
    switch(e.keyCode) {
      case 27: { // ESC KEY DOWN
        this.resetGame();
        break;
      }
      case 32: { // SPACE KEY DOWN
        this.stopGame();
        break;
      }
      case 37: { // LEFT KEY DOWN
        if(!this.interval) {
          this.startGame();
        }
        if(this.direction !== 'right') {
          this.direction = 'left';
        }
        break;
      }
      case 38: { // UP KEY DOWN
        if(!this.interval) {
          this.startGame();
        }
        if(this.direction !== 'down') {
          this.direction = 'up';
        }
        break;
      }
      case 39: { // RIGHT KEY DOWN
        if(!this.interval) {
          this.startGame();
        }
        if(this.direction !== 'left') {
          this.direction = 'right';
        }
        break;
      }
      case 40: { // DOWN KEY DOWN
        if(!this.interval) {
          this.startGame();
        }
        if(this.direction !== 'up') {
          this.direction = 'down';
        }
        break;
      }
    }
    e.preventDefault();
  }
  render() {
    const blocks = [];
    for(let j = 0; j < BoardSize.height; j++) {
      const row = [];
      for(let i = 0; i < BoardSize.width; i++) {
        let state = 'empty';
        for(let p in this.state.snake) {
          const point = this.state.snake[p];
          if(point.x === i && point.y === j) {
            state = (p > 0) ? 'snake' : 'snake-head';
            break;
          }
        }
        if(this.state.apple.x === i && this.state.apple.y === j) {
          state = 'apple';
        }
        row.push(<Block state={state}></Block>);
      }
      blocks.push(<div class='row'>{row}</div>);
    }
    return <div><div class='board'
      tabIndex='0'
      onKeyDown={this.onKeydown}>
      {blocks}
    </div>
    <div></div>
    <div class='point'>{'Point: ' + this.state.point + '/' + LENGTH_TO_WIN}</div></div>;
  }
}