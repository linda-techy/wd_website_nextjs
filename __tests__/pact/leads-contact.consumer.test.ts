/**
 * @jest-environment node
 *
 * Consumer Pact test — pins the contract the Next.js website expects from
 * the portal-API at POST /leads/contact (the public contact-form endpoint
 * proxied by src/app/api/leads/contact/route.ts).
 *
 * Provider: wd-portal-api  ·  LeadController.submitContactForm()
 * Body shape: PublicContactRequest (name, email, phone, projectType?, state?,
 *             district?, message?, leadSource?)
 * Success response: ApiResponse<Long> envelope { success, message, data: leadId }
 *
 * Run: npm test -- leads-contact.consumer
 * Output: writes pacts/wd-website-nextjs-wd-portal-api.json on success.
 * Provider verification: see wd_portal_api/src/test/java/.../LeadsContactPactProviderTest.java
 */
import path from 'path';
// Sub-path import — avoids loading the provider verifier (which transitively
// pulls in pure-ESM https-proxy-agent that breaks Jest CJS transform).
import { PactV3, MatchersV3 } from '@pact-foundation/pact/src/v3';

const { like, string, integer } = MatchersV3;

const provider = new PactV3({
  consumer: 'wd-website-nextjs',
  provider: 'wd-portal-api',
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'warn',
});

const VALID_BODY = {
  name: 'Audit Customer Test',
  email: 'pact-test@example.com',
  phone: '9876543210',
  projectType: 'residential',
  state: 'Kerala',
  district: 'Thrissur',
  message: 'Interested in a 3BHK build',
  leadSource: 'website_contact',
};

describe('POST /leads/contact — contract with portal-API', () => {
  it('returns 200 with the ApiResponse<Long> success envelope on a valid submission', async () => {
    await provider
      .given('the portal-API is up and accepting public contact submissions')
      .uponReceiving('a valid contact-form submission')
      .withRequest({
        method: 'POST',
        path: '/leads/contact',
        headers: { 'Content-Type': 'application/json' },
        body: VALID_BODY,
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': like('application/json') },
        body: {
          success: true,
          message: string(
            'Your inquiry has been submitted successfully. We will contact you shortly.'
          ),
          data: integer(123),
        },
      })
      .executeTest(async (mockProvider) => {
        const res = await fetch(`${mockProvider.url}/leads/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(VALID_BODY),
        });
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.success).toBe(true);
        expect(typeof body.data).toBe('number');
        expect(typeof body.message).toBe('string');
      });
  });

  it('returns 400 when phone fails the digit-range validator', async () => {
    await provider
      .given('the portal-API rejects submissions that fail input validation')
      .uponReceiving('a contact submission with an invalid phone number')
      .withRequest({
        method: 'POST',
        path: '/leads/contact',
        headers: { 'Content-Type': 'application/json' },
        body: { ...VALID_BODY, phone: '123' }, // too short — fails ^...\d{7,14}$
      })
      .willRespondWith({
        status: 400,
        headers: { 'Content-Type': like('application/json') },
        body: {
          success: false,
          errorCode: string('VALIDATION_ERROR'),
          validationErrors: like({ phone: 'Enter a valid phone number' }),
        },
      })
      .executeTest(async (mockProvider) => {
        const res = await fetch(`${mockProvider.url}/leads/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...VALID_BODY, phone: '123' }),
        });
        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body.success).toBe(false);
        expect(body.validationErrors).toBeDefined();
      });
  });
});
