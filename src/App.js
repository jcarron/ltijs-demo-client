import React from 'react'
import Home from './pages/home'
import Grades from './pages/grades'
import NamesAndRoles from './pages/namesandroles'
import DeepLink from './pages/deeplink'
import LandingPage from './pages/landingPage'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App () {
  return (
	<BrowserRouter>
	  <Routes>
		<Route path='/' element={<Home />} />
		<Route path='/grades' element={<Grades />} />
		<Route path='/namesandroles' element={<NamesAndRoles />} />
		<Route exact path='/deeplink' element={<DeepLink />} />
		<Route exact path='/nolti' element={<LandingPage />} />
	  </Routes>
  </BrowserRouter>
  )
}
