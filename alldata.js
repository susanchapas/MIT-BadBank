function AllData(){
  const [show, setShow]         = React.useState(false);
  const [accounts, setAccounts, loggedIn] = React.useContext(UserContext);

  React.useEffect(() => {
    if (loggedIn >= 0) {
      setShow(true)
    }
  }, [loggedIn])

  return (
    <Card
      bgcolor="dark" 
      header="All Data In Store"
      body={ show ? ( 
        <>
          <div class="mb-3">
          Current Balance: ${accounts[loggedIn].balance}
          </div>
          <br/>
            <ul className="list-group list-group-flush">
              {accounts[loggedIn].history.map(item => <li className="list-group-item list-group-item-info">{item}</li>)}
            </ul>
        </>
        ):(
        <div class="mb-3">
          Log In to view account history.
        </div> 
        )
      } 
    />
  )
}
