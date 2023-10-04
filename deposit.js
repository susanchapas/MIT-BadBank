function Deposit(){
  const [show, setShow] = React.useState(true);
  const [depositAmount, setDepositAmount] = React.useState();
  const [status, setStatus] = React.useState('')
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [accounts, setAccounts, loggedIn] = React.useContext(UserContext);

  React.useEffect(() => {
    if (validate(depositAmount, 'depositAmount')){
      setButtonDisabled(false);
    }
  }, [depositAmount])

  function validate(field, label){
    if (loggedIn >= 0 && !field) {
      setButtonDisabled(true);
      return false;
    }
    return true;
  }

  function handleDeposit(){
    if (loggedIn === -1){
      setStatus("Must log in to make deposit.")
    }
    else {
      if (parseFloat(depositAmount) != depositAmount){
        setStatus("The deposit minimum is $1. Please make sure to type a number.")
      }
      else if (parseFloat(depositAmount) <= 0.99){
        setStatus("The deposit minimum is $1. Please try again.")
      }
      else {
        const newTransaction = accounts[loggedIn].name + " deposited $" + depositAmount + " " + new Date()
        setAccounts(oldAccounts => {
          oldAccounts[loggedIn].balance += parseFloat(depositAmount);
          oldAccounts[loggedIn].history.unshift(newTransaction);
          return[...oldAccounts]
        })
        setShow(false);
        setStatus("Current Balance: $" + accounts[loggedIn].balance);
        setButtonDisabled(true);
      }
    }
  }

  function clearForm(){
    setDepositAmount();
    setShow(true);
    setStatus('');
  }

  return (
    <Card
      bgcolor="dark" 
      header="Deposit"
      status={status}
      body={ show ? (  
        <form>
        <div className="mb-3">
          <label className="form-label">{loggedIn === -1 ? "Log in to make a deposit." : "Current Balance: $" + accounts[loggedIn].balance}</label>
        </div>
        {
          loggedIn === -1 ? 
          null : 
          <>
            <div className="mb-3">
              <label for="depositAmount" className="form-label">Deposit Amount</label>
              <input type="number" min="1" className="form-control" id="depositAmount" placeholder="Enter a number here."
              value={depositAmount} onChange={e => setDepositAmount(e.currentTarget.value)}></input>
            </div>
            <button type="submit" className={`btn btn-info ${buttonDisabled ? `disabled`: ``}`}
              onClick={handleDeposit}>Deposit
            </button> 
          </>
        }
      </form>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-info" onClick={clearForm}>Deposit More</button>
              </>
            )}
    />
  )
}