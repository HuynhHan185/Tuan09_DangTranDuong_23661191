import { atom, selector } from 'recoil'
import cheffifyData from '../data/cheffify.json'

export const searchQueryAtom = atom({
  key: 'searchQueryAtom',
  default: 'Salad',
})

export const selectedTypesAtom = atom({
  key: 'selectedTypesAtom',
  default: ['Grilled', 'Roasted'],
})

export const selectedRatingsAtom = atom({
  key: 'selectedRatingsAtom',
  default: [3, 2, 1],
})

export const cookingTimeAtom = atom({
  key: 'cookingTimeAtom',
  default: [30, 50],
})

export const favoriteIdsAtom = atom({
  key: 'favoriteIdsAtom',
  default: cheffifyData.initialFavorites,
})

export const selectedPlanAtom = atom({
  key: 'selectedPlanAtom',
  default: 'monthly',
})

export const onboardingIndexAtom = atom({
  key: 'onboardingIndexAtom',
  default: 0,
})

export const visibleRecipesSelector = selector({
  key: 'visibleRecipesSelector',
  get: ({ get }) => {
    const query = get(searchQueryAtom).trim().toLowerCase()
    const selectedTypes = get(selectedTypesAtom)
    const selectedRatings = get(selectedRatingsAtom)
    const [minTime, maxTime] = get(cookingTimeAtom)

    return cheffifyData.catalog.filter((item) => {
      const matchQuery = !query || item.name.toLowerCase().includes(query)
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(item.type)
      const matchTime = item.minutes >= minTime && item.minutes <= maxTime
      const matchRating = selectedRatings.length === 0 || selectedRatings.includes(item.rating)

      return matchQuery && matchType && matchTime && matchRating
    })
  },
})
