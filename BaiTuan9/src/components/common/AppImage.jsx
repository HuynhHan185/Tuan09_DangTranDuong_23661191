import { useEffect, useState } from 'react'

const DEFAULT_FALLBACK = '/images/placeholder-recipe.svg'

export default function AppImage({ src, alt, fallbackSrc = DEFAULT_FALLBACK, ...props }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setHasError(false)
  }, [src])

  return (
    <img
      {...props}
      src={hasError || !src ? fallbackSrc : src}
      alt={alt}
      onError={() => setHasError(true)}
    />
  )
}
