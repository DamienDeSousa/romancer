'use client'

import { Landing } from '@/components/landing/landing'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return (
      <div>
        <p>Signed in as {session?.user?.email}</p>
        <Button onClick={() => signOut()}>signout</Button>
      </div>
    )
  }

  return (
    <main className="flex items-center justify-center h-full">
      <Landing />
    </main>
  )
}
