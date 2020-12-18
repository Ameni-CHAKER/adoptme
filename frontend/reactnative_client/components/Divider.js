import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Block from './Block';

const colors = {
  accent: "#F3534A",
  primary: "#0AC4BA",
  secondary: "#2BDA8E",
  tertiary: "#FFE358",
  black: "#323643",
  white: "#FFFFFF",
  gray: "#9DA3B4",
  gray2: "#C5CCD6",
};

const sizes = {
  // global sizes
  base: 16,
  font: 14,
  radius: 6,
  padding: 25,

  // font sizes
  h1: 26,
  h2: 20,
  h3: 18,
  title: 18,
  header: 16,
  body: 14,
  caption: 12,
};

const fonts = {
  h1: {
    fontSize: sizes.h1
  },
  h2: {
    fontSize: sizes.h2
  },
  h3: {
    fontSize: sizes.h3
  },
  header: {
    fontSize: sizes.header
  },
  title: {
    fontSize: sizes.title
  },
  body: {
    fontSize: sizes.body
  },
  caption: {
    fontSize: sizes.caption
  },
};

export default class Divider extends Component {
  render() {
    const { color, style, ...props } = this.props;
    const dividerStyles = [
      styles.divider,
      style,
    ];

    return (
      <Block
        color={color || colors.gray2}
        style={dividerStyles}
        {...props}
      />
    )
  }
}

export const styles = StyleSheet.create({
  divider: {
    height: 0,
    margin: sizes.base * 2,
    borderBottomColor: colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
})
