import { PrismaClient } from '@/lib/generated/prisma'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Creating admin users...')
  
  // Get password from environment variable or generate a random one
  const password = process.env.ADMIN_SEED_PASSWORD || 
    Math.random().toString(36).slice(-8) + 
    Math.random().toString(36).slice(-8).toUpperCase() + 
    '!@#'
  const hashedPassword = await bcrypt.hash(password, 10)
  
  // Admin users to create
  const adminUsers = [
    {
      email: 'pinkdogpetresort@gmail.com',
      name: 'PinkDog Admin'
    },
    {
      email: 'hello@flowquantic.ai',
      name: 'FlowQuantic Admin'
    }
  ]
  
  for (const userData of adminUsers) {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: userData.email }
    })
    
    if (existingAdmin) {
      console.log(`✅ Admin user ${userData.email} already exists`)
      continue
    }
    
    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: hashedPassword,
        role: 'admin',
        emailVerified: new Date()
      }
    })
    
    console.log(`✅ Admin user created:`)
    console.log(`   Email: ${admin.email}`)
    console.log(`   Name: ${admin.name}`)
    console.log(`   Password: ${password}`)
  }
  
  console.log('\n⚠️  Please change the passwords after first login!')
}

main()
  .catch((e) => {
    console.error('❌ Error creating admin:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })