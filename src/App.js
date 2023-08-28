import { useState, useEffect } from "react";
import Header from "./components/header";
import PrayerRequestForm from "./components/requestForm";
import PrayerList from "./components/prayerList";
import CategoryFilter from "./components/categoryFilter";
import HeaderPopUp from "./components/headerPopUp";
import Loader from "./components/loader";
import supabase from "./supabase";
import './style.css';


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
      <HeaderPopUp />
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

export default App;