import { PrismaClient } from '@/lib/generated/prisma'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const prisma = new PrismaClient()

async function main() {
  console.log('🔑 Resetting admin passwords...')
  
  const newPassword = 'admin123!' // New temporary password
  const hashedPassword = await bcrypt.hash(newPassword, 10)
  
  // Reset password for both admin users
  const emails = ['pinkdogpetresort@gmail.com', 'hello@flowquantic.ai']
  
  for (const email of emails) {
    try {
      const user = await prisma.user.update({
        where: { email },
        data: { password: hashedPassword }
      })
      
      console.log(`✅ Password reset for: ${user.email}`)
    } catch (error) {
      console.log(`❌ User not found: ${email}`)
    }
  }
  
  console.log('\n📝 New password for all admin users: admin123!')
  console.log('⚠️  Please change this password after login!')
}

main()
  .catch((e) => {
    console.error('❌ Error resetting passwords:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })