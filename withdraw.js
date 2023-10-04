function Withdraw(){
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('')
  const [withdrawalAmount, setWithdrawalAmount] = React.useState();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [accounts, setAccounts, loggedIn, history, setHistory] = React.useContext(UserContext);

  React.useEffect(() => {
    if (validate(withdrawalAmount, 'withdrawalAmount')){
      setButtonDisabled(false);
    }
  }, [withdrawalAmount])

  function validate(field, label){
    if (loggedIn >= 0 && !field) {
      setButtonDisabled(true);
      return false;
    }
    return true;
  }

  function handleWithdrawal(){
    if (loggedIn === -1){
      setStatus("Must log in to make withdrawal.")
    }
    else {
      if (parseFloat(withdrawalAmount) != withdrawalAmount) {
        setStatus("The withdrawal minimum is $1. Please make sure to type a number.")
      }
      else if (parseFloat(withdrawalAmount) <= 0.99){
        setStatus("The withdrawal minimum is $1. Please try again.")
      }
      else if (accounts[loggedIn].balance < parseFloat(withdrawalAmount)){
        setStatus("Overdraft alert: Insufficient funds")
      }
      else {
        const newTransaction = accounts[loggedIn].name + " withdrew $" + withdrawalAmount + " " + new Date()
        setAccounts(oldAccounts => {
          oldAccounts[loggedIn].balance -= parseFloat(withdrawalAmount);
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
    setWithdrawalAmount();
    setShow(true);
    setStatus('')
  }

  return (
    <Card
      bgcolor="dark" 
      header="Withdraw"
      status={status}
      body={show ? (  
        <form>
        <div className="mb-3">
          <label className="form-label">{loggedIn === -1 ? "Log in to make a withdrawal." : "Current Balance: $" + accounts[loggedIn].balance}</label>
        </div>
        {
          loggedIn === -1 ?
          null :
          <>
            <div className="mb-3">
          <label for="withdrawalAmount" className="form-label">Withdrawal Amount</label>
          <input type="number" min="1" className="form-control" id="withdrawalAmount" placeholder="Enter a number here."
            value={withdrawalAmount} onChange={e => setWithdrawalAmount(e.currentTarget.value)}>
          </input>
        </div>
        <button type="submit" className={`btn btn-info ${buttonDisabled ? `disabled`: ``}`}
          onClick={handleWithdrawal}>Withdraw
        </button>
          </>
        } 
      </form>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-info" onClick={clearForm}>Withdraw More</button>
              </>
            )
          }
    />
  )
  }
