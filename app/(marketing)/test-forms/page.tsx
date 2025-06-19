"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Rocket, 
  Server, 
  Trash2,
  Heart,
  Car,
  Home
} from 'lucide-react';

// Test data types
interface TestData {
  ownerName: string;
  clientEmail?: string;
  email?: string;
  phone: string;
  petType: string;
  breeds: string;
  numberOfPets: string;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
  specialNotes: string;
  serviceType?: string;
}

interface TestCase {
  id: string;
  title: string;
  description: string;
  data: TestData;
}

interface TestResult {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  details?: string;
}

// Test data matching EXACT format sent by real forms
const testCases: TestCase[] = [
  {
    id: 'daycare-test',
    title: '🐶 Daycare Test',
    description: 'Golden Retriever with previous daycare experience',
    data: {
      // DAYCARE FORMAT: Maps form fields to API format
      ownerName: "Sarah Johnson",
      clientEmail: "thiagobardini85@gmail.com",
      phone: "(978) 555-0123",
      petType: "dog",
      breeds: "Golden Retriever, 3 years old",
      numberOfPets: "1",
      checkInDate: "2024-02-15",
      checkInTime: "08:30",
      checkOutDate: "2024-02-15",
      checkOutTime: "17:00",
      specialNotes: "Dog Name: Buddy\nPrevious Daycare Experience: Yes\nSocial Behavior: Friendly and playful with other dogs\nAdditional Notes: Loves treats and gets excited around new people.",
      serviceType: "daycare"
    }
  },
  {
    id: 'hotel-test',
    title: '🏨 Pet Hotel Test',
    description: 'Labrador Retriever, 4-day stay with medication needs',
    data: {
      // PET HOTEL FORMAT: Sends all form values + clientEmail
      ownerName: "Jennifer Williams",
      email: "thiagobardini85@gmail.com",
      phone: "(978) 555-0234",
      petType: "dog",
      breeds: "Labrador Retriever",
      numberOfPets: "1",
      checkInDate: "2024-03-01",
      checkInTime: "10:00",
      checkOutDate: "2024-03-05",
      checkOutTime: "16:00",
      specialNotes: "Rocky loves belly rubs and needs his medication twice daily. Very friendly with staff.",
      clientEmail: "thiagobardini85@gmail.com"
    }
  },
  {
    id: 'van-test',
    title: '🚐 Van Service Test',
    description: 'German Shepherd pickup for grooming with gate access',
    data: {
      // VAN FORMAT: Maps van fields to API format
      ownerName: "Robert Brown",
      clientEmail: "thiagobardini85@gmail.com",
      phone: "(978) 555-0345",
      petType: "van-service",
      breeds: "German Shepherd, Large",
      numberOfPets: "Bella",
      checkInDate: "2024-02-22",
      checkInTime: "8:00 AM",
      checkOutDate: "2024-02-22",
      checkOutTime: "10:00 AM",
      serviceType: "van",
      specialNotes: "Pet Name(s): Bella\nService Needed: pickup\nAddress: 123 Oak Street, Groton, MA 01450\nRequested Service: grooming\nSpecial Instructions: Please use the side gate. Gate code is 1234."
    }
  }
];

