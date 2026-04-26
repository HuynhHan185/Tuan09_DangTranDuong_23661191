import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import CheffifyBreadcrumb from '../../components/cheffify/CheffifyBreadcrumb'
import CheffifyFooter from '../../components/cheffify/CheffifyFooter'
import CheffifyHeader from '../../components/cheffify/CheffifyHeader'
import FilterSidebar from '../../components/cheffify/FilterSidebar'
import data from '../../data/cheffify.json'
import { searchQueryAtom } from '../../state/uiState'

export default function SearchEmptyPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryAtom)

  const applyTag = (tag) => {
    setSearchQuery(tag)
    navigate('/search')
  }

  return (
    <div className="chef-page">
      <CheffifyHeader
        searchValue={searchQuery}
        onSearchChange={(event) => setSearchQuery(event.target.value)}
      />

      <CheffifyBreadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Search Recipes', to: '/search' },
          { label: 'No Results' },
        ]}
      />

      <main className="search-layout section">
        <FilterSidebar />

        <section className="empty-wrap">
          <h2>Sorry, no results were found for “{searchQuery || 'cakescascsa'}”</h2>
          <div className="empty-icon">⌕✕</div>
          <p>We have all your Independence Day sweets covered.</p>
          <div className="tag-row">
            {data.emptySearchTags.map((tag) => (
              <button type="button" key={tag} onClick={() => applyTag(tag)}>{tag}</button>
            ))}
          </div>
        </section>
      </main>

      <CheffifyFooter />
    </div>
  )
}
