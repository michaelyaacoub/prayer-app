import { useState, useEffect } from "react";
import supabase from "./supabase";
import './style.css';


const prayerFilter = [
  { name: "Healing" },
  { name: "Cancer" },
  { name: "Provision" },
  { name: "Human Trafficing" },
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
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(function () {
    async function getRequests() {
      setIsLoading(true)

      let query = supabase.from("prayer_request").select('*');
      if (currentCategory !== "all")
        query = query.eq("category", currentCategory);


      const { data: lists, error } = await query
        .limit(1000)

      if (!error)
        setLists(lists);
      else
        alert("There was a problem fetching data.")
      setIsLoading(false);
    }
    getRequests()
  }, [currentCategory])

  return (
    <>
      <FooterMessage />
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? <PrayerRequestForm
        setLists={setLists}
        setCloseForm={setShowForm}
      /> : null
      }

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? <Loader /> : <PrayerList lists={lists} setLists={setLists} />}

      </main >

    </>
  );
}

function Header({ showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="app logo!" />
        <h1>Prayer Requests</h1>
      </div>
      <button className="btn btn-large activate-btn"
        onClick={() => setShowForm((show) => !show)}
      >{showForm ? "Close" : "Share A Prayer"}</button>
    </header>
  )
}

function Loader() {
  return (
    <p className="message-display">Loading...</p>
  )
}

function PrayerRequestForm({ setLists, setCloseForm }) {
  const [userName, setUserName] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [requestType, setRequestType] = useState("");

  async function handleSubmit(e) {
    // 1. prevent page from reload
    e.preventDefault();
    // 2. data is valid ? create a new prayer request : display err msg
    if (userName && category && message && requestType) {
      // 3. upload prayer requests to supabase
      const { data: newPrayerRequest, error } = await supabase
        .from("prayer_request")
        .insert([{
          userName,
          requestType,
          message,
          category,
          date: `${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`,
        }])
        .select()
        .order('date', { descending: true });
      console.log(newPrayerRequest)
      // 4. add new prayer object to UI: add prayer to state
      if (!error)
        setLists((lists) => [newPrayerRequest[0], ...lists])
      // 5. reset input fields
      setUserName("");
      setCategory("");
      setMessage("");
      setRequestType("");

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
        value={requestType}
        onChange={(e) => setRequestType(e.target.value)}
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

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li>
          <button className="btn categories-btns" onClick={() => setCurrentCategory("all")}>All</button>
        </li>
        {prayerFilter.map((category) => (
          <li key={category.name}>
            <button className="btn categories-btns"
              onClick={() => setCurrentCategory(category.name)}
            >{
                category.name}
            </button>
          </li>
        )
        )}
      </ul>
    </aside>);
}

function PrayerList({ lists, setLists }) {
  if (lists.length === 0)
    return <p className="message-display">No requests under this category yet!</p>
  return (
    <section>
      <ul className="request-list">
        {lists.map((list) => (<PrayerBox key={list.id} list={list} setLists={setLists} />))}
      </ul>
      {/* dbr --> databaseReport
          "let's have a route: something like prayer.com/dbr"
      */}
      {/* <p>There are {dataRequests.length} Prayer requests and 5 Praise reports in the database.</p> */}
      <p>There are {lists.length} requests in the database...</p>
    </section>
  )
}

function PrayerBox({ list, setLists }) {
  const [isUpdateing, setIsUpdating] = useState(false);
  const isPriority = list.praying + list.hug < list.liked_prayer;
  async function handleVotes(columnName) {
    setIsUpdating(true)
    const { data: updatedVote, error } = await supabase
      .from("prayer_request")
      .update({ [columnName]: list[columnName] + 1 })
      .eq("id", list.id)
      .select()

    console.log(updatedVote)
    if (!error)
      setLists((lists) => lists.map((l) => (l.id === list.id ?
        updatedVote[0] : l))
      )
  }
  return (
    <ul>
      <li className="list-requests">
        <div className="box">
          <div className="post-details">
            <div style={{ fontFamily: "Sono" }}>
              <p><span>From: </span>{list.userName}</p>
              <p><span>Posted on: </span>{list.date}</p>
            </div>
            <p><span className="hashtag">#</span>{list.requestType}</p>
          </div>
          <p>
            {isPriority ? <span className="priority-tag">[❗️PRIORITY]</span> : null}
            {list.message}
          </p>
          <div className="vote-buttons">
            <button
              onClick={() => handleVotes("liked_prayer")}
              disabled={isUpdateing}>👍 {list.liked_prayer}</button>
            <button
              onClick={() => handleVotes("praying")}
              disabled={isUpdateing}
            >🙏 {list.praying}</button>
            <button
              onClick={() => handleVotes("hug")}
              disabled={isUpdateing}
            >🤗 {list.hug}</button>
          </div>
          <div className="prayer-tags">
            <li className="tag">{list.category}</li>
          </div>
        </div>
      </li>
    </ul>
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
        <button closebtn={close.toString()} onClick={HandleClose}>x</button>
        <p>This app does not collect any personl data or track any web activities!</p>
      </div>) : null
  )

}

export default App;