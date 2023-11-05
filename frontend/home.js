function Home() {
  const [show, setShow] = React.useState(false);

  const toggleShow = () => {
    setShow(!show); // Toggle the value of the show state
  };

  return (
    <>
      <Card
        bgcolor="dark"
        header="Let's climb together."
        title="Welcome to Apex Bank"
        text="We're here to help you reach new heights in your financial wellness journey."
        body={show ? (
          <>
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSebegplokQ4gRzPfiG_IAf9DLrNW8dfI7EDPKpoLT_6FF1pSQ/viewform?embedded=true"
          style={{
            width: '100%', // Set the width to 100% of the Card's width
            height: '400px', // Set a fixed or calculated height as needed
          }}>
            Loading…
          </iframe>
          <button
            type="submit"
            className="btn btn-info button-margin"
            onClick={toggleShow}
          >
            Back to Home Page
          </button>
          </>
        ):(
          <>
            <img src="/res/bluelowbanner2-01.png" className="img-fluid" />
            <br/>
            <button
              type="submit"
              className="btn btn-info button-margin"
              onClick={toggleShow}
            >
              Contact Us
            </button>
          </>
        )}
      />
    </>
  );
}


