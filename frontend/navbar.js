function NavBar(){
  const createAccountPopover = React.useRef()
  const loginPopover = React.useRef()
  const depositPopover = React.useRef()
  const withdrawPopover = React.useRef()
  const allDataPopover = React.useRef()
  const [selectedNav, setSelectedNav] = React.useState()
  const [loggedIn] = React.useContext(UserContext);

  React.useEffect(() => {
    var createAccountPopoverInstance = new bootstrap.Tooltip(createAccountPopover.current)
    var loginPopoverInstance = new bootstrap.Tooltip(loginPopover.current)
    var depositPopoverInstance = new bootstrap.Tooltip(depositPopover.current)
    var withdrawPopoverInstance = new bootstrap.Tooltip(withdrawPopover.current)
    var allDataPopoverInstance = new bootstrap.Tooltip(allDataPopover.current)
  }, [])

  const navList = [
    {
      id: "createAccount",
      ref: createAccountPopover,
      popoverTitle: "Start depositing and withdrawing from an account",
      href: "#/CreateAccount/",
      content: "Create An Account"
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
    {
      id: "allDataNav",
      ref: allDataPopover,
      popoverTitle: "View deposit and withdrawal history",
      href: "#/alldata/",
      content: "All Data"
    }
  ];

  return(
    <nav className="navbar navbar-expand-md bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand add-margin" onClick={() => {setSelectedNav(-1)}} href="#">Apex Bank</a>
        <button className="navbar-toggler  navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navList.map((item, index) => {
              return <li 
                key={`nav-bar-item-${index}`}
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
          <span className="d-flex">
            <div className={`nav-name nav-link me-2`}>
              {!loggedIn ? null : loggedIn.name}
            </div> 
          </span>
        </div>
      </div>
    </nav>
  );
}