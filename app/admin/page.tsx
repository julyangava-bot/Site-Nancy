import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { AdminContent } from './admin-content'
import './admin.css'

export default async function AdminPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/admin/login')
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AdminContent userEmail={session.user?.email || 'Admin'} />
    </Suspense>
  )
}