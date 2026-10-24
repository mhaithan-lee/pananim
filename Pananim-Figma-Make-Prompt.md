# PANANIM — COMPLETE FIGMA MAKE BUILD PROMPT

Copy everything below the divider into Figma Make. This is a proposed product specification based on the supplied three-page project outline, expanded to cover complete buyer and farmer journeys. Pananim is an assumed working brand name; replace it if needed.

---

Build PANANIM, a responsive Philippine crop marketplace connecting farmers and agricultural cooperatives directly with buyers, retailers, wholesalers, and market vendors. Create a complete, navigable website prototype with realistic interactions, not a landing page with disconnected dashboard mockups.

## 1. Product purpose and boundaries

The underlying project explicitly includes crop pricing, crop inventory management, a transaction ledger, logistics/delivery tracking, and role-based access. Farmers manage crops, view regional wholesale reference prices, coordinate sales, and request shared transport. Buyers browse crops, coordinate quantities and purchases, consult market prices, and track transactions and deliveries. Logistics providers update transport status; authorized administrators manage records; DA monitoring officers view monitoring information. Buyer bids are optional in the original outline.

Prioritize complete BUYER and FARMER experiences. Include the limited staff verification workflow needed to demonstrate farmer approval. Do not spend the main implementation budget building full driver, DA officer, or administrator suites. Represent their integration points through realistic assignments, records, and status updates. Do not imply government endorsement or automatic access to official data.

Checkout, billing, payment integration, reviews, detailed verification, quotation workflows, and the policies below are proposed product extensions, not requirements already specified in the original outline. Keep operational values configurable and identify them in implementation notes as decisions requiring owner approval before launch.

Use PHP currency with the peso symbol, Philippine addresses and mobile numbers, and Asia/Manila dates and times. Default interface language is clear English. Include an English/Filipino language preference only if the displayed UI is actually translated; otherwise omit an inactive language switch.

This is primarily a wholesale marketplace. Support minimum order quantities, quantity increments, kilogram/crate/sack units, farm-specific terms, bulk prices, quotations, and multi-farmer purchases. Do not silently turn it into a subscription grocery store. Small purchases are available only on listings whose minimum quantities allow them.

Implement all screens with realistic sample data and connected state. Production readiness is a target for the specification, not a claim about a generated prototype. Real authentication, document verification, payments, refunds, file storage, notifications, stock reservation, and authorization require backend integrations and independent validation. Where unavailable, use clearly labeled demo adapters. Never display a simulated payment, identity check, or delivery as a real completed external operation.

## 2. Visual design and responsive behavior

Create an original, trustworthy Filipino agricultural marketplace. Use warm off-white backgrounds, deep forest green for navigation and primary actions, dark readable body text, muted leaf green surfaces, and restrained harvest-yellow accents. Choose accessible contrast rather than pale green text. Use real-looking crop and farming photography with consistent crops and aspect ratios. No generic startup gradients, floating decorative blobs, excessive pill-shaped containers, or repeated identical feature cards.

Use a readable sans-serif for forms, tables, and body copy, with an expressive but restrained display face for major public headings. Maintain a consistent type scale, spacing system, buttons, inputs, status badges, tables, cards, drawers, dialogs, breadcrumbs, alerts, and empty states. Body text should generally be at least 16px; do not shrink labels to fit layouts. Use clear sentence case and concise action labels.

Public pages should feel editorial and agricultural: large useful photography, asymmetrical hero composition, clear shopping tools, farmer stories, and alternating spacious sections. Operational dashboards should feel efficient, with strong information hierarchy, useful tables, and obvious next actions. Do not style every dashboard like a marketing page.

Design for 1440px desktop, 768px tablet, and 390px mobile, and ensure no overflow at 320px. Desktop content may use a roughly 1200–1280px maximum width. On mobile, use filter drawers, readable stacked order cards, compact navigation, and a sticky product purchase bar that does not cover content or the keyboard. Tables must retain meaningful labels when stacked or scrolled. Use subtle motion and respect reduced-motion preferences.

Accessibility: semantic landmarks, logical headings, visible keyboard focus, keyboard-operable menus/dialogs, correctly associated labels, helpful alt text, error summaries linked to fields, live announcements for cart changes, text labels alongside status colors, and accessible star-rating controls. Aim for WCAG 2.2 AA and verify rather than merely claiming compliance. Keep touch targets generous, preferably 44px or larger.

## 3. Required page and route inventory

Build the following as working routes or clearly addressable states. Related routes may share components, but must have distinct relevant content and behavior. Do not substitute one generic page for all destinations.

