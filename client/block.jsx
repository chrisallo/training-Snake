
import React from "react";

const BlockState = {
  EMPTY: 'empty',
  SNAKE: 'snake',
  SNAKE_HEAD: 'snake-head',
  APPLE: 'apple',
  BOMB: 'bomb'
};

export default class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: BlockState.EMPTY
    };
  }
  static getDerivedStateFromProps(props, state) {
    state.state = props.state;
  }
  render() {
    return <div className={'block block-' + this.state.state}></div>;
  }
}