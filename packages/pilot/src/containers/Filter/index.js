import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  CardActions,
  CardContent,
  CardSection,
  Button,
  Tag,
  Row,
  Col,
  CheckboxGroup,
} from 'former-kit'

import Form from 'react-vanilla-form'

import ChevronDown32 from 'emblematic-icons/svg/ChevronDown32.svg'
import ChevronUp32 from 'emblematic-icons/svg/ChevronUp32.svg'

import {
  anyPass,
  equals,
  isNil,
  isEmpty,
  join,
} from 'ramda'

import compileTags from './compileTags'
import style from './style.css'

const isNilOrEmpty = anyPass([isNil, isEmpty])

class Filters extends Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: true,
      query: props.query,
    }

    this.renderChildrenInput = this.renderChildrenInput.bind(this)
    this.handleToogeMoreFilters = this.handleToogeMoreFilters.bind(this)
    this.handleFiltersSubmit = this.handleFiltersSubmit.bind(this)
    this.handleFiltersChange = this.handleFiltersChange.bind(this)
  }

  componentWillReceiveProps ({ query }) {
    if (!equals(query, this.state.query)) {
      this.setState({ query })
    }
  }

  handleToogeMoreFilters () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  handleFiltersSubmit (filters) {
    this.setState({
      collapsed: true,
    })

    this.props.onChange(filters)
  }

  handleFiltersChange (query) {
    this.setState({ query })
  }

  renderChildrenInput (input) {
    return React.cloneElement(input, {
      disabled: this.props.disabled,
    })
  }

  renderToolbar () {
    const {
      query: originalFilters,
      options,
      onClear,
      children,
      t,
    } = this.props

    const {
      collapsed,
      query: currentFilters,
    } = this.state

    const filtersChanged = !equals(originalFilters, currentFilters)

    return (
      <CardActions>
        {children.map(this.renderChildrenInput)}
        {!isNilOrEmpty(options) &&
          <Button
            disabled={this.props.disabled}
            relevance="low"
            fill="outline"
            iconAlignment="end"
            icon={collapsed
              ? <ChevronDown32 width={16} height={16} />
              : <ChevronUp32 width={16} height={16} />
            }
            onClick={this.handleToogeMoreFilters}
          >
            {t('pages.filter.more')}
          </Button>
        }
        <div className={style.spacer} />
        <Button
          relevance={filtersChanged ? 'normal' : 'low'}
          onClick={onClear}
          fill="outline"
          disabled={this.props.disabled}
        >
          {t('pages.filter.reset')}
        </Button>

        <Button
          relevance={filtersChanged ? 'normal' : 'low'}
          disabled={!filtersChanged || this.props.disabled}
          type="submit"
          fill="gradient"
        >
          {t('pages.filter.apply')}
        </Button>
      </CardActions>
    )
  }

  renderOptions () {
    const {
      collapsed,
    } = this.state

    const {
      options,
    } = this.props

    if (isNilOrEmpty(options) || collapsed) {
      return null
    }

    return (
      <CardContent>
        <CardSection>
          <CardContent>
            <fieldset name="properties">
              <Row flex>
                {options.map(({ name, items, key }) => (
                  <Col key={name}>
                    <div className={style.filtersTitle}>
                      {name}
                    </div>
                    <CheckboxGroup
                      columns={items.length > 6 ? 2 : 1}
                      disabled={this.props.disabled}
                      name={key}
                      options={items}
                    />
                  </Col>
                ))}
              </Row>
            </fieldset>
          </CardContent>
        </CardSection>
      </CardContent>
    )
  }

  renderTags () {
    const {
      collapsed,
      query: {
        properties,
      },
    } = this.state

    const {
      options,
      t,
    } = this.props

    if (!collapsed || isNilOrEmpty(properties)) {
      return null
    }

    const tags = compileTags(options, properties)

    return (
      <CardContent className={style.selectedOptionsTags}>
        <span className={style.selectedOptionsTitle}>
          {t('pages.filter.filtering_by')}&nbsp;
        </span>
        {tags.map(({ key, name, items }) => (
          !isNilOrEmpty(items) &&
            <Tag key={key}>
              <strong>{name}</strong>: {join(', ', items)}
            </Tag>
        ))}
      </CardContent>
    )
  }

  render () {
    return (
      <Card className={style.allowOverflow}>
        <Form
          data={this.state.query}
          onChange={this.handleFiltersChange}
          onSubmit={this.handleFiltersSubmit}
        >
          {this.renderToolbar()}
          {this.renderOptions()}
          {this.renderTags()}
        </Form>
      </Card>
    )
  }
}

Filters.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    key: PropTypes.string,
    name: PropTypes.string,
  })),
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  query: PropTypes.object, // eslint-disable-line
  t: PropTypes.func.isRequired,
}

Filters.defaultProps = {
  options: [],
  query: {},
  disabled: false,
}

export default Filters