PUBLIC AND SHOPPING
01 / — long homepage
02 /shop — searchable crop marketplace
03 /shop/category/:slug — category results
04 /search?q= — search results and no-results state
05 /crops/:slug — long crop product details
06 /farmers — farmer/cooperative directory
07 /farmers/:slug — public farmer storefront
08 /market-prices — regional wholesale price reference
09 /how-it-works — buyer and farmer explanations
10 /sell-with-pananim — farmer recruitment and verification explanation
11 /delivery-coverage — serviceability and delivery information
12 /about — purpose and project background
13 /help — searchable help center
14 /help/:slug — useful help articles
15 /contact — support inquiry
16 /policies/:slug — separate terms, privacy, delivery, cancellation/refund, review, and seller-policy content

AUTHENTICATION AND ONBOARDING
17 /register — buyer/farmer role choice
18 /register/buyer — buyer registration
19 /register/farmer — farmer/cooperative registration
20 /verify-contact — contact verification
21 /login — sign in and role-aware destination
22 /forgot-password — request password reset
23 /reset-password — token-valid, expired-token, and success states
24 /farmer/onboarding — farm setup wizard
25 /farmer/verification — private verification wizard
26 /farmer/verification/status — submission, review, correction, and decision states

BUYER COMMERCE AND ACCOUNT
27 /cart — cart grouped by farmer
28 /checkout/address — delivery and billing addresses
29 /checkout/delivery — fulfillment and delivery quotations
30 /checkout/payment — payment selection and pending/failure states
31 /checkout/review — final order review
32 /orders/:id/confirmation — confirmed purchase summary
33 /buyer/dashboard — buyer overview
34 /buyer/orders — orders list
35 /buyer/orders/:id — order details and status timeline
36 /buyer/orders/:id/tracking — delivery details
37 /buyer/orders/:id/invoice — printable billing document
38 /buyer/orders/:id/issue — cancellation, shortage, or quality issue request
39 /buyer/reviews/new/:itemId — verified-purchase review form
40 /buyer/reviews — submitted reviews and edit states
41 /buyer/saved — saved crops and farmers
42 /buyer/quotes — quotation requests
43 /buyer/quotes/:id — quote detail, revisions, and acceptance
44 /buyer/messages — conversations with farmers/support
45 /buyer/transactions — transaction ledger
46 /buyer/deliveries — delivery list and transport requests
47 /buyer/addresses — address book
48 /buyer/billing — billing profiles and available payment settings
49 /buyer/profile — identity and buyer/business information
50 /buyer/security — password, contact changes, and sessions
51 /buyer/notifications — notification center and preferences
52 /buyer/support — support requests and case details

FARMER WORKSPACE
53 /farmer/dashboard — inventory, sales, delivery, and verification overview
54 /farmer/inventory — crop listings and stock
55 /farmer/inventory/new — create crop listing
56 /farmer/inventory/:id/edit — edit listing and crop batches
57 /farmer/inventory/:id/preview — buyer-facing listing preview
58 /farmer/orders — incoming orders
59 /farmer/orders/:id — order handling and fulfillment
60 /farmer/quotes — incoming quotation requests
61 /farmer/quotes/:id — response and negotiation history
62 /farmer/transactions — sales transaction ledger
63 /farmer/settlements — earnings and settlement details
64 /farmer/deliveries — transport requests and assignments
65 /farmer/deliveries/new — request transport/shared cargo
66 /farmer/deliveries/:id — shipment detail and updates
67 /farmer/market-prices — contextual price reference
68 /farmer/reviews — received reviews and public replies
69 /farmer/messages — buyer/support conversations
70 /farmer/storefront — farm profile editing and preview
71 /farmer/profile — private account/cooperative settings
72 /farmer/payout-settings — settlement destination settings
73 /farmer/security — security settings
74 /farmer/notifications — notifications and preferences
75 /farmer/support — help requests and case details

SUPPORTING STAFF AND SYSTEM STATES
76 /staff/verifications — permission-protected application queue
77 /staff/verifications/:id — restricted document review and decision
78 /403 — access denied
79 /404 — page not found
80 /service-unavailable — recoverable unavailable state
81 /session-expired — sign-in continuation with safe return path

Provide a development-only route index and demo scenario selector so the presentation can reach every route and critical state. This must not appear as a customer feature or bypass permissions in production.

## 4. Long homepage: design all sections fully

Build a substantial homepage with approximately 14–16 purposeful sections. Length must come from meaningful content, not oversized empty space.

