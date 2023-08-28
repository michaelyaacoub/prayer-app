import PrayerBox from "./prayerBox";

function PrayerList({ lists, setLists }) {
    return (
        <section>
            <ul className="request-list">
                {lists.map((list) => (<PrayerBox key={list.id} list={list} setLists={setLists} />))}
            </ul>
        </section>
    )
}

export default PrayerList;