// ScrollToHash.jsx
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""))
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
  }, [pathname, hash])

  return null
}
