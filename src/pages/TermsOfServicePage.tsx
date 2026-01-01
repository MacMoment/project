import { LegalPageLayout } from '../components/legal/LegalPageLayout';

const sections = [
  {
    title: 'Using Our Products',
    body:
      'Academy Studios licenses digital assets for personal and commercial use as described in each product listing. You may not resell or redistribute original files.',
  },
  {
    title: 'Custom Projects',
    body:
      'Custom service timelines and deliverables are confirmed via email. Project scope changes may affect pricing and delivery dates.',
    items: [
      'A written summary of scope will be provided before work begins.',
      'Revisions are limited to the scope agreed upon in writing.',
      'Final files are delivered digitally unless otherwise noted.',
    ],
  },
  {
    title: 'Payments',
    body:
      'Payments are due at checkout for digital products and according to the schedule specified for custom services. All prices are listed in USD unless stated otherwise.',
  },
  {
    title: 'Accountability',
    body:
      'We strive to keep our services reliable and secure. Academy Studios is not liable for indirect damages arising from the use of our products or services.',
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      subtitle="These terms outline the rules and expectations for using Academy Studios products and services."
      updatedAt="March 1, 2025"
      sections={sections}
    />
  );
}
