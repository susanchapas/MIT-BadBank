function Deposit(){
  const [show, setShow] = React.useState(true);
  const [depositAmount, setDepositAmount] = React.useState();
  const [status, setStatus] = React.useState('')
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useContext(UserContext);

  React.useEffect(() => {
    if (validate(depositAmount, 'depositAmount')){
      setButtonDisabled(false);
    }
  }, [depositAmount])

  function validate(field, label){
    if (!loggedIn && !field) {
      setButtonDisabled(true);
      return false;
    }
    return true;
  }

  function handleDeposit(){
    if (!loggedIn){
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
        const data = {
          amount: depositAmount,
          type: 'deposit',
          _id: loggedIn._id
        }
        const requestOptions = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        fetch('/api/updateBalance', requestOptions)
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
            setStatus("Current Balance: $" + loggedIn.balance);
            setLoggedIn(responseJSON)
          })
          .catch(error => {
            console.error('Error:', error);
            setStatus("Issue depositing funds. Please try again.");
          });
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
          <label className="form-label">{!loggedIn ? "Log in to make a deposit." : "Current Balance: $" + loggedIn.balance}</label>
        </div>
        {
          !loggedIn ? 
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