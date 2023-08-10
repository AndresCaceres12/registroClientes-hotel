import React from 'react'
import Principal from './page/Principal'
import ContextData from './components/ContextData'
const App = () => {
  return (
    <ContextData>
      <Principal/>
    </ContextData>
  )
}

export default App