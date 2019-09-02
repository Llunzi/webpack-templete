import { render } from 'react-dom'
import React from 'react'
import './index.less'
import styles from './app.module.less'

import('@sentry/browser').then(Sentry => {
  Sentry.init({ dsn: 'https://44884d76ac6f4e4ab609bc7ac13f7739@sentry.io/1546255' })
})

render(
  <div className={styles['app']}>
    <button>Break the world</button>
  </div>,

  document.getElementById('app')
)
