#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function cleanBlockedDates() {
  console.log('🧹 Cleaning blocked dates...\n');

  try {
    // Get all blocked dates
    const blockedDates = await prisma.blockedDate.findMany();
    console.log(`Found ${blockedDates.length} blocked dates`);

    let cleaned = 0;
    let kept = 0;

    for (const blocked of blockedDates) {
      try {
        const date = new Date(blocked.date);
        if (isNaN(date.getTime())) {
          console.log(`❌ Removing invalid date: ${blocked.date} (ID: ${blocked.id})`);
          await prisma.blockedDate.delete({
            where: { id: blocked.id }
          });
          cleaned++;
        } else {
          console.log(`✅ Valid date: ${date.toISOString()} - ${blocked.reason || 'No reason'}`);
          kept++;
        }
      } catch (error) {
        console.error(`Error processing blocked date ${blocked.id}:`, error.message);
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`- Kept: ${kept} valid dates`);
    console.log(`- Removed: ${cleaned} invalid dates`);

  } catch (error) {
    console.error('Error cleaning blocked dates:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanBlockedDates();