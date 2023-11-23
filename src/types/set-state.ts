import { Dispatch, SetStateAction } from 'react'

export type setState<T = unknown> = Dispatch<SetStateAction<T>>