1. Useful announcement bar: service area or seasonal availability. No unsupported nationwide-delivery promise.
2. Desktop header: logo, prominent crop/farmer search, delivery location selector, Shop crops, Farmers, Market prices, How it works, Sell with Pananim, account, and cart with live count. Accessible mobile navigation.
3. Hero with documentary-style farm/produce photography. Suggested headline: “Fresh harvests. Direct connections.” Supporting copy explains wholesale crop sourcing from farmers and cooperatives. Primary CTA “Browse available crops”; secondary “Sell your harvest.” Include a compact location/serviceability input.
4. Trust explanation: farmer identity reviewed, clear unit prices, traceable order records, and delivery coordination. Explain what each claim means. No invented statistics, certifications, or guarantees.
5. Browse crop categories with distinct imagery: leafy vegetables, root crops, fruit vegetables, legumes, alliums, and gourds.
6. Available harvests: 6–8 fully populated crop cards with farmer, location, stock, minimum order, unit price, rating count, and quick add where appropriate.
7. Regional price reference preview: crop, region, unit, date, source, and reference price; label sample values as demo data. Link to full price page. Explain that market references are not seller prices.
8. Seasonal harvest spotlight: an editorial image/text section with relevant listings. Only display seasonal claims supported by the sample dataset or editorial content.
9. Meet the farmers: 3–4 farm/cooperative profiles, public location, products, verification meaning, and storefront links.
10. How ordering works: choose crops, confirm quantity and fulfillment, pay through the available method, follow delivery, inspect receipt, and review.
11. Bulk purchasing section for retailers, vendors, and wholesalers: quantity tiers, quotations, recurring relationships without automatic subscriptions, and clear minimums.
12. Delivery and shared cargo explanation: coverage, pickup options, estimated versus confirmed charges, separate seller shipments, and manual status updates.
13. Buyer reviews: realistic sample verified-purchase reviews, review dates, crop context, and links. Clearly identify sample reviews in the demo environment; no fabricated real testimonials.
14. Farmer recruitment section: “Bring your harvest to more buyers,” benefits grounded in actual functionality, verification checklist, and registration CTA.
15. FAQ covering minimum quantities, variable weight, verification, payments, delivery coverage, crop availability, cancellations, and damaged produce.
16. Full footer: buyer help, farmer help, policies, contact, accessibility, and optional marketing subscription with explicit opt-in. Do not invent a real office address or support phone number.

## 5. Marketplace, directory, and long product details

Marketplace: working search, sort, filter chips, clear-all, result count, pagination/load more, and shareable query state. Filters include crop/category, farmer location, delivery destination, availability, minimum quantity, price per comparable unit, verified farmer, harvest/availability date, and applicable cultivation evidence. Never compare a sack price directly with a kilogram price without a documented conversion. Sort by relevance, newest, comparable unit price, and rating with transparent empty-rating behavior.

Product cards show crop/variety, current photo, farm name, province, verified status, selling unit and pack weight, price, minimum quantity, available quantity or stock state, earliest fulfillment estimate, and review count. “No reviews yet” must not appear as a zero-star rating. Quick add must require unit/quantity selection when there is ambiguity.

Farmer directory supports location, crops, and verification filters. Public storefront includes cover image, farm story, approximate location, reviewed status and date, products, fulfillment options, review summary, and contact action. Never expose government ID details, payout information, private documents, or exact private farm coordinates.

Build a genuinely long crop detail page with these complete sections:

1. Breadcrumbs and accessible image gallery showing crop closeups, packaging, and sample harvest context; allow zoom.
2. Above-fold purchase panel: crop name, local name/variety, farmer link, verification badge, rating and review count, price per unit, normalized price where meaningful, availability, batch, harvest date or explicitly expected harvest date, minimum order, increment, quantity selector, selected tier, subtotal, destination check, fulfillment estimate, Add to cart, Request bulk quote, and Save.
3. Price tiers table with explicit thresholds and explanation whether the applicable tier price applies to the whole quantity. Update totals immediately and consistently.
4. Clear specifications: crop, variety, grade definition, size range, selling unit, pack weight, packaging, origin, current batch, available quantity, cultivation declaration, and availability dates. Do not imply certification from an unchecked seller claim.
5. Crop description and suitable buying uses. Describe natural size/color variation without dismissing legitimate defects.
6. “Meet your grower” section with farm photo/story, location, verification explanation, and storefront link.
7. Harvest/packing information, freshness expectations, and batch traceability. Use factual records; no invented freshness countdowns.
8. Handling and storage guidance with concise, reviewed editorial content. Do not invent shelf-life guarantees or health claims.
9. Regional wholesale reference comparison using the same crop, grade, unit, geography, and date where possible. Show source/date and “Not directly comparable” when dimensions differ. No unsupported savings percentage.
10. Delivery/pickup options, coverage, tentative dates, fee estimate, transport quotation process, and shared-cargo explanation.
11. Quantity and substitution policy: no silent substitutions. Explain exact-pack versus variable-weight listings and required buyer approval for changed totals.
12. Cancellation, quality reporting, shortage, and refund process with policy links and configurable deadlines.
13. Full review section: average, count, star distribution, verified-purchase marker, photos, dates, helpful votes, sorting/filtering, farmer replies, report action, and pagination. Separate crop quality feedback from delivery issues.
14. Product questions with question form and farmer answers; no fabricated response-time promise.
15. Related crops and more from this farmer. Preserve meaningful navigation and cart state.

