import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { MenuIcon } from 'lucide-react'

interface MenuItem {
  id: string
  title: string
  content: string
}

interface MenuProps {
  menuItems: MenuItem[]
  onItemClick: (id: string) => void
}

export function Menu({ menuItems, onItemClick }: MenuProps) {
  const [isMenuVisible, setIsMenuVisible] = useState(true)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative">
      {!isMenuVisible && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 left-0 text-white"
          onClick={() => setIsMenuVisible(true)}
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      )}
      {isMenuVisible && (
        <div ref={menuRef} className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="secondary"
              className="w-48 text-left justify-start bg-gray-300 hover:bg-gray-400 text-black"
              onClick={() => onItemClick(item.id)}
            >
              {item.title}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

