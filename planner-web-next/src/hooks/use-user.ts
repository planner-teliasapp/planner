import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useEffect, useState } from "react"

export const useUser = () => {
  const { user } = useKindeBrowserClient()
  const [isGuestUser, setIsGuestUser] = useState<boolean>(user?.id === process.env.NEXT_PUBLIC_KINDE_GUEST_USER_ID)

  useEffect(() => {
    setIsGuestUser(user?.id === process.env.NEXT_PUBLIC_KINDE_GUEST_USER_ID)
  }, [user])

  return {
    isGuestUser
  }
}