Provide in-page section navigation and a compact sticky purchase bar after the main purchase panel scrolls away. Include sold-out, harvest delayed, unavailable destination, suspended farmer, archived listing, and no-review versions. Upcoming-harvest listings are inquiry-only unless an explicit preorder workflow exists; do not allow ordinary immediate checkout on uncertain stock.

## 6. Registration, login, and contact verification

All forms need persistent labels, required/optional markings, example formats, field-level validation, error summary, submitting state, success state, and retry behavior. Preserve non-sensitive inputs after errors. Do not make optional fields secretly mandatory.

Buyer registration fields: first name, last name, email, Philippine mobile number, buyer type (individual buyer, retailer, wholesaler, market vendor, other business), password, confirm password, required acceptance of terms, and separate optional marketing opt-in. Show the privacy notice. Business name is conditional for business buyers; business registration details and billing tax information belong in the later business/billing profile, not a mandatory first-screen ID upload. Collect delivery address during onboarding or checkout.

Farmer registration fields: first name, last name, email, mobile number, seller type (individual farmer or agricultural cooperative), farm/cooperative display name, password, confirm password, acceptance of terms/seller terms, and optional marketing consent. Cooperative accounts additionally identify the authorized representative and role. Subsequent private verification checks authority. Registration alone never awards a verified badge.

Password behavior: a proposed configurable minimum of 12 characters, support at least 64 characters, allow password managers and paste, show/hide control, clear matching feedback, and production checks for compromised passwords. Avoid arbitrary composition tricks and never store raw passwords in demo persistence.

Normalize valid +63 and 09 mobile formats. Email and mobile verification are separate states; both are required before buying or submitting a seller application under this proposed policy. Use a six-digit demo OTP flow with configurable expiry, resend cooldown, attempt limits, invalid/expired/used-code states, masked destination, and change-contact action. Demo delivery must be visibly simulated.

Login supports email or mobile, password visibility, forgot password, and a safe remembered session option. Include invalid credentials, rate-limited attempt, unverified contact, suspended account, and expired-session states without revealing whether an unknown account exists. After successful login return to the intended allowed route and preserve the cart. Never place passwords or OTPs in URLs.

Implement password reset request, neutral confirmation, valid link, expired/used link, password update, and sign-in continuation. Changing email or phone requires reauthentication and reverification. Role switching is allowed only for roles already assigned; registering as a farmer must not grant staff access.

## 7. Farmer onboarding and verification — critical feature

Create a clear progress stepper, draft saving, resume flow, document checklist, privacy explanation, and useful pending/correction screens. The following is a proposed Pananim review process, not a statement of legal requirements. Put accepted documents, expiry rules, and review targets in configuration for owner approval.

Step 1 — Farm profile: seller type, public farm/cooperative name, short farm story, main crops, approximate production capacity and units, region, province, city/municipality, barangay, private street/sitio address, optional map pin, public-location visibility choice, and primary contact. Optional farm area is never required merely to collect more personal data.

Step 2 — Identity/representative: legal first and last name, representative role where applicable, identity-document type, issuing authority if needed, expiry date if present, document upload, and declaration that the applicant is authorized to submit it. Collect only the minimum ID reference required by the adopted review process; mask it in staff summaries. Do not collect date of birth, selfies, biometrics, or full document numbers by default. Include an assisted-verification route for applicants unable to complete online uploads.

Step 3 — Farm/cooperative evidence: evidence type and upload, farm location matching the profile, recent farm/crop photographs, and a short explanation linking the applicant to the farm. Proposed accepted evidence may include a farmer registration record, agricultural-office certification, tenancy/lease evidence, ownership evidence, or another reviewer-approved alternative. Do not require land ownership: tenants and authorized cooperative members can be legitimate farmers. For cooperatives, add registered cooperative name, registration reference, certificate, and representative authorization. Clearly mark these alternatives as configurable platform policy.

Step 4 — Fulfillment setup: pickup address, pickup contact, availability days/time windows, handling lead time, delivery service areas, buyer pickup availability, own delivery versus third-party coordination, shared-cargo preference, loading constraints, and packaging capability.

Step 5 — Review and submit: field summary, documents list with safe previews, declarations of accuracy and authority, privacy/retention explanation, and submit confirmation. Payout setup is a separate protected step; explain when it is needed, and distinguish identity approval from payout readiness.

Uploads: proposed JPEG/PNG/PDF support up to 10MB per file; show size/type guidance, progress, remove/replace, successful upload, failed upload/retry, unreadable document, missing reverse side only when needed, and suspected duplicate states. Production files require restricted storage, malware checks, validated MIME/signatures, and expiring authorized access. Never store real identity documents in browser local storage or public asset paths. Demo uses safe fictional document placeholders.

