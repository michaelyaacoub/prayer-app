import PrayerBox from "./prayerBox";

const lists = []; // Initialize or assign your data here

function PrayerList({ lists, setLists }) {
  // Sort lists by date in ascending order before rendering
  const sortedLists = lists.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section>
      <ul className="request-list">
        {sortedLists.map((list) => (
          <PrayerBox key={list.id} list={list} setLists={setLists} />
        ))}
      </ul>
    </section>
  );
}

export { PrayerList, lists }; // Export the component and 'lists'
