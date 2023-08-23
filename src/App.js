import { func } from "prop-types";
import "./style.css"
import { useState } from "react";

const dataRequests = [
  {
    id: 1,
    user_name: "Michael",
    date: "08-07-2023",
    request_type: "Prayer Request",
    request_text: "Pray for my roommate Craig, he has stage 4 cancer and has been fighting cancer for the past 2 years. Just pray that God may be glorfied and heal him and he goes cancer free.",
    category: ["Cancer", "Healing", "Courage", "Peace"],
    liked_prayer: 62,
    praying: 41,
    hug: 97
  },
  {
    id: 2,
    user_name: "Diana",
    date: "08-11-2023",
    request_type: "Praise report",
    request_text: "Pray for peace and joy in her circumstances. Pray for peace and joy in her circumstances. Pray for peace and joy in her circumstances.",
    category: ["Peace", "Joy"],
    liked_prayer: 12,
    praying: 33,
    hug: 5
  },
  {
    id: 3,
    user_name: "Ryan",
    date: "08-12-2023",
    request_type: "Prayer Request",
    request_text: "My mom's cousin died on the 4th of July, and her mom has been a huge support. Her mom’s cousin’s parents are still alive, so pray for everyone involved and potential drama.",
    category: ["Peace", "Support", "Courage"],
    liked_prayer: 21,
    praying: 13,
    hug: 7
  }
];




function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? <PrayerRequestForm /> : null}

      <FooterMessage />

      <main className="main">
        <CategoryFilter />
        <PrayerList />
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

function PrayerRequestForm() {
  return (
    <form className="fill-form">
      Prayer request form "hide-form"
    </form>
  );
}
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
function CategoryFilter() {
  return (
    <aside>
      <ul>
        {/* list of buttons */}
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

function PrayerList() {
  const lists = dataRequests;
  return (
    <section>
      <ul className="request-list">
        {lists.map((list) => (<PrayerBox key={list.id} list={list} />))}
      </ul>
      <p>There are {dataRequests.length} Prayer requests in the database</p>
    </section>
  )
}

function PrayerBox({ list, test }) {
  return (
    <li className="list-requests">
      <div className="box">
        <div className="post-details">
          <div style={{ fontFamily: "Sono" }}>
            <p><span>From: </span>{list.user_name}</p>
            <p><span>Posted on: </span>{list.date}</p>
          </div>
          <p><span className="hashtag">#</span>{list.request_type}</p>
        </div>
        <p>{list.request_text}</p>
        <div className="vote-buttons">
          <button>👍{list.liked_prayer}</button>
          <button>🙏{list.praying}</button>
          <button>🤗{list.hug}</button>
        </div>
        <div className="prayer-tags">
          <li className="tag">{list.category.join(" ")}</li>
        </div>
      </div>
    </li>
  )
}

function FooterMessage() {
  return (
    <footer>
      <div className="pop-up">
        <button id="btn-msg">x</button>
        <p>This app does not collect personl data or track any web activities!</p>
      </div>
      <div className="pop-up">
        <p>
          Thank you for submiting this request, We will review request and post it, shorty.
        </p>
        <button id="btn-msg" className="fas fa-check"
          style={{
            backgroundColor: "#37e46a",
            borderColor: "#37e46a",
            cursor: "default"
          }}
        >✓</button>
      </div>

    </footer>
  )
}

export default App;