export default function TestFormsPage() {
  const [results, setResults] = useState<Record<string, TestResult>>({});
  const [serverStatus, setServerStatus] = useState<TestResult>({ status: 'idle' });
  const [isRunningAll, setIsRunningAll] = useState(false);

  // Check server status
  const checkServerStatus = async () => {
    setServerStatus({ status: 'loading' });
    
    try {
      const response = await fetch('/api/send-booking-email', {
        method: 'OPTIONS',
      });
      
      if (response.status === 405 || response.status === 200 || response.status === 204) {
        const statusMessages = {
          200: 'Server responding normally',
          204: 'Server running (No Content response)',  
          405: 'API endpoint exists (Method Not Allowed - expected for OPTIONS)'
        };
        
        setServerStatus({
          status: 'success',
          message: `✅ Server Status: OK - ${statusMessages[response.status as keyof typeof statusMessages] || 'API available'}`
        });
      } else {
        setServerStatus({
          status: 'error',
          message: `❌ Unexpected server response: ${response.status}`
        });
      }
    } catch (error) {
      setServerStatus({
        status: 'error',
        message: 'Server is not running or not accessible',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  // Send individual test
  const sendTest = async (testCase: TestCase) => {
    setResults(prev => ({
      ...prev,
      [testCase.id]: { status: 'loading' }
    }));

    try {
      const response = await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data),
      });

      const responseData = await response.json();

      if (response.ok) {
                  setResults(prev => ({
            ...prev,
            [testCase.id]: {
              status: 'success',
              message: 'Email sent successfully!',
              details: JSON.stringify(responseData, null, 2)
            }
          }));
      } else {
                  setResults(prev => ({
            ...prev,
            [testCase.id]: {
              status: 'error',
              message: `Failed: ${response.status}`,
              details: JSON.stringify(responseData, null, 2)
            }
          }));
      }
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [testCase.id]: {
          status: 'error',
          message: 'Network error',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      }));
    }
  };

  // Run all tests
  const runAllTests = async () => {
    setIsRunningAll(true);
    
    for (const testCase of testCases) {
      await sendTest(testCase);
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay between tests
    }
    
    setIsRunningAll(false);
  };

  // Clear all results
  const clearAllResults = () => {
    setResults({});
    setServerStatus({ status: 'idle' });
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'loading': return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />;
      default: return <div className="w-4 h-4 rounded-full bg-gray-300" />;
    }
  };

  // Get result alert variant
  const getAlertVariant = (status: string): "default" | "destructive" => {
    return status === 'error' ? 'destructive' : 'default';
  };

  const successCount = Object.values(results).filter(r => r.status === 'success').length;
  const errorCount = Object.values(results).filter(r => r.status === 'error').length;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#E73992] mb-2">
          🐕 PinkDog Forms - Test Interface
        </h1>
        <p className="text-gray-600">
          Simple testing interface for PinkDog booking forms. Send one test email for each form type.
        </p>
      </div>

      {/* Server Status & Quick Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            Server Status & Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-4">
            <Button onClick={checkServerStatus} variant="outline">
              <Server className="w-4 h-4 mr-2" />
              Check Server
            </Button>
            
            <Button 
              onClick={runAllTests}
              disabled={isRunningAll}
              className="bg-[#E73992] hover:bg-[#d3337f]"
            >
              <Rocket className="w-4 h-4 mr-2" />
              {isRunningAll ? `Sending...` : `Send All 3 Tests`}
            </Button>
            
            <Button onClick={clearAllResults} variant="outline">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Results
            </Button>
          </div>

          {/* Server Status Display */}
          {serverStatus.status !== 'idle' && (
            <Alert variant={getAlertVariant(serverStatus.status)} className="mb-4">
              <AlertDescription>
                <div className="flex items-center gap-2">
                  {getStatusIcon(serverStatus.status)}
                  <div>
                    <div className="font-medium">{serverStatus.message}</div>
                    {serverStatus.details && (
                      <div className="text-xs mt-1 opacity-75">
                        {serverStatus.details}
                      </div>
                    )}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Test Results Summary */}
          {(successCount > 0 || errorCount > 0) && (
            <div className="flex gap-4 text-sm">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                ✅ Success: {successCount}
              </Badge>
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                ❌ Failed: {errorCount}
              </Badge>
              <Badge variant="secondary">
                📊 Total: {successCount + errorCount}/3
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {/* Test Cards */}
      <div className="grid gap-6">
        {testCases.map((testCase) => {
          const result = results[testCase.id];
          const icon = testCase.id === 'daycare-test' ? <Heart className="w-5 h-5" /> :
                      testCase.id === 'hotel-test' ? <Home className="w-5 h-5" /> :
                      <Car className="w-5 h-5" />;
          
          return (
            <Card key={testCase.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {icon}
                  {testCase.title}
                </CardTitle>
                <CardDescription>{testCase.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                  <div><strong>Owner:</strong> {testCase.data.ownerName}</div>
                  <div><strong>Email:</strong> {testCase.data.clientEmail}</div>
                  <div><strong>Pet:</strong> {testCase.data.breeds}</div>
                  <div><strong>Date:</strong> {testCase.data.checkInDate}</div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusIcon(result?.status || 'idle')}
                  <Button
                    size="sm"
                    onClick={() => sendTest(testCase)}
                    disabled={result?.status === 'loading' || isRunningAll}
                    className="bg-[#E73992] hover:bg-[#d3337f]"
                  >
                    <Rocket className="w-4 h-4 mr-1" />
                    {result?.status === 'loading' ? 'Sending...' : 'Send Test Email'}
                  </Button>
                </div>

                {result && result.status !== 'idle' && (
                  <Alert variant={getAlertVariant(result.status)}>
                    <AlertDescription>
                      <div className="space-y-1">
                        <div className="font-medium">{result.message}</div>
                                                                          {result.details && (
                           <div className="text-xs opacity-75">
                             <pre className="mt-1 overflow-x-auto text-wrap">
                               {result.details}
                             </pre>
                           </div>
                         )}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* API Information */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>🔧 API Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div><strong>Endpoint:</strong> <code className="bg-gray-100 px-2 py-1 rounded">/api/send-booking-email</code></div>
            <div><strong>Method:</strong> POST</div>
            <div><strong>Content-Type:</strong> application/json</div>
            <div><strong>Forms:</strong> Daycare, Pet Hotel, Van Service</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 