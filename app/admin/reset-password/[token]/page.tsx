import { ResetForm } from './reset-form'

export default async function SetNewPasswordPage({
  params
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF0F7] via-[#FFF9FC] to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <ResetForm token={token} />
    </div>
  )
}