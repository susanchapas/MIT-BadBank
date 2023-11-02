function Balance(){
  const [show, setShow]         = React.useState(false);
  const [accounts, setAccounts, loggedIn, setLoggedIn] = React.useContext(UserContext);

  React.useEffect(() => {
    if (loggedIn >= 0) {
      setShow(true)
    }
  }, [])

  return (
    <Card
      bgcolor="dark" 
      header="Account Balance"
      body={ show ? (  
        <div class="mb-3">
          Current Balance: ${accounts[loggedIn].balance}
        </div>
        ):(
            <div class="mb-3">
              Log in to view account balance.
            </div> 
          )
      } 
    />
  )
}
