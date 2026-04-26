import { useState } from 'react'
import { useRecoilState } from 'recoil'
import CheffifyBreadcrumb from '../../components/cheffify/CheffifyBreadcrumb'
import CheffifyFooter from '../../components/cheffify/CheffifyFooter'
import CheffifyHeader from '../../components/cheffify/CheffifyHeader'
import AppImage from '../../components/common/AppImage'
import data from '../../data/cheffify.json'
import { searchQueryAtom, selectedPlanAtom } from '../../state/uiState'

export default function SubscribePage() {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryAtom)
  const [selectedPlan, setSelectedPlan] = useRecoilState(selectedPlanAtom)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const subscribe = async (plan) => {
    setSubmitting(true)
    setMessage('')
    setSelectedPlan(plan)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setSubmitting(false)
    setMessage(`Subscription activated: ${plan}`)
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
          { label: 'Subscribe' },
        ]}
      />

      <main className="section subscribe-page">
        <section className="subscribe-hero">
          <div>
            <h3>This recipe is exclusively available to subscribers</h3>
            <h1>Join now to access effortless, hassle-free recipes</h1>
            <ul>
              {data.subscriptionBenefits.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <h2>0.25USD / Week</h2>
            <p>Billed as $1 every 4 weeks for the first year</p>
            <button type="button" onClick={() => subscribe('weekly')} disabled={submitting}>
              {submitting ? 'Processing...' : 'Subscribe Now'}
            </button>
            <small>Cancel or Pause anytime</small>
          </div>
          <AppImage
            src={data.subscriptionHeroImage}
            alt="subscription"
          />
        </section>

        <section className="section center-block">
          <h2>An All Access subscription includes</h2>
          <div className="benefit-grid">
            <article><h4>Cooking</h4><p>Enjoy recipes, advice and inspiration for any occasion.</p></article>
            <article><h4>Wirecutter</h4><p>Explore independent reviews for thousands of products.</p></article>
            <article><h4>Games</h4><p>Unwind with Spelling Bee, Wordle and crossword.</p></article>
            <article><h4>The Athletic</h4><p>Discover in-depth personalized sports journalism.</p></article>
          </div>
        </section>

        <section className="center-block plan-box">
          <h2>Subscribe to Cheffy Cooking only</h2>
          <p>Enjoy thousands of delicious recipes for every taste.</p>
          <label>
            <input
              type="radio"
              checked={selectedPlan === 'monthly'}
              onChange={() => setSelectedPlan('monthly')}
            />
            $2/month (Billed every 4 weeks)
          </label>
          <label>
            <input
              type="radio"
              checked={selectedPlan === 'yearly'}
              onChange={() => setSelectedPlan('yearly')}
            />
            $20/year (Billed one annually)
          </label>
          <button type="button" onClick={() => subscribe(selectedPlan)} disabled={submitting}>
            {submitting ? 'Processing...' : 'Subscribe Now'}
          </button>
          <small>Cancel or Pause anytime</small>
          {message ? <p className="tiny-note">{message}</p> : null}
        </section>
      </main>

      <CheffifyFooter />
    </div>
  )
}
