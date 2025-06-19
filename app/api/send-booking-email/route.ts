import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      ownerName,
      email,
      clientEmail,
      phone,
      petType,
      breeds,
      numberOfPets,
      checkInDate,
      checkInTime,
      checkOutDate,
      checkOutTime,
      specialNotes,
      serviceType, // New field to distinguish between services
    } = body;

    // Use clientEmail if available, fallback to email for backward compatibility
    const userEmail = clientEmail || email;
    
    // Validate required fields
    if (!ownerName || !userEmail || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Map petType to petSize (approximation since we don't have size info)
    const mapPetTypeToSize = (type: string): 'pequeno' | 'medio' | 'grande' => {
      if (type === 'cat') return 'pequeno';
      if (type === 'dog') return 'medio'; // Default for dogs
      return 'medio'; // Default for both
    };

    // Prepare data for n8n webhook based on service type
    let webhookData;
    
    if (serviceType === 'daycare') {
      // For daycare requests
      webhookData = {
        clientName: ownerName,
        clientEmail: userEmail,
        clientPhone: phone,
        petName: specialNotes.split('\n')[0].replace('Dog Name: ', ''), // Extract dog name from special notes
        petBreed: breeds, // This contains breed and age for daycare
        petSize: 'medio', // Default for dogs in daycare
        petAge: breeds.includes('years') || breeds.includes('months') ? breeds.split(',')[1]?.trim() || 'Not specified' : 'Not specified',
        checkIn: `${checkInDate} ${checkInTime || '09:00'}`,
        checkOut: `${checkOutDate} ${checkOutTime || '17:00'}`,
        services: ['Daycare'], // Specify daycare service
        observations: `${specialNotes || ''}\nDrop-off: ${checkInTime || 'Not specified'}\nPick-up: ${checkOutTime || 'Not specified'}`,
      };
    } else if (serviceType === 'van') {
      // For van service requests
      const petNameMatch = specialNotes.match(/Pet Name\(s\): ([^\n]+)/);
      const serviceNeededMatch = specialNotes.match(/Service Needed: ([^\n]+)/);
      const addressMatch = specialNotes.match(/Address: ([^\n]+)/);
      const requestedServiceMatch = specialNotes.match(/Requested Service: ([^\n]+)/);
      
      webhookData = {
        clientName: ownerName,
        clientEmail: userEmail,
        clientPhone: phone,
        petName: petNameMatch ? petNameMatch[1] : numberOfPets,
        petBreed: breeds.split(',')[0]?.trim() || breeds,
        petSize: breeds.split(',')[1]?.trim() || 'Not specified',
        petAge: 'Not specified',
        checkIn: `${checkInDate} ${checkInTime || '09:00'}`,
        checkOut: `${checkOutDate} ${checkOutTime || '17:00'}`,
        services: ['PinkVan'],
        serviceType: requestedServiceMatch ? requestedServiceMatch[1] : 'Not specified',
        serviceNeeded: serviceNeededMatch ? serviceNeededMatch[1] : 'Not specified',
        address: addressMatch ? addressMatch[1] : 'Not specified',
        observations: specialNotes || '',
      };
    } else {
      // For pet hotel requests
      webhookData = {
        clientName: ownerName,
        clientEmail: userEmail,
        clientPhone: phone,
        petName: `${numberOfPets} ${petType === 'both' ? 'pets' : petType}(s)`,
        petBreed: breeds,
        petSize: mapPetTypeToSize(petType),
        petAge: 'Not specified', // Default value since we don't collect age
        checkIn: `${checkInDate} ${checkInTime || '09:00'}`,
        checkOut: `${checkOutDate} ${checkOutTime || '17:00'}`,
        services: ['Pet Hotel'], // Default service
        observations: `${specialNotes || ''}\nCheck-in: ${checkInTime || 'Not specified'}\nCheck-out: ${checkOutTime || 'Not specified'}`,
      };
    }

    // Get n8n webhook URL from environment variable
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error('N8N_WEBHOOK_URL environment variable is not configured');
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
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
      console.error('n8n webhook error:', response.status, errorText);
      throw new Error(`Webhook request failed: ${response.status}`);
    }

    return NextResponse.json(
      { message: 'Booking request sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending booking request to n8n:', error);
    return NextResponse.json(
      { error: 'Failed to send booking request' },
      { status: 500 }
    );
  }
} 