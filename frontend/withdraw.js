function Withdraw(){
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('')
  const [withdrawalAmount, setWithdrawalAmount] = React.useState();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useContext(UserContext);

  React.useEffect(() => {
    if (validate(withdrawalAmount, 'withdrawalAmount')){
      setButtonDisabled(false);
    }
  }, [withdrawalAmount])

  function validate(field, label){
    if (!loggedIn && !field) {
      setButtonDisabled(true);
      return false;
    }
    return true;
  }

  function handleWithdrawal(){
    if (!loggedIn){
      setStatus("Must log in to make withdrawal.")
    }
    else {
      if (parseFloat(withdrawalAmount) != withdrawalAmount) {
        setStatus("The withdrawal minimum is $1. Please make sure to type a number.")
      }
      else if (parseFloat(withdrawalAmount) <= 0.99){
        setStatus("The withdrawal minimum is $1. Please try again.")
      }
      else if (loggedIn.balance < parseFloat(withdrawalAmount)){
        setStatus("Overdraft alert: Insufficient funds")
      }
      else {
        const data = {
          amount: parseFloat(withdrawalAmount),
          type: 'withdrawal',
          _id: loggedIn._id,
          name: loggedIn.name
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
            setLoggedIn(responseJSON) 
            setButtonDisabled(() => false)
            setShow(false);
            setStatus("Current Balance: $" + responseJSON.balance);
          })
          .catch(error => {
            console.error('Error:', error);
            setStatus("Issue withdrawing funds. Please try again.");
          });
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
          <label className="form-label">{!loggedIn ? "Log in to make a withdrawal." : "Current Balance: $" + loggedIn.balance}</label>
        </div>
        {
          !loggedIn ?
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
