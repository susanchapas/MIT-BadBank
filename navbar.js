function NavBar(){
  const createAccountPopover = React.useRef()
  const loginPopover = React.useRef()
  const depositPopover = React.useRef()
  const withdrawPopover = React.useRef()
  //const balancePopover = React.useRef()
  const allDataPopover = React.useRef()
  const [selectedNav, setSelectedNav] = React.useState()

  React.useEffect(() => {
    var createAccountPopoverInstance = new bootstrap.Tooltip(createAccountPopover.current)
    var loginPopoverInstance = new bootstrap.Tooltip(loginPopover.current)
    var depositPopoverInstance = new bootstrap.Tooltip(depositPopover.current)
    var withdrawPopoverInstance = new bootstrap.Tooltip(withdrawPopover.current)
    //var balancePopoverInstance = new bootstrap.Tooltip(balancePopover.current)
    var allDataPopoverInstance = new bootstrap.Tooltip(allDataPopover.current)

  }, [])

  const navList = [
    {
      id: "createAccountNav",
      ref: createAccountPopover,
      popoverTitle: "Start depositing and withdrawing from an account",
      href: "#/CreateAccount/",
      content: "Create Account"
    },
    {
      id: "logInNav",
      ref: loginPopover,
      popoverTitle: "Access an existing account",
      href: "#/login/",
      content: "Log In"
    },
    {
      id: "depositNav",
      ref: depositPopover,
      popoverTitle: "Deposit money into your account",
      href: "#/deposit/",
      content: "Deposit"
    },
    {
      id: "withdrawNav",
      ref: withdrawPopover,
      popoverTitle: "Withdraw money from your account",
      href: "#/withdraw/",
      content: "Withdraw"
    },
    // {
    //   id: "balanceNav",
    //   ref: balancePopover,
    //   popoverTitle: "View your account balance",
    //   href: "#/balance/",
    //   content: "Balance"
    // },
    {
      id: "allDataNav",
      ref: allDataPopover,
      popoverTitle: "View deposit and withdrawal history",
      href: "#/alldata/",
      content: "All Data"
    }
  ];

  return(
    <>
    <nav className="navbar bg-dark navbar-expand-lg bg-dark">
      <a className="navbar-brand" href="#">Apex Bank</a>
      <button className="navbar-toggler" type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {navList.map((item, index) => {
            return <li 
              className={`nav-item ${selectedNav === index ? "highlighted" : ""}`} 
              onClick={() => {setSelectedNav(index)}}
            >
              <a className={`nav-link`} id={item.id}
                ref={item.ref} 
                data-bs-toggle="tooltip" data-bs-placement="bottom" 
                data-bs-title={item.popoverTitle} data-bs-trigger="hover"
                href={item.href}>
                  {item.content}
              </a>
            </li>
          })}     
        </ul>
      </div>
    </nav>
    </>
  );
}