Verification states: not started, draft, submitted, under review, more information needed, approved, rejected, expired, suspended, and resubmission pending. Every state needs a clear explanation, last update, next action, and status history. Corrections show field-specific reasons, retain valid information, and allow resubmission. Rejection provides an appropriate reason and appeal/support option. Do not promise a review turnaround until configured by operations.

Permissions: unapproved farmers can complete onboarding, save listing drafts, and preview their store. They cannot publish purchasable listings or accept new orders. Approval enables publishing only when required fulfillment setup is complete. Expiry/suspension blocks new sales while preserving access to existing obligations and support, subject to staff restrictions. Verification does not certify every crop as organic, guarantee quality, or mean DA accreditation.

Public badge wording: “Farmer identity and farm evidence reviewed by Pananim.” A detail popover explains scope and review date. Organic/cultivation certification, if any, is separate and evidence-backed.

Staff companion: queue with status/date filters; application detail with masked personal information, permission-protected document previews, checklist, reviewer notes, and approve/request changes/reject actions. Require reasons for corrections/rejection, confirmation for decisions, and immutable actor/time/action audit events. Approval updates the farmer state and public badge consistently. Demo staff access is isolated; production must enforce server-side permissions.

## 8. Cart, checkout, billing, and payment

Cart groups items by farmer and shows crop/variant, batch where applicable, unit, pack size, price tier, quantity, minimum, increment, available stock, subtotal, and fulfillment method. Support remove, undo, save for later, and continue shopping. Multi-farmer carts create one purchase group containing separate seller orders and possibly separate shipments, charges, and statuses. Never imply one truck or one delivery fee unless explicitly confirmed.

Guests may browse and build a cart; verified sign-in is required to place an order under this proposed policy. Explain this before checkout. Merge guest/account carts without silent duplication; revalidate quantity, stock, seller eligibility, and price. Flag changes and require review.

Checkout step 1 — Address/contact:
- Recipient full name and mobile number; email for updates.
- Region, province, city/municipality, barangay, postal code, house/building/unit, street/sitio, optional landmark, optional map pin, and optional delivery instructions.
- Address label and optional save-as-default.
- Separate recipient and billing contact where needed.
- Billing same as delivery toggle; when different, billing name/business name and full billing address.
- Optional business/tax identifier only where required for the requested billing document; do not invent tax obligations.
- Dependent address selectors reset invalid downstream choices. Provide manual correction/support where reference lists are incomplete.

Checkout step 2 — Fulfillment:
- Per-farmer delivery, buyer pickup, or available shared-cargo options.
- Pickup location and opening/collection windows; delivery destination and dates.
- Confirmed delivery slot versus requested slot clearly distinguished.
- Delivery fee, basis, responsible party, additional handling charges, and total weight.
- Where freight is unknown, submit a delivery quotation request and pause payment until the buyer accepts the final fee. Never treat an unknown fee as zero.
- Shared cargo requires explicit selection, a confirmed allocation/fee before payment, and a fallback choice if unavailable. Do not promise a saving or display other buyers’ addresses.
- No substitution by default. If a farmer proposes a replacement or changed quantity, show the original and revised items/total and request approval before fulfillment or extra payment.

Checkout step 3 — Payment:
- Configurable payment methods suitable for the intended launch, with demo examples for GCash, Maya, cards through hosted provider checkout, and bank transfer.
- Show only connected/eligible methods as available in production. Do not imply that every named provider is already integrated.
- Bank transfer needs amount, unique reference, expiry, and optional proof upload; uploaded proof means “Awaiting reconciliation,” never “Paid.”
- COD or pay-on-pickup only when explicitly enabled for the seller/order; identify recipient of payment and fees.
- Never collect raw card details or CVV in app-controlled forms or persistence. Use provider-hosted entry for real payments.
- Demonstrate pending, redirect/canceled, expired, failed, retry, duplicate-submit protection, and confirmed states. Payment status comes from verified server events, not the success URL alone.

Checkout step 4 — Final review:
- Contact/address, farmer groups, item quantities/units, fulfillment schedule, substitution preference, item totals, delivery/handling fees, discounts only if genuinely supported, configured taxes if applicable, and exact payable total.
- Explain any non-refundable/conditional charge only if the actual policy supports it.
- Show applicable cancellation and quality-reporting terms with links and agreement.
- Use “Place order and pay ₱X” for immediate payment and accurate alternative wording for unpaid methods.
- Recheck stock, pricing, fee quote validity, seller eligibility, and slot immediately before confirmation. If changed, present the difference for renewed approval.

Confirmation shows group ID, seller order IDs, payment status, receipt availability, separate delivery estimates, tracking links, and next actions. Do not show “Payment received” for a pending transfer. Confirmation refresh must not create a duplicate order.

