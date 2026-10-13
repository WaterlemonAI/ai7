# AWS database plan for the Render-hosted AI7Lab website

## Decision

Keep the Next.js website and API runtime on Render for now. Store newsletter subscribers and scheduled-call records in two Amazon DynamoDB tables in the UAE region (`me-central-1`). The browser never talks to DynamoDB directly; only the server-side API routes can write records.

## Data model

### Subscribers

- Primary key: normalized email address.
- Fields: topic set, subscription status, source, created timestamp and updated timestamp.
- Repeated subscriptions merge topic preferences without creating duplicate records.
- `StatusUpdatedAtIndex` supports operational exports of active subscribers.

### Scheduled calls

- Primary key: generated booking ID.
- Fields: contact identity, phone, organisation, interest, language, optional context, attendees, visitor timezone, UTC start/end time, delivery state and provider message IDs.
- Status progresses from `PENDING_EMAIL` to `CONFIRMED` or `EMAIL_FAILED`.
- `EmailCreatedAtIndex` supports customer-history lookup.
- `StatusStartsAtIndex` supports upcoming-call and failed-delivery operations.
- Records expire after two years through DynamoDB TTL; deletion is asynchronous.

## Security and resilience

- DynamoDB encryption at rest enabled.
- Point-in-time recovery enabled for both tables.
- Deletion protection plus CloudFormation retain policies enabled.
- Pay-per-request billing avoids idle provisioned capacity.
- The generated IAM managed policy permits only `PutItem` and `UpdateItem` on these two tables.
- AWS credentials and SMTP credentials remain deployment secrets, never browser variables or tracked files.
- The public APIs retain honeypot protection; production release still requires rate limiting or managed bot protection.

## Render configuration after provisioning

Add the stack outputs as secret environment variables:

- `AWS_REGION`
- `AWS_DYNAMODB_SUBSCRIBERS_TABLE`
- `AWS_DYNAMODB_BOOKINGS_TABLE`

Attach the stack's least-privilege policy to the runtime AWS identity. Configure that identity in Render's secret environment using the safest supported short-lived or federated credential mechanism; do not expose credentials as `NEXT_PUBLIC_*` values.

## Release boundary

The existing Render service and DNS remain unchanged until a separate deployment step is explicitly approved. The database stack can be provisioned independently, then exercised from local/server-side integration tests before any website cutover.

## Provisioned stack

- Stack: `ai7lab-website-data`
- AWS account: `271858454098`
- Region: `me-central-1`
- Status: `CREATE_COMPLETE`
- Subscribers table: `ai7lab-website-data-SubscribersTable-6P9X1GMI9H1Q`
- Scheduled calls table: `ai7lab-website-data-ScheduledCallsTable-YF6HLC0A10TC`
- Runtime policy: `arn:aws:iam::271858454098:policy/ai7lab-website-data-WebsiteDataAccessPolicy-g1KaOMKz1FfM`

CloudFormation and `cfn-lint` validation passed. Both tables, all global secondary indexes, encryption, point-in-time recovery and deletion protection are active. Scheduled-call TTL is active on `expiresAt`. A real write/read/update integration test passed for both tables, and its synthetic records were removed immediately afterward.
