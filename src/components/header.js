function Header({ showForm, setShowForm }) {
    return (
      <header className="header">
        <div className="logo">
          <a href="https://michaelyaacoub.github.io/prayer-app/"><img src="./logo.png" alt="app logo!" /></a>
          <h1>Prayer Requests</h1>
        </div>
        <button className="btn btn-large activate-btn"
          onClick={() => setShowForm((show) => !show)}
        >{showForm ? "Close" : "Share A Prayer"}</button>
      </header>
    )
  }

export default Header;