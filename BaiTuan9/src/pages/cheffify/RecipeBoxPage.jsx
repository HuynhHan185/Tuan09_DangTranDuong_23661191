import { useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import CheffifyFooter from '../../components/cheffify/CheffifyFooter'
import CheffifyBreadcrumb from '../../components/cheffify/CheffifyBreadcrumb'
import CheffifyHeader from '../../components/cheffify/CheffifyHeader'
import RecipeCard from '../../components/cheffify/RecipeCard'
import AppImage from '../../components/common/AppImage'
import data from '../../data/cheffify.json'
import { searchQueryAtom } from '../../state/uiState'

export default function RecipeBoxPage() {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryAtom)
  const [activeTab, setActiveTab] = useState('saved')
  const [page, setPage] = useState(1)

  const recipes = useMemo(() => {
    if (activeTab === 'folders') {
      return data.catalog.slice(2, 8)
    }
    if (activeTab === 'genevieve') {
      return data.catalog.slice(5, 10)
    }
    return data.catalog.slice(0, 8)
  }, [activeTab])

  const pageSize = 4
  const totalPages = Math.max(1, Math.ceil(recipes.length / pageSize))
  const pageRecipes = recipes.slice((page - 1) * pageSize, page * pageSize)

  const copyShareLink = async () => {
    const url = window.location.href
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url)
      return
    }
    window.prompt('Copy this link:', url)
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
          { label: 'Your Recipe Box' },
        ]}
      />

      <main className="section">
        <h1>{data.recipeBoxOwner.title}</h1>

        <section className="owner-row">
          <AppImage src={data.recipeBoxOwner.avatar} alt={data.recipeBoxOwner.name} />
          <div>
            <p>{data.recipeBoxOwner.description}</p>
            <div className="owner-actions">
              <strong>{data.recipeBoxOwner.subscribers}</strong>
              <button type="button" onClick={copyShareLink}>Share ↗</button>
            </div>
          </div>
        </section>

        <div className="tabs">
          <button className={activeTab === 'saved' ? 'active' : ''} type="button" onClick={() => { setActiveTab('saved'); setPage(1) }}>
            Saved Recipes
          </button>
          <button className={activeTab === 'folders' ? 'active' : ''} type="button" onClick={() => { setActiveTab('folders'); setPage(1) }}>
            Folders
          </button>
          <button className={activeTab === 'genevieve' ? 'active' : ''} type="button" onClick={() => { setActiveTab('genevieve'); setPage(1) }}>
            Recipes by Genevieve
          </button>
        </div>

        <div className="recipe-grid four">
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
      </main>

      <CheffifyFooter />
    </div>
  )
}
