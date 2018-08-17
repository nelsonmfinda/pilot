import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import style from './style.css'

const DataDisplay = ({
  align,
  children,
  color,
  subtitle,
  title,
  titleSize,
  value,
  valueSize,
}) => (
  <div className={
      classNames(style.content, style.justify, {
        [style[align]]: align,
      })
    }
  >
    <div className={
      classNames(style.title, {
        [style[titleSize]]: titleSize,
        })
      }
    >
      {
        typeof title === 'string'
          ? (
            <h2 style={{ color }}>
              {title}
            </h2>
          )
          : title
      }
    </div>

    {children || (
      <div className={
        classNames(style.value, {
          [style[valueSize]]: valueSize,
          })
        }
      >
        <h3>{value}</h3>
      </div>
    )}

    <div className={style.subtitle}>
      {subtitle}
    </div>
  </div>
)

DataDisplay.propTypes = {
  align: PropTypes.oneOf([
    'center',
    'end',
    'start',
  ]),
  children: PropTypes.node,
  color: PropTypes.string,
  subtitle: PropTypes.node,
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  titleSize: PropTypes.oneOf([
    'huge',
    'large',
    'medium',
    'small',
  ]),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  valueSize: PropTypes.oneOf([
    'huge',
    'large',
    'medium',
    'small',
  ]),
}

DataDisplay.defaultProps = {
  align: 'center',
  children: null,
  color: '#757575',
  subtitle: null,
  titleSize: 'small',
  value: '',
  valueSize: 'medium',
}

export default DataDisplay
