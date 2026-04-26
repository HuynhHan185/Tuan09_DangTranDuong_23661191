import { useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import CheffifyFooter from '../../components/cheffify/CheffifyFooter'
import CheffifyHeader from '../../components/cheffify/CheffifyHeader'
import RecipeCard from '../../components/cheffify/RecipeCard'
import AppImage from '../../components/common/AppImage'
import data from '../../data/cheffify.json'
import { searchQueryAtom } from '../../state/uiState'

function pick(ids) {
  return ids.map((id) => data.catalog.find((item) => item.id === id)).filter(Boolean)
}

export default function HomePage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryAtom)
  const summerRecipes = useMemo(() => pick(data.summerRecipeIds), [])
  const videoRecipes = useMemo(() => pick(data.videoRecipeIds), [])

  return (
    <div className="chef-page">
      <CheffifyHeader
        searchValue={searchQuery}
        onSearchChange={(event) => setSearchQuery(event.target.value)}
      />

      <section className="hero" style={{ backgroundImage: `url(${data.hero.backgroundImage})` }}>
        <article className="hero-card">
          <span>{data.hero.subtitle}</span>
          <h2>{data.hero.title}</h2>
          <p>{data.hero.description}</p>
          <button type="button" onClick={() => navigate('/guide')}>View now</button>
        </article>
      </section>

      <section className="section">
        <h2>This Summer Recipes</h2>
        <p>We have all your Independence Day sweets covered.</p>
        <div className="recipe-grid four">
          {summerRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} compact />)}
        </div>
      </section>

      <section className="section">
        <h2>Recipes With Videos</h2>
        <p>Cooking Up Culinary Creations with Step-by-Step Videos</p>
        <div className="recipe-grid four">
          {videoRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} compact />)}
        </div>
      </section>

      <section className="section">
        <h2>Editor&apos;s pick</h2>
        <p>Curated Culinary Delights: Handpicked Favorites by Our Expert Editors!</p>
        <div className="editor-grid">
          {data.editorsPick.map((item) => (
            <article key={item.id} className="editor-card">
              <AppImage src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <small>{item.minutes} minutes</small>
                <p><strong>{item.chef}</strong></p>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CheffifyFooter />
    </div>
  )
}
