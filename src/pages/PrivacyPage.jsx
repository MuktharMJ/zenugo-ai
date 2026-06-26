import './LegalPages.css';

function PrivacyPage() {
  const lastUpdated = "August 15, 2026";

  return (
    <div className="legal-page">
      <div className="container">
        <header className="legal-page__header animate-fade-in-up">
          <span className="section-label">Legal</span>
          <h1 className="legal-page__title">Privacy Policy</h1>
          <p className="legal-page__subtitle">
            Last updated: {lastUpdated}
          </p>
        </header>

        <div className="legal-page__content animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Zenugo AI. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul>
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
            <li><strong>Usage Data:</strong> includes information about how you use our website, AI chat interface, and services.</li>
            <li><strong>Conversation Data:</strong> includes chat history and prompts submitted to the AI for the purpose of personalized wellness guidance.</li>
          </ul>

          <h2>3. Data Security & Storage</h2>
          <p>
            We have put in place appropriate security measures, including enterprise-grade encryption, to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. Your data is securely stored within our MongoDB database instances.
          </p>

          <h2>4. Third-Party AI Providers</h2>
          <p>
            To provide you with state-of-the-art responses, Zenugo AI processes your prompts via OpenRouter, utilizing leading AI models such as OpenAI, DeepSeek, and Gemini. By using our services, you acknowledge that your prompts (stripped of direct personal identifiers where possible) may be transmitted to these third-party services for inference. We do not sell your conversation data to advertisers.
          </p>

          <h2>5. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Specifically, we use HTTP-only cookies to securely manage your authentication sessions.
          </p>

          <h2>6. Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, or restriction of your data. You may delete your account and all associated conversation history at any time through your account settings.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at: <strong>mjmukthar96@gmail.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPage;
