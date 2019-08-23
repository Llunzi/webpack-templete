import { render } from 'react-dom'
import React from 'react'
import { Button, Tag } from 'antd'
import trip from './icon-ali-trip.png'

render(
  <div>
    <Button>1</Button>
    <img src={trip} />
  </div>,

  document.getElementById('app')
)
