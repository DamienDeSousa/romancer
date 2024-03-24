'use client'

import { ProseManager } from '@/components/editor/prose-manager'
import { Landing } from '@/components/landing/landing'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    // TODO: ajouter une barre de menu avec les fonctions de formattage de texte
    return (
      <div className="h-full w-full flex flex-col items-center p-6 gap-6">
        <div>
          <p>Signed in as {session?.user?.email}</p>
          <Button onClick={() => signOut()}>signout</Button>
        </div>
        {/* TODO: créer une nouvelle feuille lorsque le texte dépasse la feuille actuelle */}
        <ProseManager />
      </div>
    )
  }

  return (
    <main className="flex items-center justify-center h-full">
      <Landing />
    </main>
  )
}
