import { NextRequest, NextResponse } from 'next/server'

// Types
interface PerformanceDataPayload {
  type: string;
  name?: string;
  value?: number;
  timestamp: number;
  url?: string;
  userAgent?: string;
  rating?: string;
  connection?: string;
  deviceMemory?: number;
}

// Constants
const MOCK_METRICS_COUNT = 147;
const MOCK_LCP_VALUE = 2150;
const MOCK_FID_VALUE = 45;
const MOCK_CLS_VALUE = 0.08;
const MOCK_GOOD_RATING = 0.85;
const HOUR_IN_MILLISECONDS = 3600000;

// Performance monitoring API endpoint
export async function POST(request: NextRequest) {
  try {
    const body: PerformanceDataPayload = await request.json()
    
    // Validate the incoming data
    if (!body.type || !body.timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // In development, just log the data
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Data:', {
        type: body.type,
        name: body.name,
        value: body.value,
        timestamp: new Date(body.timestamp).toISOString(),
        url: body.url
      })
      
      return NextResponse.json({ success: true })
    }

    // In production, you would send this data to your monitoring service
    // Examples: DataDog, New Relic, LogRocket, etc.
    
    // Example DataDog integration:
    // await fetch('https://http-intake.logs.datadoghq.com/v1/input/YOUR_API_KEY', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     ddsource: 'browser',
    //     ddtags: `env:${process.env.NODE_ENV},service:wrenchit-website`,
    //     timestamp: body.timestamp,
    //     level: 'info',
    //     message: 'Performance metric',
    //     ...body
    //   })
    // })

    // Example custom analytics storage
    await storePerformanceData(body)

    return NextResponse.json({ success: true })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing performance data:', errorMessage);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}

// Store performance data (implement based on your storage solution)
async function storePerformanceData(data: PerformanceDataPayload): Promise<void> {
  // Example implementations:
  
  // 1. Database storage (PostgreSQL, MongoDB, etc.)
  // await db.collection('performance_metrics').insertOne({
  //   ...data,
  //   createdAt: new Date()
  // })
  
  // 2. Time-series database (InfluxDB, TimescaleDB)
  // await influxDB.writePoint(
  //   new Point('performance_metric')
  //     .tag('type', data.type)
  //     .tag('page', data.url)
  //     .floatField('value', data.value)
  //     .timestamp(new Date(data.timestamp))
  // )
  
  // 3. Cloud storage (AWS CloudWatch, Google Cloud Logging)
  // await cloudWatch.putMetricData({
  //   Namespace: 'WrenchIt/Performance',
  //   MetricData: [{
  //     MetricName: data.name || data.type,
  //     Value: data.value,
  //     Unit: 'Milliseconds',
  //     Timestamp: new Date(data.timestamp),
  //     Dimensions: [
  //       { Name: 'Page', Value: data.url },
  //       { Name: 'Type', Value: data.type }
  //     ]
  //   }]
  // })

  // For demo purposes, just log structured data
  console.log('Storing performance data:', {
    type: data.type,
    metric: data.name,
    value: data.value,
    page: data.url,
    timestamp: new Date(data.timestamp).toISOString(),
    userAgent: data.userAgent,
    ...(data.rating && { rating: data.rating }),
    ...(data.connection && { connection: data.connection }),
    ...(data.deviceMemory && { deviceMemory: data.deviceMemory })
  })
}

// Optional: GET endpoint for retrieving performance metrics
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const page = searchParams.get('page')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  // This would typically query your database
  // const metrics = await getPerformanceMetrics({ type, page, startDate, endDate })

  // For demo purposes, return mock data
  const mockData = {
    metrics: [
      {
        type: 'web_vital',
        name: 'LCP',
        value: 2100,
        rating: 'good',
        timestamp: Date.now() - HOUR_IN_MILLISECONDS,
        page: 'https://wrenchit.io'
      },
      {
        type: 'web_vital', 
        name: 'FID',
        value: 50,
        rating: 'good',
        timestamp: Date.now() - HOUR_IN_MILLISECONDS,
        page: 'https://wrenchit.io'
      }
    ],
    summary: {
      totalMetrics: MOCK_METRICS_COUNT,
      avgLCP: MOCK_LCP_VALUE,
      avgFID: MOCK_FID_VALUE,
      avgCLS: MOCK_CLS_VALUE,
      goodRating: MOCK_GOOD_RATING
    }
  }

  return NextResponse.json(mockData)
}