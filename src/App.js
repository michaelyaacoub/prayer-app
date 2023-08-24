import './style.css';
import { useState, useEffect } from "react";

const dataRequests = [
  {
    id: 1,
    userName: "Michael",
    date: "08-07-2023",
    prayerType: "Prayer Request",
    message: "Pray for my roommate Craig, he has stage 4 cancer and has been fighting cancer for the past 2 years. Just pray that God may be glorfied and heal him and he goes cancer free.",
    category: ["Cancer", "Healing", "Courage", "Peace"],
    liked_prayer: 62,
    praying: 41,
    hug: 97
  },
  {
    id: 2,
    userName: "Diana",
    date: "08-11-2023",
    prayerType: "Praise report",
    message: "Pray for peace and joy in her circumstances. Pray for peace and joy in her circumstances. Pray for peace and joy in her circumstances.",
    category: ["Peace", "Joy"],
    liked_prayer: 12,
    praying: 33,
    hug: 5
  },
  {
    id: 3,
    userName: "Ryan",
    date: "08-12-2023",
    prayerType: "Prayer Request",
    message: "My mom's cousin died on the 4th of July, and her mom has been a huge support. Her mom’s cousin’s parents are still alive, so pray for everyone involved and potential drama.",
    category: ["Peace", "Support", "Courage"],
    liked_prayer: 21,
    praying: 13,
    hug: 7
  }
];

const prayerFilter = [
  { name: "Human Trafficing" },
  { name: "Cancer" },
  { name: "Healing" },
  { name: "Peace" },
  { name: "Wisdom" },
  { name: "Courage" },
  { name: "Spiritual Life" },
  { name: "Marriage" },
];

const requestOptions = [
  { request: "Prayer Request" },
  { request: "Praise Report" }
]
function App() {
  useEffect(() => {
    // Scroll to the top of the page on component mount
    window.scrollTo(0, 0);
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [lists, setLists] = useState(dataRequests);


  return (
    <>
      <FooterMessage />
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? <PrayerRequestForm
        setLists={setLists}
        setCloseForm={setShowForm}
      /> : null}

      <main className="main">
        <CategoryFilter />
        <PrayerList lists={lists} />
      </main >
    </>
  );
}

function Header({ showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="this is share a prayer app logo!" />
        <h1>Prayer Requests</h1>
      </div>
      <button className="btn btn-large activate-btn"
        onClick={() => setShowForm((show) => !show)}
      >{showForm ? "Close" : "Share A Prayer"}</button>
    </header>
  )
}

function PrayerRequestForm({ setLists, setCloseForm }) {
  const [userName, setUserName] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [prayerType, setPrayerType] = useState("");

  function handleSubmit(e) {
    // 1. prevent page from reload
    e.preventDefault();
    // 2. data is valid ? create a new prayer request : display err msg
    if (userName && category && message && prayerType) {
      // 3. create new prayer object and update state
      const newPrayerRequest =
      {
        id: 1,
        userName,
        date: `${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`,
        prayerType,
        message,
        category,
        liked_prayer: 62,
        praying: 41,
        hug: 97
      }
      // 4. add new prayer object to UI: add prayer to state
      setLists((lists) => [newPrayerRequest, ...lists])
      // 5. reset input fields
      setUserName("");
      setCategory("");
      setMessage("");
      setPrayerType("");

      // 6. close form
      setCloseForm(false);
    }
  }

  return (
    <form
      className="fill-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="user_name"
        id="user_name"
        placeholder="First name:"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <select
        name="selection"
        id="selection"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Choose prayer category</option>
        {prayerFilter.map((filt) => (
          <option
            key={filt.name}
            value={filt.name}
          >
            {filt.name.toUpperCase()}
          </option>
        ))}
      </select>
      <textarea
        name="prayer"
        rows="1"
        cols="40"
        placeholder="Type your prayer request"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      >
      </textarea>
      <select name="selection" id=""
        value={prayerType}
        onChange={(e) => setPrayerType(e.target.value)}
      >
        <option value="">Choose Prayer/Praise Catagory</option>
        {requestOptions.map((req) => (
          <option
            key={req.request}
            value={req.request}
          >
            {req.request}
          </option>
        ))}
      </select>
      <button id="submit-post" className="btn btn-large">Post Prayer</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li>
          <button className="btn categories-btns">All</button>
        </li>
        {prayerFilter.map((category) => (
          <li key={category.name}>
            <button className="btn categories-btns">{category.name}</button>
          </li>
        )
        )}
      </ul>
    </aside>);
}

function PrayerList({ lists }) {
  return (
    <section>
      <ul className="request-list">
        {lists.map((list) => (<PrayerBox key={list.id} list={list} />))}
      </ul>
      <p>There are {dataRequests.length} Prayer requests in the database also,
        let's have new route to tell us how many requests are in the db. "something like prayer.com/dbr"
      </p>
    </section>
  )
}

function PrayerBox({ list }) {
  return (
    <li className="list-requests">
      <div className="box">
        <div className="post-details">
          <div style={{ fontFamily: "Sono" }}>
            <p><span>From: </span>{list.userName}</p>
            <p><span>Posted on: </span>{list.date}</p>
          </div>
          <p><span className="hashtag">#</span>{list.prayerType}</p>
        </div>
        <p>{list.message}</p>
        <div className="vote-buttons">
          <button>👍{list.liked_prayer}</button>
          <button>🙏{list.praying}</button>
          <button>🤗{list.hug}</button>
        </div>
        <div className="prayer-tags">
          <li className="tag">{list.category}</li>
        </div>
      </div>
    </li>
  )
}

function FooterMessage() {
  const [close, setClose] = useState(true);

  const HandleClose = () => {
    setClose(false)
  }
  return (
    close ? (
      <div className="pop-up">
        <button id="btn-msg" closebtn={close.toString()} onClick={HandleClose}>x</button>
        <p>This app does not collect personl data or track any web activities!</p>
      </div>) : null
  )

}

export default App;