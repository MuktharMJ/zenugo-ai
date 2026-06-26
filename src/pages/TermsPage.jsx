import './LegalPages.css';

function TermsPage() {
  const lastUpdated = "August 15, 2026";

  return (
    <div className="legal-page">
      <div className="container">
        <header className="legal-page__header animate-fade-in-up">
          <span className="section-label">Legal</span>
          <h1 className="legal-page__title">Terms of Service</h1>
          <p className="legal-page__subtitle">
            Last updated: {lastUpdated}
          </p>
        </header>

        <div className="legal-page__content animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Zenugo AI ("Service", "we", "us", or "our"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.
          </p>

          <h2>2. Medical Disclaimer & AI Limitations</h2>
          <p>
            <strong>Zenugo AI is NOT a healthcare provider.</strong> The Service uses artificial intelligence to generate responses based on user input. All information, guidance, and content provided by Zenugo AI is for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. 
          </p>
          <p>
            Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on Zenugo AI.
          </p>

          <h2>3. User Responsibilities & Acceptable Use</h2>
          <p>
            You agree not to use the Service:
          </p>
          <ul>
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
            <li>To generate or disseminate malicious, hateful, or abusive content.</li>
            <li>To attempt to bypass any security mechanisms or to interfere with the proper working of the Service.</li>
          </ul>

          <h2>4. Account Security</h2>
          <p>
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall Zenugo AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
          </p>

          <h2>6. Service Availability</h2>
          <p>
            We strive to ensure high availability, but the Service is provided on an "AS IS" and "AS AVAILABLE" basis. We reserve the right to withdraw or amend our Service, and any service or material we provide, in our sole discretion without notice.
          </p>

          <h2>7. Contact Information</h2>
          <p>
            For any questions about these Terms, please contact us at: <strong>mjmukthar96@gmail.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
