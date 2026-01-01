import { LegalPageLayout } from '../components/legal/LegalPageLayout';

const sections = [
  {
    title: 'Digital Products',
    body:
      'Due to the nature of digital downloads, all sales are final once files have been delivered. If you encounter a technical issue, we will make it right.',
    items: [
      'File access issues are addressed within 2 business days.',
      'We will replace corrupted or incomplete downloads.',
      'Refunds are evaluated on a case-by-case basis for duplicate purchases.',
    ],
  },
  {
    title: 'Custom Services',
    body:
      'Custom project payments are non-refundable once work has begun. If a project is canceled before work starts, we can issue a full refund.',
  },
  {
    title: 'How to Request Support',
    body:
      'If you believe a refund is warranted, contact us with your order details. Our team will review your request promptly.',
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      title="Refund Policy"
      subtitle="We want you to love your purchase. Here is how refunds and support work for digital goods and services."
      updatedAt="March 1, 2025"
      sections={sections}
    />
  );
}
