'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

export const Landing = () => {
  const router = useRouter()

  return (
    <>
      <Button onClick={() => router.push('/login')}>Login</Button>
      Landing PAGE
    </>
  )
}
