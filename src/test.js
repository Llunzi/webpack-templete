import { render } from 'react-dom'
import React from 'react'
import { Button, Tag } from 'antd'
import trip from './icon-ali-trip.png'
import styles from './app.module.less'
import './index.less'

console.log('App.tsx styles = ', styles)

render(
  <div className={styles['app']}>
    <Button className="btn">1</Button>
    <img src={trip} />
  </div>,
  document.getElementById('app')
)
