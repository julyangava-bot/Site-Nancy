import { NextRequest, NextResponse } from 'next/server';

interface WebhookData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  petName: string;
  numberOfPets: string;
  petType: string;
  petBreed: string;
  petSize: string;
  petAge: string;
  checkIn: string;
  checkOut: string;
  services: string[];
  observations: string;
  // Optional fields for different services
  previousDaycare?: string;
  socialBehavior?: string;
  serviceType?: string;
  serviceNeeded?: string;
  address?: string;
  // Test mode fields
  _originalEmail?: string;
  _testMode?: boolean;
  _environment?: string;
  _timestamp?: string;
}

/**
 * API Route for handling booking email requests
 * Supports: Pet Hotel, Daycare, and Van services
 * 
 * Features:
 * - Automatic environment detection (dev/prod)
 * - Test mode with separate webhook and email redirection
 * - Comprehensive logging for debugging
 * - Backwards compatibility for old data formats
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      ownerName,
      email,
      clientEmail,
      phone,
      petType,
      petName,
      petAge,
      breeds,
      numberOfPets,
      checkInDate,
      checkInTime,
      checkOutDate,
      checkOutTime,
      specialNotes,
      serviceType, // New field to distinguish between services
      // Van specific fields
      petSize,
      serviceNeeded,
      address,
      requestedService,
      // Daycare specific fields
      previousDaycare,
      socialBehavior,
    } = body;


    // Check if request is coming from test page
    const referer = request.headers.get('referer') || '';
    const isFromTestPage = referer.includes('/test-forms');
    
    // Determine if we're in test mode
    const IS_TEST_MODE = process.env.NODE_ENV !== 'production' || isFromTestPage;
    const TEST_EMAIL = process.env.TEST_EMAIL;
    const PROD_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
    const TEST_WEBHOOK_URL = process.env.N8N_WEBHOOK_TEST_URL;

    // Log the current mode
    console.log('🔧 Mode:', IS_TEST_MODE ? 'TEST/DEVELOPMENT' : 'PRODUCTION');
    console.log('📍 Environment:', process.env.NODE_ENV);

    // Use clientEmail if available, fallback to email for backward compatibility
    const originalUserEmail = clientEmail || email;
    
    // Validate required fields
    if (!ownerName || !originalUserEmail || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In test mode, validate test email configuration
    if (IS_TEST_MODE && !TEST_EMAIL) {
      console.warn('⚠️ TEST_EMAIL not configured in .env.local');
      console.warn('⚠️ Using fallback test email: teste@exemplo.com');
    }

    // Map petType to petSize (approximation since we don't have size info)
    const mapPetTypeToSize = (type: string): 'pequeno' | 'medio' | 'grande' => {
      if (type === 'cat') return 'pequeno';
      if (type === 'dog') return 'medio'; // Default for dogs
      return 'medio'; // Default for both
    };

    // Prepare data for n8n webhook based on service type
    let webhookData: WebhookData;
    
    if (serviceType === 'daycare') {
      // For daycare requests
      webhookData = {
        clientName: ownerName,
        clientEmail: originalUserEmail,
        clientPhone: phone,
        petName: petName || 'Not specified',
        numberOfPets: numberOfPets || '1',
        petType: petType === 'dog' ? 'Dog' : petType === 'cat' ? 'Cat' : petType,
        petBreed: breeds || 'Not specified',
        petSize: mapPetTypeToSize(petType),
        petAge: petAge || 'Not specified',
        checkIn: `${checkInDate} ${checkInTime || '09:00'}`,
        checkOut: `${checkOutDate} ${checkOutTime || '17:00'}`,
        services: ['Daycare'], // Specify daycare service
        previousDaycare: previousDaycare || 'Not specified',
        socialBehavior: socialBehavior || 'Not specified',
        observations: specialNotes || '', // Only the actual special notes from user
      };
    } else if (serviceType === 'van') {
      // For van service requests
      webhookData = {
        clientName: ownerName,
        clientEmail: originalUserEmail,
        clientPhone: phone,
        petName: petName || 'Not specified',
        numberOfPets: numberOfPets || '1',
        petType: petType === 'dog' ? 'Dog' : petType === 'cat' ? 'Cat' : petType,
        petBreed: breeds,
        petSize: petSize || 'Not specified',
        petAge: petAge || 'Not specified',
        checkIn: `${checkInDate} ${checkInTime || '09:00'}`,
        checkOut: `${checkOutDate} ${checkOutTime || '17:00'}`,
        services: ['PinkVan'],
        serviceType: requestedService || 'Not specified',
        serviceNeeded: serviceNeeded || 'Not specified',
        address: address || 'Not specified',
        observations: specialNotes || '', // Only the actual special notes from user
      };
    } else {
      // For pet hotel requests
      webhookData = {
        clientName: ownerName,
        clientEmail: originalUserEmail,
        clientPhone: phone,
        petName: petName || 'Not specified',
        numberOfPets: numberOfPets,
        petType: petType,
        petBreed: breeds,
        petSize: mapPetTypeToSize(petType),
        petAge: petAge || 'Not specified',
        checkIn: `${checkInDate} ${checkInTime || '09:00'}`,
        checkOut: `${checkOutDate} ${checkOutTime || '17:00'}`,
        services: ['Pet Hotel'], // Default service
        observations: specialNotes || '', // Only the actual special notes from user
      };
    }

    // Apply test mode modifications
    if (IS_TEST_MODE) {
      // Add test prefix to client name
      webhookData.clientName = `[TESTE] ${webhookData.clientName}`;
      
      // Replace client email with test email
      webhookData.clientEmail = TEST_EMAIL || 'teste@exemplo.com';
      
      // Add test mode metadata
      webhookData._originalEmail = originalUserEmail;
      webhookData._testMode = true;
      webhookData._environment = process.env.NODE_ENV;
      webhookData._timestamp = new Date().toISOString();
      
      console.log('🧪 Test mode active - Email redirected');
      console.log('📧 Original email:', originalUserEmail);
      console.log('✉️ Test email:', webhookData.clientEmail);
    }

    // Select appropriate webhook URL
    let webhookUrl = PROD_WEBHOOK_URL;
    
    if (IS_TEST_MODE) {
      if (TEST_WEBHOOK_URL) {
        webhookUrl = TEST_WEBHOOK_URL;
        console.log('🔗 Using test webhook URL');
      } else {
        console.warn('⚠️ TEST webhook URL not configured, falling back to production webhook');
        console.warn('⚠️ Configure N8N_WEBHOOK_TEST_URL in .env.local for proper test isolation');
      }
    }

    console.log('📧 Webhook URL:', webhookUrl);
    console.log('✉️ Email destination:', IS_TEST_MODE ? 'TEST EMAIL' : 'CLIENT EMAIL');
    
    if (!webhookUrl) {
      console.error('❌ No webhook URL configured');
      console.error('❌ Please configure N8N_WEBHOOK_URL in environment variables');
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Log the data being sent (in test mode only)
    if (IS_TEST_MODE) {
      console.log('📤 Sending test data:', JSON.stringify(webhookData, null, 2));
    }

    // Send data to n8n webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ n8n webhook error:', response.status, errorText);
      throw new Error(`Webhook request failed: ${response.status}`);
    }

    // Return appropriate response based on mode
    if (IS_TEST_MODE) {
      console.log('✅ Test booking sent successfully');
      return NextResponse.json(
        { 
          message: 'Booking request sent successfully! (TEST MODE)',
          testMode: true,
          originalEmail: originalUserEmail,
          redirectedTo: webhookData.clientEmail,
          receivedData: {
            petName,
            petAge,
            numberOfPets,
            petType,
            breeds,
            serviceType: serviceType || 'pethotel'
          },
          sentToWebhook: {
            petName: webhookData.petName,
            petAge: webhookData.petAge,
            numberOfPets: webhookData.numberOfPets,
            petType: webhookData.petType,
            petBreed: webhookData.petBreed
          }
        },
        { status: 200 }
      );
    } else {
      console.log('✅ Production booking sent successfully');
      return NextResponse.json(
        { message: 'Booking request sent successfully!' },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('❌ Error sending booking request to n8n:', error);
    return NextResponse.json(
      { error: 'Failed to send booking request' },
      { status: 500 }
    );
  }
}