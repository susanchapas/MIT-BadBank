function AllData(){
  const [show, setShow] = React.useState(false);
  const [status, setStatus] = React.useState('')
  const [loggedIn, setLoggedIn] = React.useContext(UserContext);

  React.useEffect(() => {
    if (loggedIn) {
      setShow(true)
    }
  }, [loggedIn])

  function handleDelete(){
    const data = {
      _id: loggedIn._id,
      name: loggedIn.name,
      email: loggedIn.email
    }
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch('/api/deleteAccount', requestOptions)
      .then(response => {
        if (!response.ok){
          throw new Error(`Error! Status: ${response.status}`)
        }
        return response.json();
      })
      .then(responseJSON => {
        console.log('Response Data:', responseJSON);
        setShow(false);
        setLoggedIn(null);
        setStatus("Account deleted.");
      })
      .catch(error => {
        console.error('Error:', error);
        setStatus("Could not delete account. Please try again.");
      });
    }
  

  return (
    <Card
      bgcolor="dark" 
      header="All Data In Store"
      status={status}
      body={ show ? ( 
        <>
          <div className="mb-3">
          Current Balance: ${loggedIn.balance}
          </div>
          <button type="submit" className="btn btn-info button-margin"
              onClick={handleDelete}>Delete Account
            </button> 
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
