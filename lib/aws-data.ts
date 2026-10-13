import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import type { PutCommandInput, UpdateCommandInput } from '@aws-sdk/lib-dynamodb'

type BookingRecord = {
  bookingId: string
  name: string
  email: string
  phone: string
  organisation: string
  interest: string
  language: string
  notes: string
  attendees: string[]
  timezone: string
  startsAt: string
  endsAt: string
}

const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'me-central-1'
const baseClient = new DynamoDBClient({ region, maxAttempts: 3 })
const documentClient = DynamoDBDocumentClient.from(baseClient, {
  marshallOptions: { removeUndefinedValues: true, convertEmptyValues: false },
})

function requiredTable(variable: 'AWS_DYNAMODB_BOOKINGS_TABLE' | 'AWS_DYNAMODB_SUBSCRIBERS_TABLE') {
  const value = process.env[variable]
  if (!value) throw new Error(`${variable} is not configured.`)
  return value
}

export async function createBookingRecord(record: BookingRecord) {
  await documentClient.send(new PutCommand(buildBookingPut(requiredTable('AWS_DYNAMODB_BOOKINGS_TABLE'), record)))
}

export function buildBookingPut(tableName: string, record: BookingRecord, now = new Date()): PutCommandInput {
  const timestamp = now.toISOString()
  const expiresAt = Math.floor((new Date(record.startsAt).getTime() + 730 * 86400000) / 1000)
  return {
    TableName: tableName,
    Item: { ...record, recordType: 'SCHEDULED_CALL', status: 'PENDING_EMAIL', createdAt: timestamp, updatedAt: timestamp, expiresAt },
    ConditionExpression: 'attribute_not_exists(bookingId)',
  }
}

export async function updateBookingDelivery(bookingId: string, status: 'CONFIRMED' | 'EMAIL_FAILED', deliveryIds: string[] = []) {
  await documentClient.send(new UpdateCommand({
    TableName: requiredTable('AWS_DYNAMODB_BOOKINGS_TABLE'),
    Key: { bookingId },
    UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt, deliveryIds = :deliveryIds',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: { ':status': status, ':updatedAt': new Date().toISOString(), ':deliveryIds': deliveryIds },
    ConditionExpression: 'attribute_exists(bookingId)',
  }))
}

export async function upsertSubscriber(email: string, topics: string[], source = 'website-newsletter') {
  await documentClient.send(new UpdateCommand(buildSubscriberUpdate(requiredTable('AWS_DYNAMODB_SUBSCRIBERS_TABLE'), email, topics, source)))
}

export function buildSubscriberUpdate(tableName: string, email: string, topics: string[], source = 'website-newsletter', now = new Date()): UpdateCommandInput {
  const timestamp = now.toISOString()
  return {
    TableName: tableName,
    Key: { email: email.trim().toLowerCase() },
    UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt, createdAt = if_not_exists(createdAt, :createdAt), #source = :source ADD topics :topics',
    ExpressionAttributeNames: { '#status': 'status', '#source': 'source' },
    ExpressionAttributeValues: { ':status': 'SUBSCRIBED', ':updatedAt': timestamp, ':createdAt': timestamp, ':source': source, ':topics': new Set(topics) },
  }
}
