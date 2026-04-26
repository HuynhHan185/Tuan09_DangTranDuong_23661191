import { useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import CheffifyFooter from '../../components/cheffify/CheffifyFooter'
import CheffifyBreadcrumb from '../../components/cheffify/CheffifyBreadcrumb'
import CheffifyHeader from '../../components/cheffify/CheffifyHeader'
import RecipeCard from '../../components/cheffify/RecipeCard'
import AppImage from '../../components/common/AppImage'
import data from '../../data/cheffify.json'
import { searchQueryAtom } from '../../state/uiState'

function pick(ids) {
  return ids.map((id) => data.catalog.find((item) => item.id === id)).filter(Boolean)
}

export default function GuidePage() {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryAtom)
  const [note, setNote] = useState('')
  const [comments, setComments] = useState(data.comments)
  const [savedIngredients, setSavedIngredients] = useState(0)
  const recentRecipes = useMemo(() => pick(data.recentlyViewedIds), [])
  const addToGrocery = () => {
    setSavedIngredients(data.ingredients.length)
  }


  const addNote = (event) => {
    event.preventDefault()
    if (!note.trim()) {
      return
    }

    setComments((prev) => [
      {
        id: Date.now().toString(),
        name: 'You',
        time: 'Now',
        text: note.trim(),
        avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=80&auto=format&fit=crop',
      },
      ...prev,
    ])
    setNote('')
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
          { label: 'Cooking Guide' },
        ]}
      />

      <main className="section guide-page">
        <div className="guide-grid">
          <aside>
            <h1>How to make a Strawberry Shortcake</h1>
            <p>Learn all about this delightful dessert from prep to serving.</p>

            <article className="author-card">
              <AppImage src={data.recipeBoxOwner.avatar} alt={data.recipeBoxOwner.name} />
              <div>
                <strong>{data.recipeBoxOwner.name}</strong>
                <div className="author-meta">
                  <span>45 minutes</span>
                  <span>552 community notes</span>
                  <span>★★★★★</span>
                </div>
              </div>
            </article>

            <section className="ingredients-box">
              <ul>
                {data.ingredients.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <button type="button" onClick={addToGrocery}>+ Add to Your Grocery List</button>
              {savedIngredients > 0 ? <p className="tiny-note">Added {savedIngredients} items to grocery list.</p> : null}
            </section>
          </aside>

          <section>
            {data.steps.map((step) => (
              <article key={step.title} className="step-card">
                <AppImage src={step.image} alt={step.title} />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </section>
        </div>

        <section className="notes-box">
          <h3>Cooking note</h3>
          <form onSubmit={addNote}>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Write your opinion about this article"
            />
            <button type="submit">Send</button>
          </form>

          <div className="comment-list">
            {comments.map((comment) => (
              <article key={comment.id} className="comment-item">
                <AppImage src={comment.avatar} alt={comment.name} />
                <div>
                  <div className="comment-head">
                    <strong>{comment.name}</strong>
                    <span>{comment.time}</span>
                  </div>
                  <p>{comment.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Your Recently Viewed</h2>
          <div className="recipe-grid four">
            {recentRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} compact />)}
          </div>
        </section>
      </main>

      <CheffifyFooter />
    </div>
  )
}