Billing page includes saved billing profiles, transaction history, downloadable/printable documents, and provider-tokenized payment references only when supported. The invoice/order-summary view must show issuer identity from configured records, document ID/date, seller breakdown, line quantities and unit prices, fees, discounts/taxes where applicable, amount paid/due, payment reference, and payment status. Do not call an unvalidated demo document an official tax invoice.

## 9. Order, stock, and money rules

Keep order, payment, shipment, verification, and settlement states separate.
- Order: awaiting confirmation, confirmed, preparing, ready for dispatch/pickup, partially fulfilled, fulfilled, cancellation requested, canceled, and disputed.
- Payment: unpaid, pending, paid, failed, expired, partially refunded, refunded.
- Shipment: request pending, accepted/assigned, pickup scheduled, picked up, in transit, delivered, failed, canceled.
- Settlement: not eligible, pending, processing, paid, failed, adjusted.

The PDF calls for manually updated delivery statuses. Display status timestamp and updater role; do not invent live GPS, moving trucks, or a courier API. A map may show static pickup/destination context with appropriate privacy restrictions.

Reserve confirmed available stock atomically on the backend using an expiring reservation during checkout, release on expiry/cancellation as appropriate, and prevent overselling. The demo must simulate competing-stock changes and reservation expiry coherently. Do not rely on client-side counters for production inventory control.

Use integer centavos for monetary calculations and documented decimal precision for weights. Each line stores a purchase-time snapshot of unit, price, tier, quantity, seller, and product description. Later listing edits must not rewrite past invoices or transactions.

Default demo listings use exact stated pack weights or fixed agreed quantities. For variable-weight orders, provide an explicit final-weight reconciliation and buyer consent flow before any increased charge; refund underweight amounts according to the adopted policy. Never silently charge more than approved.

Worked demo calculation: tomatoes at ₱60/kg with 5kg minimum and 1kg increments; 10kg qualifies for ₱55/kg applied to all 10kg, totaling ₱550. A separate farmer supplies 5kg cabbage at ₱40/kg, totaling ₱200. Delivery charges are ₱120 and ₱80 respectively. Total is ₱950, with no unconfigured taxes or discounts. These are illustrative prices, not current market prices. Display the same calculation across cart, checkout, confirmation, order records, and ledger.

## 10. Reviews and after-sales support — critical feature

Only buyers with a delivered/collected order item can review that item. Permit one review per eligible purchased line item, with edit history according to configured rules. A canceled or never-fulfilled item is ineligible. Sellers cannot review themselves. Refunded delivered purchases do not automatically lose review eligibility, and criticism is not grounds for removal.

Review form: overall 1–5 stars, optional crop-quality and packaging ratings, optional delivery feedback recorded separately, optional short title, required review text with clear length limits, optional up to five JPG/PNG photos with size limits, public display-name preview, and confirmation that uploaded content is appropriate. Warn against posting phone numbers, private addresses, or payment information. Allow edit/remove before submission and show pending moderation, published, and rejected-with-reason states where moderation applies.

Review display includes score/count, star distribution, verified-purchase badge, date, crop/variant, relevant purchased-unit context without disclosing sensitive quantities by default, text/photos, one farmer response, helpful vote, and report. Derive aggregates from published reviews. Provide “No reviews yet” and filtered-empty states. Farmer replies are visibly identified and cannot modify the buyer’s review.

Farmer review management includes filters, reply composer, reported-content action, and links to associated support issues where authorized. Reporting is not deletion. Moderation should use content-policy reasons and auditable actions.

Issue request form: order/item selection, issue type (damaged/spoiled, missing, wrong item, quantity discrepancy, delivery issue, payment issue, other), affected quantity, description, optional evidence photographs, requested resolution, and preferred contact. Show configurable reporting windows, eligibility explanation, and a support escalation path for exceptions. Proposed deadlines must be labeled as configurable rather than invented operational promises.

Support cases show case ID, timeline, messages, requested evidence, seller response, decision, and refund progress. Distinguish request submitted, approved, refund processing, refunded, and rejected. A cancellation request is not a completed cancellation. Preserve evidence and records after disputes; never let a seller silently erase an order or review.

## 11. Buyer workspace

Dashboard: upcoming deliveries, pending payments, quotes needing a response, recent orders, quick reorder, saved farmers, and notifications. Reorder creates a new cart using current availability/prices and requests review of changes.

Orders: search by ID/farmer/crop, date and status filters, seller-order grouping, readable totals, and actionable states. Detail page includes purchased items, status timeline, billing/fulfillment, communication, cancellation eligibility, report issue, and eligible review buttons.

Quotes: request crop/grade, quantity/unit, preferred delivery window, destination, packaging requirements, notes, and response-needed date. Show requested, negotiating, quoted, accepted, declined, expired, and converted-to-order states. An accepted valid quote creates a reviewable cart/order snapshot; acceptance alone does not mark payment complete. Invalid stock or expired quotes require reconfirmation.

