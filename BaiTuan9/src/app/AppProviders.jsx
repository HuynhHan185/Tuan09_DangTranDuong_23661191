import { RecoilRoot } from 'recoil'

export default function AppProviders({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>
}
