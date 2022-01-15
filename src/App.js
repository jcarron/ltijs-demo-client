import React from 'react'
import Home from './pages/home'
import Grades from './pages/grades'
import NamesAndRoles from './pages/namesandroles'
import DeepLink from './pages/deeplink'
import LandingPage from './pages/landingPage'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function App () {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}>
          <Home />
        </Route>
        <Route exact path='/grades' element={<Grades />}>
          <Grades />
        </Route>
        <Route exact path='/namesandroles' element={<NamesAndRoles />}>
          <NamesAndRoles />
        </Route>
        <Route exact path='/deeplink' element={<DeepLink />}>
          <DeepLink />
        </Route>
        <Route exact path='/nolti' element={<LandingPage />}>
          <LandingPage />
        </Route>
      </Routes>
    </Router>
  )
}