Messages: conversations linked to farm, quote, or order; timestamps, unread state, attachment restrictions, sending/failed/retry states, and clear support escalation. Do not claim end-to-end encryption unless implemented.

Transactions: date, order/payment reference, seller, crop quantity/unit, amount, payment status, refunds, outstanding amount, and export filtered data. Keep charges and refunds as separate immutable events. CSV export must actually produce data and prevent spreadsheet formula injection.

Address book: add/edit/archive, default selection, delivery validation. Saved-address changes do not rewrite historical order addresses. Account settings include notification preferences, security, and a data/deletion request path that explains applicable record retention without claiming immediate deletion of financial records.

## 12. Farmer workspace and listing forms

Dashboard: verification task, draft listings, available and reserved quantities, low stock, orders needing action, today's pickups/deliveries, gross sales, refunds, and net eligible settlement. Specify date range and metric definitions. Revenue is not the same as payout balance.

Inventory table: crop, variety, listing status, batch, unit, total/reserved/available quantity, minimum quantity, price, harvest/availability dates, and actions. Support search/filter, add, edit, preview, pause, archive, and reasoned stock adjustments. Delete only unused drafts; archive referenced listings. Include unsaved-change warning and version-conflict handling.

Create/edit listing form fields:
- Crop common name, optional local name, variety, category, concise description.
- Product photographs, cover image selection, alt text.
- Batch/lot reference; harvested date or expected harvest date; availability period.
- Farm origin/public location; private pickup address linked separately.
- Grade with definition, optional size range, packaging type, packaging weight.
- Selling unit (kg, crate, sack, piece as appropriate), net pack weight/conversion where known.
- Available stock, minimum order, quantity increment, optional maximum per order.
- Base price per selling unit and optional non-overlapping quantity-tier thresholds/prices.
- Cultivation declaration and optional certification/evidence details; do not auto-award organic status.
- Handling lead time, pickup/delivery choices, coverage, loading needs, and transport responsibility.
- Storage guidance, explicit substitution policy, and seller notes.
- Draft, preview, and publish actions with verification/readiness checks.

Validate positive quantities/prices, increment compatibility with minimums, meaningful pack conversions, non-overlapping price tiers, coherent dates, required photos, supported units, and stock not below already-reserved obligations. Warn that listing changes apply to future purchases; order modifications use a separate approval flow.

Farmer orders: view purchased terms, confirm or decline within configured rules, record preparation, arrange pickup, attach allowed packing details, and communicate. If confirmation is required before payment, implement that sequence consistently; otherwise confirm stocked fixed-price demo purchases automatically after verified payment and let exceptions use cancellation/refund workflows. Never allow a decline to leave a paid buyer without resolution.

Quote response fields: quantity, unit, price/tier, packaging, fulfillment method, fee or pending freight quote, estimated date, validity expiry, and message. Version revisions and require buyer acceptance of changed terms. Buyer bids/matching remain an optional extension; do not pretend an algorithm exists or add a nonfunctional bidding menu.

Sales ledger: buyer, seller order ID, date, crop, quantity/unit, gross amount, configured fees, refunds, net amount, payment status, settlement status, and export. Settlement details show source transactions, adjustments, destination masked, initiated date, failure/retry/help state, and reconciliation reference. Do not present an unlicensed wallet or promise instant payouts.

Payout settings: method, institution/provider, account holder name, account number/reference, and confirmation; mask after entry, require reauthentication for changes, and show mismatch/verification states. Do not upload bank statements by default. Actual payout readiness is independent of public farmer verification.

## 13. Logistics, shared cargo, and market price modules

Transport request fields: linked seller order(s), pickup and destination, contact persons, requested pickup/delivery windows, crop/packaging, total weight and units, package count, optional dimensions, loading assistance, vehicle/handling requirements, shared-cargo opt-in, notes, and fee quote status. Prevent duplicate live transport requests for the same fulfillment leg.

Transport detail: request/assignment status, logistics provider where assigned, agreed fee, fee payer, pickup/destination, schedule, cargo summary, update history, delivery proof when authorized, and support action. If no provider accepts, show awaiting assignment, reschedule, pickup alternative, or cancel-request actions. A transport request does not equal a confirmed shipment. Shared-cargo requests must allow dedicated-transport fallback with buyer approval of changed charges.

Market price page: filters for crop, region/market, grade if available, unit, and date; latest reference table; optional historical chart with accessible table fallback; source and published/update time; stale/missing-data states. Reference records are read-only for buyers/farmers. Clearly distinguish wholesale reference, seller asking price, and transaction price. Sample data is visibly labeled and never represented as a live DA feed. Do not calculate comparisons across incompatible units, grades, places, or dates.

## 14. Global behavior, data, and implementation architecture

