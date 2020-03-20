import React from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter as BRouter } from 'react-router-dom'
import routes from './routes'

const Router = () => {
  return (
    <BRouter>
      {renderRoutes(routes)}
    </BRouter >
  )
}

export default Router