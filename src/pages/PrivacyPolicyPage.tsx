import { LegalPageLayout } from '../components/legal/LegalPageLayout';

const sections = [
  {
    title: 'Information We Collect',
    body:
      'We collect the information you provide when placing orders, requesting custom work, or contacting support. This includes your name, email address, and order details.',
    items: [
      'Contact information such as name and email address.',
      'Order details and service preferences.',
      'Usage data to understand site performance and improve the experience.',
    ],
  },
  {
    title: 'How We Use Your Data',
    body:
      'We use your information to fulfill orders, respond to inquiries, and provide updates about your purchases. We also analyze aggregated usage patterns to improve our services.',
  },
  {
    title: 'Data Sharing',
    body:
      'We only share data with trusted service providers necessary to run the site, process orders, or deliver digital products. We never sell your personal information.',
  },
  {
    title: 'Your Choices',
    body:
      'You can request access, corrections, or deletion of your data by contacting our support team. Marketing emails always include an unsubscribe option.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="Your privacy matters to us. This policy explains what we collect, why we collect it, and how you can manage your data."
      updatedAt="March 1, 2025"
      sections={sections}
    />
  );
}
