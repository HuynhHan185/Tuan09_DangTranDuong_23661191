import { useRecoilState } from 'recoil'
import { cookingTimeAtom, selectedRatingsAtom, selectedTypesAtom } from '../../state/uiState'

const TYPES = ['Pan-fried', 'Stir-fried', 'Grilled', 'Roasted', 'Sauteed', 'Baked', 'Steamed', 'Stewed']
const RATINGS = [5, 4, 3, 2, 1]

export default function FilterSidebar({ onApply }) {
  const [types, setTypes] = useRecoilState(selectedTypesAtom)
  const [ratings, setRatings] = useRecoilState(selectedRatingsAtom)
  const [time, setTime] = useRecoilState(cookingTimeAtom)

  const toggleType = (type) => {
    setTypes((prev) => (prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]))
  }

  const toggleRating = (rating) => {
    setRatings((prev) => (prev.includes(rating) ? prev.filter((item) => item !== rating) : [...prev, rating]))
  }

  return (
    <aside className="filter-sidebar">
      <h3>☰ FILTERS</h3>

      <section>
        <h4>Type</h4>
        <div className="checkbox-grid">
          {TYPES.map((type) => (
            <label key={type}>
              <input type="checkbox" checked={types.includes(type)} onChange={() => toggleType(type)} />
              {type}
            </label>
          ))}
        </div>
      </section>

      <section>
        <h4>Time</h4>
        <div className="time-row">
          <label>
            Min
            <input
              type="number"
              min={5}
              max={120}
              value={time[0]}
              onChange={(event) => setTime([Number(event.target.value), time[1]])}
            />
          </label>
          <label>
            Max
            <input
              type="number"
              min={5}
              max={120}
              value={time[1]}
              onChange={(event) => setTime([time[0], Number(event.target.value)])}
            />
          </label>
        </div>
      </section>

      <section>
        <h4>Rating</h4>
        <div className="rating-list">
          {RATINGS.map((rating) => (
            <label key={rating}>
              <input type="checkbox" checked={ratings.includes(rating)} onChange={() => toggleRating(rating)} />
              {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
            </label>
          ))}
        </div>
      </section>

      <button type="button" className="apply-btn" onClick={() => onApply?.()}>
        Apply
      </button>
    </aside>
  )
}
