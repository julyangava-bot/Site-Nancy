import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { AdminContent } from './admin-content'
import './admin.css'

export default async function AdminPage() {
  const session = await auth()
  
  // Double check session
  if (!session || !session.user) {
    console.log('No session found in admin page, redirecting to login')
    redirect('/admin/login')
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    }>
      <AdminContent userEmail={session.user?.email || 'Admin'} />
    </Suspense>
  )
}