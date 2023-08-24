import { ReactNode } from 'react'

export const parseError = <T>(error: T | null) => {
  if (error !== null && typeof error === 'object' && 'shortMessage' in error) {
    return error.shortMessage as ReactNode
  }
}
