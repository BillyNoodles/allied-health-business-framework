export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this service, you accept and agree to be bound by the terms
            and conditions of this agreement.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
          <p>
            The Allied Health Business Assessment Tool provides business assessment and
            guidance services for allied health professionals. The service includes:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Business assessment questionnaires</li>
            <li>Personalized recommendations</li>
            <li>Resource library access</li>
            <li>Progress tracking tools</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">3. User Responsibilities</h2>
          <p>You agree to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide accurate information</li>
            <li>Maintain the security of your account</li>
            <li>Not share your account credentials</li>
            <li>Use the service in compliance with applicable laws</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">4. Disclaimer</h2>
          <p>
            The service is provided "as is" without warranties of any kind. We do not
            guarantee that the service will be uninterrupted or error-free.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">5. Contact</h2>
          <p>
            For questions about these Terms, please contact{' '}
            <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
              support@example.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
} 