import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useSelector } from 'react-redux'
import Routes from 'routes/route'
import Spinner from 'components/Loader'
import './App.css'

const queryClient = new QueryClient()

const App = () => {
  const { loaderReducer } = useSelector((state: any) => state)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [loaderReducer])

  return (
    <QueryClientProvider client={queryClient}>
      {loaderReducer?.loader && <Spinner />}
      <Routes />
    </QueryClientProvider>
  )
}

export default App
