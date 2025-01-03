import logo from '../assists/logo.png'
function Header({ showForm, setShowForm }) {
    return (
      <header className="header">
        <div className="logo">
          <a href="https://michaelyaacoub.github.io/prayer-app/"><img src={logo} alt="app logo!" /></a>
          <h1 className="header-title">Pray For Me</h1>
        </div>
        <button className="btn btn-large activate-btn"
          onClick={() => setShowForm((show) => !show)}
        >{showForm ? "Close" : "Add A Prayer Request"}</button>
      </header>
    )
  }

export default Header;