'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MenuItem {
  id: string
  title: string
  content: string
}

export default function AdminPanel() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 'what-is', title: 'What is SolPlayGround', content: 'SolPlayGround is...' },
    { id: 'how-to', title: 'How to Play?', content: 'To play SolPlayGround...' },
    { id: 'token', title: '$SPG', content: 'SPG is the native token...' },
    { id: 'faq', title: 'F.A.Q.', content: 'Frequently asked questions...' },
  ])

  const [newItem, setNewItem] = useState<MenuItem>({ id: '', title: '', content: '' })
  const router = useRouter()

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true'
    if (!isLoggedIn) {
      router.push('/admin/login')
    }
  }, [router])

  const handleUpdateItem = (updatedItem: MenuItem) => {
    setMenuItems(menuItems.map(item => item.id === updatedItem.id ? updatedItem : item))
  }

  const handleAddItem = () => {
    if (newItem.id && newItem.title) {
      setMenuItems([...menuItems, newItem])
      setNewItem({ id: '', title: '', content: '' })
    }
  }

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id))
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    router.push('/admin/login')
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <div className="space-y-4">
        {menuItems.map(item => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Input
                  value={item.title}
                  onChange={(e) => handleUpdateItem({ ...item, title: e.target.value })}
                  placeholder="Menu item title"
                />
                <Textarea
                  value={item.content}
                  onChange={(e) => handleUpdateItem({ ...item, content: e.target.value })}
                  placeholder="Menu item content"
                />
                <Button variant="destructive" onClick={() => handleDeleteItem(item.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Add New Menu Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Input
              value={newItem.id}
              onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
              placeholder="Menu item ID"
            />
            <Input
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              placeholder="Menu item title"
            />
            <Textarea
              value={newItem.content}
              onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
              placeholder="Menu item content"
            />
            <Button onClick={handleAddItem}>Add Item</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

