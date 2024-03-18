'use client'

import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { Button } from '../ui/button'

export const Login = () => {
  const { status } = useSession()

  if (status === 'authenticated') {
    return null
  }

  return (
    <div>
      <Button
        size={'lg'}
        className="flex gap-2"
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        <Image
          src={'/logos/google.svg.png'}
          alt="google logo"
          width={25}
          height={25}
        />
        <p>Signin with Google</p>
      </Button>
    </div>
  )
}
