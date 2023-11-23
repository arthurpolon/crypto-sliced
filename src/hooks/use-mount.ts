import { EffectCallback, useEffect } from 'react'

const useMount = (effectCallback: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effectCallback, [])
}

export default useMount
