import { Suspense } from 'react'
import Routes from './routes'
import { useRoutes } from 'react-router'

function App() {
  const routes = useRoutes(Routes);
  return (
    <Suspense fallback={<h2>Loading....</h2>}>
      {routes}
    </Suspense>
  )
}

export default App