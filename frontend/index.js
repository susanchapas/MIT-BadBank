const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);

function Spa() {
  const [loggedIn, setLoggedIn] = React.useState()

  return (
    <UserContext.Provider value={[loggedIn, setLoggedIn]}>
      <HashRouter>
        <NavBar/>
        <div className="container" style={{padding: "20px"}}>
          <Route path="/" exact component={Home} />
          <Route path="/createaccount/" component={CreateAccount} />
          <Route path="/login/" component={Login} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          <Route path="/alldata/" component={AllData} />
        </div>
      </HashRouter>
    </UserContext.Provider>  
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);