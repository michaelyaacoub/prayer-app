import { prayerFilter } from "./requestForm"

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

export default CategoryFilter