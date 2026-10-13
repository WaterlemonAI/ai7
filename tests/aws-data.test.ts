import test from 'node:test'
import assert from 'node:assert/strict'
import { buildBookingPut, buildSubscriberUpdate } from '../lib/aws-data.ts'

test('subscriber upsert normalizes email and merges topic set', () => {
  const input = buildSubscriberUpdate('subscribers', ' Person@Example.COM ', ['AI News', 'Releases'], 'website-newsletter', new Date('2026-10-13T10:00:00Z'))
  assert.deepEqual(input.Key, { email: 'person@example.com' })
  assert.match(String(input.UpdateExpression), /if_not_exists/)
  assert.deepEqual(input.ExpressionAttributeValues?.[':topics'], new Set(['AI News', 'Releases']))
  assert.equal(input.ExpressionAttributeValues?.[':status'], 'SUBSCRIBED')
})

test('booking record starts pending, retains contact context and expires after two years', () => {
  const startsAt = '2026-10-20T05:00:00.000Z'
  const input = buildBookingPut('bookings', {
    bookingId: 'booking-1', name: 'Test Visitor', email: 'visitor@example.com', phone: '+971500000000', organisation: 'Example Co', interest: 'RoleField', language: 'English', notes: 'QA', attendees: [], timezone: 'Asia/Dubai', startsAt, endsAt: '2026-10-20T05:30:00.000Z',
  }, new Date('2026-10-13T10:00:00Z'))
  assert.equal(input.ConditionExpression, 'attribute_not_exists(bookingId)')
  assert.equal(input.Item?.status, 'PENDING_EMAIL')
  assert.equal(input.Item?.recordType, 'SCHEDULED_CALL')
  assert.equal(input.Item?.phone, '+971500000000')
  assert.equal(input.Item?.expiresAt, Math.floor((new Date(startsAt).getTime() + 730 * 86400000) / 1000))
})
