import PrayerBox from "./prayerBox";

const lists = []; // Initialize or assign your data here

function PrayerList({ lists, setLists }) {
  return (
    <section>
      <ul className="request-list">
        {lists.map((list) => (
          <PrayerBox key={list.id} list={list} setLists={setLists} />
        ))}
      </ul>
    </section>
  );
}

export { PrayerList, lists }; // Export the component and 'lists'
