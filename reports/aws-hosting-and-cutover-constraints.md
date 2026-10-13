# AI7Lab rehaul — AWS hosting and cutover constraints

Recorded: 13 October 2026  
Status: Binding implementation constraint

## Production protection rule

The existing AI7Lab website on Render is production and must remain untouched throughout discovery, design, implementation, and AWS validation.

The project must not:

- Change, redeploy, restart, suspend, resize, or delete the Render service.
- Modify Render environment variables, build commands, domains, health checks, or deployment hooks.
- Run Render CLI mutations against the existing service.
- Change DNS away from the Render production site during design, development, or staging.
- Use the Render deployment as a test environment.
- Publish incomplete redesign work to `www.ai7lab.net`.

Read-only inspection of the public website remains allowed for content and SEO verification.

## AWS delivery model

The rehaul will be created as a separate AWS-hosted site with its own infrastructure and deployment lifecycle.

Required separation:

- Separate AWS infrastructure definition.
- Separate deployment environment and generated hostname.
- Separate build and deployment process.
- No dependency on the Render service.
- No production-domain cutover until the new site has passed design approval, implementation QA, SEO migration checks, and explicit cutover approval.

## Environment progression

### 1. Local implementation

- Continue building in the existing local repository after the Figma design is approved.
- Preserve the current production code until the replacement is ready.
- Do not add Render-specific changes for the rehaul.

### 2. AWS staging

- Deploy to an AWS-generated staging hostname first.
- Keep staging out of search results using access control where practical and `noindex` as a secondary safeguard.
- Do not set the staging site's canonical URLs to the AWS preview hostname; production canonicals should be applied only for the final release configuration.
- Use staging for responsive, accessibility, functional, performance, analytics, and SEO QA.

### 3. Production-ready AWS release

- Build and validate the release with the intended production canonical domain.
- Generate a complete crawl comparison and redirect verification report.
- Confirm analytics and form delivery.
- Confirm all Vendoreye, RoleField, and Taed claims.
- Preserve the Render production site as the live fallback until cutover succeeds.

### 4. Explicit DNS cutover

- Treat DNS cutover as a separate operation requiring explicit approval.
- Reduce DNS TTL in advance only after approval.
- Point the production hostname to the verified AWS distribution.
- Verify HTTPS, redirects, canonicals, sitemap, robots, structured data, analytics, forms, and representative content immediately after cutover.
- Keep the Render service unchanged during the initial monitoring window so rollback remains possible.

### 5. Post-cutover

- Monitor errors, crawl health, conversions, and search coverage.
- Decommission or modify Render only under a separate explicit instruction.

## Target AWS architecture decision

The current application is Next.js 16 and includes static content, generated routes, dynamic contact rendering, metadata images, and machine-readable endpoints. The final AWS architecture must be selected against the completed rehaul rather than prematurely locking the design to one hosting pattern.

Preferred decision order:

1. Use static export with Amazon S3 and CloudFront if all required behaviours can remain static and the generated SEO endpoints are preserved.
2. Use an AWS serverless Next.js architecture when SSR or runtime route behaviour remains necessary.
3. Avoid persistent servers unless the final application introduces a requirement that cannot be met cleanly with static or serverless hosting.

The AWS migration analysis must provide the proposed services, region, estimated monthly cost, deployment workflow, and operational implications before execution.

## SEO protections during parallel hosting

- AWS staging must not compete with `www.ai7lab.net` in search.
- Existing production URLs remain the migration source of truth.
- New URLs are added to the AWS release sitemap only when their pages are complete.
- Existing article and resource URLs remain unchanged.
- Redirects are implemented on AWS and verified before DNS cutover.
- `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, metadata, Open Graph assets, and structured data must match the approved portfolio hierarchy.

## AWS launch workflow constraint

The AWS launch service requires the local source to be uploaded for analysis. That upload must not happen until the user explicitly approves the service disclosure and the rehaul source is ready enough to produce a meaningful architecture plan.

Required disclosure before upload:

> The source code will be uploaded to the Launch with AWS service to analyse the application and generate a migration plan. If execution is later approved, an AWS-hosted agent will modify a copy of the source and produce a migrated snapshot. Source is encrypted at rest, automatically deleted after seven days, and is not used to train AI models. Git history, Git-ignored files, and common sensitive-file patterns are excluded on a best-effort basis.

Plan generation and migration execution are separate approval gates. AWS production deployment and DNS cutover are also separate from migration execution.

