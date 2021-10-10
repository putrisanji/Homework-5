import { QueryClient, QueryClientProvider } from "react-query"
import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "./App.css"
import TransaksiPage from "./pages/transaksi/TransaksiPage"
import Login from "./pages/login/Login"
import Home from "./pages/Home/Home"
import Logout from "./pages/Status/Logout"
import RegisterAgen from "./pages/Register/RegisterAgen"
import RegisterCustomer from './pages/Register/RegisterCustomer'
import AuthorizedRoute from "./AuthorizedRoute"
import RestrictedWrapper from "./RestrictedWrapper"
import { AuthorizedContextProvider } from "./AuthorizedContext"
import RateComponent from "./components/rating/RateComponent"

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthorizedContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact>
              <RestrictedWrapper>
                <Login />
                {/* <RateComponent /> */}
              </RestrictedWrapper>
            </Route>
            <Route path="/RegisterAgen" exact>
              <RegisterAgen />
            </Route>
            <Route path="/RegisterCustomer" exact>
              <RegisterCustomer />
            </Route>
            <Route path="/rate" exact>
              <RateComponent />
            </Route>
            <AuthorizedRoute
              path="/Transaksi"
              exact
              component={TransaksiPage}
            ></AuthorizedRoute>
            <Route path="/signout" exact>
              <Logout />
              </Route>
            <AuthorizedRoute path="/home" exact component={Home}></AuthorizedRoute>
          </Switch>
        </Router>
      </AuthorizedContextProvider>
    </QueryClientProvider>
  )
}

export default App
