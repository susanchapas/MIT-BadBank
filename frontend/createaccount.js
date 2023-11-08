function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  // const [accounts, setAccounts] = React.useContext(UserContext);  

  React.useEffect(() => {
    if (validateForm(false, name,email,password)){
      setButtonDisabled(false);
    }
  }, [name, email, password])

  function validate(field, label, printError){
      if (!field) {
        if(printError){
             setStatus('Error: Please provide a valid ' + label);
            setTimeout(() => setStatus(''),3000);
        }
        return false;
      }
      return true;
  }

  function isTinyPassword(password, printError){
    if (password.length < 8){
      if(printError){
        setStatus("Passwords must be a minimum of 8 characters.");
        setTimeout(() => setStatus(''),3000);
      }
      return true
    }
    return false
  }

  function validateForm(printError, name, email, password){
    if (!validate(name,     'name', printError))     return false;
    if (!validate(email,    'email', printError))    return false;
    if (!validate(password, 'password', printError) || isTinyPassword(password, printError)) return false;
    return true;
  }

  function handleBankAccountCreation(n, e) {
    setButtonDisabled(() => true)
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
    fetch('/api/createAccount', requestOptions)
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
        setStatus('')
      })
  }

  function handleCreateWithEmailAndPassword(){
    console.log(name,email,password);
    if (!validateForm(true, name, email, password)) return;
    window.firebase.createUserWithEmailAndPassword(email, password)
      .then(credentials => {
        handleBankAccountCreation(name, email)
      })
      .catch(error => {
        console.error('Error:', error);
        setStatus("Issue creating account. Are you sure this email isn't already taken?");
        setButtonDisabled(false);
      })
  }    

  function handleCreateWithGoogle(){
    window.firebase.signInWithPopup()
      .then(result => {
        const user = result.user;
        console.log(user.displayName, user.email)
        handleBankAccountCreation(user.displayName, user.email)
      })
      .catch(error => {
        console.error('Error:', error);
        setStatus("Issue creating account. Are you sure this email isn't already taken?");
        setButtonDisabled(false);
      })
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
    setButtonDisabled(true);
  }

  return (
    <Card
      bgcolor="dark" 
      header="Create An Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" 
                value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" 
                value={email} onChange={e => setEmail(e.currentTarget.value)}/>
              <br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" 
                value={password} onChange={e => setPassword(e.currentTarget.value)}/>
              <br/>
              <button 
                type="submit" 
                className={`btn btn-info ${buttonDisabled ? `disabled`: ``}`} 
                id="signup"
                onClick={handleCreateWithEmailAndPassword}
              >
                Create Account
              </button>
              <br/>
              <button 
                type="submit" 
                className={`btn btn-info button-margin`} 
                id="googlelogin"
                onClick={handleCreateWithGoogle}
              >
                Create Account with Google
              </button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-info" 
                onClick={clearForm}>Create another account
              </button>
              <br/>
              <a href="#/login/">
                <button 
                  type="submit" 
                  className="btn btn-info button-margin" 
                  >
                    Log In
                </button>
              </a>
              </>
            )}
    />
  )
}