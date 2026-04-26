import { useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import CheffifyFooter from '../../components/cheffify/CheffifyFooter'
import CheffifyBreadcrumb from '../../components/cheffify/CheffifyBreadcrumb'
import CheffifyHeader from '../../components/cheffify/CheffifyHeader'
import FilterSidebar from '../../components/cheffify/FilterSidebar'
import RecipeCard from '../../components/cheffify/RecipeCard'
import { searchQueryAtom, visibleRecipesSelector } from '../../state/uiState'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryAtom)
  const visibleRecipes = useRecoilValue(visibleRecipesSelector)
  const [sortBy, setSortBy] = useState('A-Z')
  const [appliedAt, setAppliedAt] = useState('')
  const [page, setPage] = useState(1)

  const sortedRecipes = useMemo(() => {
    const items = [...visibleRecipes]

    if (sortBy === 'A-Z') {
      return items.sort((a, b) => a.name.localeCompare(b.name))
    }

    if (sortBy === 'Newest') {
      return items.reverse()
    }

    return items.sort((a, b) => b.rating - a.rating)
  }, [sortBy, visibleRecipes])

  const pageSize = 6
  const totalPages = Math.max(1, Math.ceil(sortedRecipes.length / pageSize))
  const pageRecipes = sortedRecipes.slice((page - 1) * pageSize, page * pageSize)

  const onApplyFilter = () => {
    setAppliedAt(new Date().toLocaleTimeString())
    setPage(1)
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
          { label: 'Search Recipes' },
        ]}
      />

      <main className="search-layout section">
        <FilterSidebar onApply={onApplyFilter} />

        <section>
          <div className="title-row">
            <h2>{searchQuery || 'Salad'} ({visibleRecipes.length})</h2>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option>A-Z</option>
              <option>Newest</option>
              <option>Popular</option>
            </select>
          </div>
          {appliedAt ? <p className="tiny-note">Filters applied at {appliedAt}</p> : null}

          <div className="recipe-grid three">
            {pageRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
          </div>

          <div className="pagination">
            <button type="button" disabled={page === 1} onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
              Prev
            </button>
            <span> {page} / {totalPages} </span>
            <button type="button" disabled={page === totalPages} onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}>
              Next
            </button>
          </div>
        </section>
      </main>

      <CheffifyFooter />
    </div>
  )
}
