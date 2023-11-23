import { useState } from 'react'
import useMount from './use-mount'

const PWAModes = ['fullscreen', 'standalone', 'minimal-ui']

export function useIsPWA() {
  const [isPWA, setIsPWA] = useState(true)

  useMount(() => {
    setIsPWA(
      PWAModes.some((displayMode) => {
        const query = `(display-mode: ${displayMode})`

        return window.matchMedia(query).matches
      })
    )
  })

  return isPWA
}
