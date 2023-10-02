function Login(){
  const [show, setShow]         = React.useState(true);
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus]     = React.useState('');
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [accounts, setAccounts, loggedIn, setLoggedIn] = React.useContext(UserContext); 
 
  React.useEffect(() => {
    if (loggedIn >= 0) {
      setShow(false);
    }
  }, [loggedIn])
  
  
  React.useEffect(() => {
    if ((loggedIn == -1) && (validateForm(email,password))){
      setButtonDisabled(false);
    }
  }, [loggedIn, email, password])

  function handleLoggedAccount(){
    const accountIndex = accounts.findIndex(account => account.email === email && account.password === password);
    if (accountIndex === -1){
      setStatus("Error: incorrect email or password")
    }
    else {
      setLoggedIn(accountIndex);
      setShow(false)
      setStatus('')
      setButtonDisabled(true)
    };
  }

  function clearForm(){
    setEmail('');
    setPassword('');
    setShow(true);
    setLoggedIn(-1);
  }

  function validate(field, label){
    if (!field) {
      setStatus('Error: Please provide a valid ' + label);
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
}

function validateForm(email, password){
  if (!validate(email,    'email'))    return false;
  if (!validate(password, 'password') || password.length < 8) return false;
  return true;
}

  return (
    <Card
    bgcolor="dark" 
    header="Log In"
    status={status}
    body={ show ? (  
      <form>
      <div className="mb-3">
        <label for="inputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="inputEmail1" aria-describedby="emailHelp" 
          placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)}>
        </input>
      </div>
      <div className="mb-3">
        <label for="inputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="inputPassword1" 
          placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)}>
        </input>
      </div>
      <button type="submit" className={`btn btn-info ${buttonDisabled ? `disabled`: ``}`} 
        onClick={handleLoggedAccount}>Log In
      </button>
    </form>
    ):(
      <>
      <h5>Welcome back!</h5>
      <button type="submit" className="btn btn-info" onClick={clearForm}>Log Out</button>
      </>
    )}
    />
  )
}
