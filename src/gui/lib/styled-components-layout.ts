import React from "react";
import { css } from "styled-components";

export const WithTag = ({ as, children, to, onClick, ...props }) =>
  React.createElement(as, { to, onClick, ...props }, children);

WithTag.defaultProps = {
  as: "div",
};

const is = (value) => Boolean(value);
const prop = (value) => (is(value) ? value : "initial");
export const ifProps = (name, styles) => (props) => is(props[name]) && styles;
export const getStyle = (propsName, styles) => (props) =>
  props[propsName] && styles[props[propsName]];

export const mixins = (props) => css`
  align-content: ${prop(props.alignContent)};
  align-items: ${prop(props.align)};
  flex-basis: ${prop(props.basis)};
  flex-grow: ${prop(props.grow)};
  flex-shrink: ${prop(props.shrink)};
  justify-content: ${prop(props.justify)};
  order: ${prop(props.order)};
  padding: ${prop(props.padding)};
  width: ${prop(props.width)};
  max-width: ${prop(props.maxW)};
`;