Use the React/TypeScript environment supported by Figma Make, reusable components, consistent routing, typed models, and a shared data/service layer. Do not create unrelated hardcoded page states. Recommended entities: User, RoleAssignment, ContactVerification, Farm, VerificationApplication, VerificationDocument, Listing, CropBatch, PriceTier, InventoryReservation, Cart, Quote, OrderGroup, SellerOrder, OrderItemSnapshot, Payment, Refund, Shipment, TransportRequest, MarketPriceRecord, Review, ReviewReply, Conversation, Notification, SupportCase, Settlement, and AuditEvent.

Seed at least 18 distinct Philippine crop listings, six fictional farms/cooperatives, buyer types relevant to wholesale trade, several batches and price tiers, and realistic order examples across important states. Include tomatoes, cabbage, carrots, pechay, eggplant, squash, string beans, okra, cucumber, potatoes, onions, and other relevant crops. All farm names, prices, testimonials, certification examples, records, and documents are fictional demo fixtures. Make this clear in the demo environment without cluttering production-oriented layouts with developer notes.

Use safe local persistence for non-sensitive demo cart/preferences/fictional records only. Never persist real passwords, OTPs, identity documents, banking secrets, or payment card details. Put backend requirements and mock adapters in developer documentation. Customer-facing pages should explain only meaningful operational limitations, not internal implementation jargon.

Production integration requirements: server-side authentication and authorization; tenant/owner checks on every private object; secure session handling; validated uploads and restricted document storage; payment webhooks with signature checks and idempotency; atomic inventory and order writes; database constraints; notification delivery/retries; audit logging; rate limits; redacted operational logs; backups and recovery; staff permissions; and monitored failures. Do not claim these are implemented merely because their UI exists.

Every data-driven page needs appropriate loading, empty, error/retry, unauthorized, and offline/connection-loss handling. Retry must not duplicate orders, reviews, messages, or payments. Show skeletons without hiding important form labels. Maintain coherent browser back/forward, direct URLs, refresh, and intended-route continuation after authentication.

All visible controls must work: searches filter, sort changes order, quantities recalculate, filters persist appropriately, forms validate, upload demos show progress, settings save, notifications mark read, links navigate, exports download, and print views print cleanly. Do not leave decorative buttons that only show a generic toast. If an integration is unavailable, provide an honest unavailable or demo state with a useful next action.

## 15. Acceptance scenarios and completion requirements

Verify the following complete journeys, not just individual screen appearance:
1. Guest discovers crops from the long homepage, searches/filters, opens the long product page, and builds a cart.
2. Buyer registers, verifies email/mobile, returns to the preserved cart, checks delivery coverage, enters billing, pays through the demo adapter, and sees matching totals in confirmation and ledger.
3. Two-farmer order creates separate seller orders/shipments and correctly totals both delivery charges using the ₱950 worked example.
4. Below-minimum and invalid-increment quantities are blocked with actionable messages.
5. A price/stock change or expired reservation requires review before checkout resumes.
6. Unknown freight costs trigger a quotation step and cannot be paid as free delivery.
7. Payment failure/pending/refresh/retry never creates duplicate orders or falsely marks a payment paid.
8. Buyer follows manual delivery updates, reports a shortage, sees refund progress, and submits an eligible verified-purchase review.
9. An ineligible buyer cannot review an undelivered item; farmer reply and rating aggregates update correctly.
10. Farmer registers, saves a verification draft, submits, receives a correction request, resubmits, and is approved through the protected staff demo workflow.
11. An unapproved farmer cannot publish; an approved farmer can publish a valid crop listing and see it appear in the buyer marketplace.
12. Farmer adjusts stock, receives an order, coordinates transport/shared cargo, and sees accurate ledger/settlement states.
13. A quote can be revised, accepted before expiry, and converted to an order without losing its agreed terms.
14. Unsupported destinations, sold-out crops, no reviews, canceled orders, rejected verification, failed delivery, and session expiry each have useful recovery paths.
15. Buyers cannot access other buyers’ orders, farmers cannot access others’ private records, and ordinary accounts cannot access staff verification documents. Demonstrate restrictions in the prototype and document mandatory backend enforcement.
16. Keyboard navigation, mobile layouts, form focus/error feedback, dialogs, cart announcements, and print/export output remain usable.

Build in a dependency-aware sequence: shared components/data/routes; long homepage/catalog/product details; registration and verification; buyer commerce; farmer operations; review/support/staff flows; then responsive and state QA. If implementation must be staged, keep a route coverage checklist and finish missing scope in subsequent passes; do not label the project complete while required routes are placeholders.

Deliver the functioning website, a route coverage checklist, a demo scenario guide, and a short implementation-readiness note separating working prototype behavior, connected integrations, mocked services, and launch decisions still requiring approval. Do not replace implementation with a written plan. Give special attention to the long homepage, long product details, complete reviews, and farmer verification, because these are essential presentation and product requirements.
