function Login(){
  const [show, setShow]         = React.useState(true);
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus]     = React.useState('');
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useContext(UserContext); 
 
  React.useEffect(() => {
    if (loggedIn) {
      setShow(false);
    }
  }, [loggedIn])
  
  React.useEffect(() => {
    if (validateForm(email,password)){
      setButtonDisabled(false);
    }
  }, [loggedIn, email, password])

  function loginWithEmailAndPassword(){
    console.log(email,password);
    if (!validateForm(true, email, password)) return;
    window.firebase.signInWithEmailAndPassword(email, password)
      .then(credentials => {
        getAccount(undefined, email)
      })
      .catch(error => {
        console.error('Error:', error);
        setStatus("Issue logging into account. Please verify your email and password.");
        setButtonDisabled(false);
      })
  }    

  function handleLoginWithGoogle (){
    window.firebase.signInWithPopup()
      .then(result => {
        const user = result.user;
        console.log(user.displayName, user.email)
        getAccount(user.displayName, user.email)
      })
      .catch(error => {
        console.error('Error:', error);
        setStatus("Issue logging into account. Please verify your email and password.");
        setButtonDisabled(false);
      })
  }    

  function getAccount(n, e){
    const data = {
      name: n,
      email: e
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch('/api/getAccount', requestOptions)
      .then(response => {
        if (!response.ok){
          throw new Error(`Error! Status: ${response.status}`)
        }
        return response.json();
      })
      .then(responseJSON => {
        console.log('Response Data:', responseJSON);
        setButtonDisabled(() => false)
        setShow(false);
        setStatus('');
        setLoggedIn(responseJSON)
      })
  }

  function clearForm(){
    setEmail('');
    setPassword('');
    setShow(true);
    setLoggedIn(null);
    setStatus('');
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
        <label htmlFor="inputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="inputEmail1" aria-describedby="emailHelp" 
          placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)}>
        </input>
      </div>
      <div className="mb-3">
        <label htmlFor="inputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="inputPassword1" 
          placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)}>
        </input>
      </div>
      <button 
        type="submit" 
        className={`btn btn-info ${buttonDisabled ? `disabled`: ``}`} 
        id="login"
        onClick={loginWithEmailAndPassword}
      >
        Log In
      </button>
      <br/>
      <button 
        type="submit" 
        className={`btn btn-info button-margin`} 
        id="googlelogin"
        onClick={handleLoginWithGoogle}
      >
        Log In With Google
      </button>
    </form>
    ):(
      <>
      <h5>Welcome back!</h5>
      <button 
        type="submit" 
        className="btn btn-info" 
        id="logout" 
        onClick={clearForm}
      >
        Log Out
      </button>
      </>
    )}
    />
  )
}
