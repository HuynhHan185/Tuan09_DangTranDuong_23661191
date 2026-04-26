import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import AppImage from '../../components/common/AppImage'
import CheffifyBreadcrumb from '../../components/cheffify/CheffifyBreadcrumb'
import CheffifyHeader from '../../components/cheffify/CheffifyHeader'
import data from '../../data/cheffify.json'
import { onboardingIndexAtom, searchQueryAtom } from '../../state/uiState'

export default function AuthPreviewPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryAtom)
  const [slideIndex, setSlideIndex] = useRecoilState(onboardingIndexAtom)
  const slide = data.onboardingSlides[slideIndex]

  const nextSlide = () => {
    if (slideIndex === data.onboardingSlides.length - 1) {
      navigate('/auth-login')
      return
    }

    setSlideIndex((prev) => prev + 1)
  }

  return (
    <div className="chef-page auth-preview-page">
      <CheffifyHeader
        searchValue={searchQuery}
        onSearchChange={(event) => setSearchQuery(event.target.value)}
      />

      <CheffifyBreadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Welcome' },
        ]}
      />

      <section className="auth-bg" style={{ backgroundImage: `url(${data.hero.backgroundImage})` }}>
        <article className="onboarding-modal">
          <button type="button" className="close-btn" onClick={() => navigate('/')}>✕</button>
          <h2>{slide.title}</h2>
          <p>{slide.description}</p>
          <AppImage src={slide.image} alt={slide.title} />
          <div className="dots">
            {data.onboardingSlides.map((item, index) => (
              <button
                type="button"
                key={item.title}
                className={slideIndex === index ? 'active' : ''}
                onClick={() => setSlideIndex(index)}
              >
                •
              </button>
            ))}
          </div>
          <button type="button" className="primary" onClick={nextSlide}>{slideIndex === data.onboardingSlides.length - 1 ? 'Get Started' : 'Next'}</button>
          <button type="button" className="link-btn" onClick={() => navigate('/auth-login')}>Skip</button>
        </article>
      </section>
    </div>
  )
}
