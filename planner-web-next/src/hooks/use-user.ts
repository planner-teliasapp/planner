import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useEffect, useState } from "react"

export const useUser = () => {
  const { user } = useKindeBrowserClient()
  const [isGuestUser, setIsGuestUser] = useState<boolean>(user?.id === process.env.NEXT_PUBLIC_KINDE_GUEST_USER_ID)
  const [isValidUser, setIsValidUser] = useState<boolean>(
    (user?.id !== process.env.NEXT_PUBLIC_KINDE_GUEST_USER_ID)
    && (user !== null)
  )

  useEffect(() => {
    setIsGuestUser(user?.id === process.env.NEXT_PUBLIC_KINDE_GUEST_USER_ID)
    setIsValidUser(
      (user?.id !== process.env.NEXT_PUBLIC_KINDE_GUEST_USER_ID)
      && (user !== null)
    )
  }, [user])

  return {
    isGuestUser,
    isValidUser
  }
}