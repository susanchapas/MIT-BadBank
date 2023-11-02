function AllData(){
  const [show, setShow] = React.useState(false);
  const [loggedIn] = React.useContext(UserContext);

  React.useEffect(() => {
    if (loggedIn) {
      setShow(true)
    }
  }, [loggedIn])

  return (
    <Card
      bgcolor="dark" 
      header="All Data In Store"
      body={ show ? ( 
        <>
          <div className="mb-3">
          Current Balance: ${loggedIn.balance}
          </div>
          <br/>
            <ul className="list-group list-group-flush">
              {loggedIn.history.map(item => <li className="list-group-item list-group-item-info">{item}</li>)}
            </ul>
        </>
        ):(
        <div className="mb-3">
          Log In to view account history.
        </div> 
        )
      } 
    />
  )
}
