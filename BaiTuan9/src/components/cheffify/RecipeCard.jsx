import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import AppImage from '../common/AppImage'
import { favoriteIdsAtom } from '../../state/uiState'

export default function RecipeCard({ recipe, compact = false }) {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useRecoilState(favoriteIdsAtom)
  const isFavorite = favorites.includes(recipe.id)

  const toggleFavorite = () => {
    setFavorites((prev) =>
      prev.includes(recipe.id)
        ? prev.filter((id) => id !== recipe.id)
        : [...prev, recipe.id],
    )
  }

  return (
    <article className={compact ? 'recipe-card compact' : 'recipe-card'}>
      <AppImage src={recipe.image} alt={recipe.name} />
      <div className="recipe-content">
        <h3>{recipe.name}</h3>
        <div className="recipe-meta">
          <span>{recipe.minutes} minutes</span>
          <div className="recipe-meta-actions">
            <button type="button" className="recipe-open" onClick={() => navigate('/guide')}>View</button>
            <button type="button" onClick={toggleFavorite} aria-label="toggle favorite">
              {isFavorite ? '♥' : '♡'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
