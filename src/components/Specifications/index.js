import React, {Component, PropTypes} from "react";
import {css} from "aphrodite";
import specs from "./style"

export default class Specifications extends Component {
  renderResults({name, child, skipped, wrongResults, goodResults}) {
    return (
      <div className={skipped ? css(specs.skipped) : css(specs.parentWrapper)}>
        {child ? <h4 className={css(specs.heading)}>{name}</h4> : <h3 className={css(specs.heading)}>{name}</h3>}
        <ul className={css(specs.list)}>
          {wrongResults.map((r, idx) =>
            <li className={css(specs.error, specs.li)} key={idx}>
              <p className={css(specs.p)}>{r.spec}</p>
              <p className={css(specs.message)}>{r.message}</p></li>)}

          {goodResults.map((r, idx) =>
            <li className={css(specs.pass, specs.li)} key={idx}>
              <p className={css(specs.p)}>{r}</p>
            </li>
          )}
        </ul>
      </div>
    );
  }

  renderChildren(children) {
    return (
      <div className={css(specs.childrenWrapper)}>
        {Object.values(children).map(({name, children, ...rest}, idx) => {
          return (
            <div key={name}>
              {this.renderResults({name, child: true, ...rest})}
              {children && this.renderChildren(children)}
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    let {
      results: {
        name,
        children,
        ...rest
      }
    } = this.props;
    return (
      <div className={css(specs.wrapper)}>
        {this.renderResults({name, ...rest})}
        {children && this.renderChildren(children)}
      </div>
    );
  }
}
