import { PrismaClient } from '@/lib/generated/prisma'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Creating admin user...')
  
  const email = 'admin@pinkdog.com'
  const password = 'pinkdog-admin-2025' // You should change this!
  
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email }
  })
  
  if (existingAdmin) {
    console.log('✅ Admin user already exists')
    return
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)
  
  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email,
      name: 'PinkDog Admin',
      password: hashedPassword,
      role: 'admin',
      emailVerified: new Date()
    }
  })
  
  console.log('✅ Admin user created:')
  console.log(`   Email: ${admin.email}`)
  console.log(`   Password: ${password}`)
  console.log('   ⚠️  Please change the password after first login!')
}

main()
  .catch((e) => {
    console.error('❌ Error creating admin:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })