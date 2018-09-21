
import React, {
  cloneElement,
  Component,
  Fragment,
} from 'react'
import {
  TransitionMotion,
  spring,
  presets,
} from 'react-motion'
import PropTypes from 'prop-types'
import {
  identity,
  ifElse,
  is,
  map,
  mapObjIndexed,
} from 'ramda'

const applySpring = springPreset =>
  val => spring(val, springPreset || presets.noWobble)

const applySpringIfIsNumber = springOptions => ifElse(
  is(Number),
  applySpring(springOptions),
  identity
)

const ensureSpring = (springOptions, styleOptions) =>
  mapObjIndexed(
    applySpringIfIsNumber(springOptions),
    styleOptions
  )

class Transition extends Component {
  constructor () {
    super()

    this.didLeave = this.didLeave.bind(this)
    this.getDefaultStyles = this.getDefaultStyles.bind(this)
    this.getStyles = this.getStyles.bind(this)
    this.renderChild = this.renderChild.bind(this)
    this.renderChildren = this.renderChildren.bind(this)
    this.willEnter = this.willEnter.bind(this)
    this.willLeave = this.willLeave.bind(this)
  }

  getDefaultStyles () {
    if (!this.props.runOnMount) {
      return null
    }

    if (!this.props.children) {
      return []
    }

    return [
      {
        data: this.props.children,
        key: this.props.children.key,
        style: this.props.atEnter,
      },
    ]
  }

  getStyles () {
    const { children } = this.props
    if (!children) {
      return []
    }

    if (is(Array, children)) {
      return map(child => ({
        data: child,
        key: child.key,
        style: ensureSpring(this.props.springOptions, this.props.atActive),
      }), children)
    }

    const { key } = children
    if (!key) {
      // eslint-disable-next-line no-console
      console.warn('Transition child must have a key')
    }

    return [
      {
        data: this.props.children,
        key,
        style: ensureSpring(this.props.springOptions, this.props.atActive),
      },
    ]
  }

  willEnter () {
    return this.props.atEnter
  }

  willLeave () {
    return ensureSpring(this.props.springOptions, this.props.atLeave)
  }

  didLeave (styleThatLeft) {
    if (this.props.didLeave) {
      this.props.didLeave(styleThatLeft)
    }
  }

  renderChild (config) {
    const props = {
      key: config.key,
      style: this.props.mapStyles(config.style),
    }

    if (is(Array, config.data)) {
      return map(element => cloneElement(element, props), config.data)
    }

    return cloneElement(config.data, props)
  }

  renderChildren (interpolatedStyles) {
    return (
      <Fragment>
        {interpolatedStyles.map(this.renderChild)}
      </Fragment>
    )
  }

  render () {
    return (
      <TransitionMotion
        defaultStyles={this.getDefaultStyles()}
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        didLeave={this.didLeave}
      >
        {this.renderChildren}
      </TransitionMotion>
    )
  }
}

Transition.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  atActive: PropTypes.object.isRequired,
  atEnter: PropTypes.object.isRequired,
  atLeave: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
  children: PropTypes.node.isRequired,
  didLeave: PropTypes.func,
  mapStyles: PropTypes.func,
  runOnMount: PropTypes.bool,
  springOptions: PropTypes.shape({
    damping: PropTypes.number,
    precision: PropTypes.number,
    stiffness: PropTypes.number,
  }),
}

Transition.defaultProps = {
  didLeave: identity,
  mapStyles: identity,
  runOnMount: false,
  springOptions: presets.noWobble,
}

export default Transition
