type LegalSection = {
  title: string;
  body: string;
  items?: string[];
};

type LegalPageLayoutProps = {
  title: string;
  subtitle: string;
  updatedAt: string;
  sections: LegalSection[];
};

export function LegalPageLayout({
  title,
  subtitle,
  updatedAt,
  sections,
}: LegalPageLayoutProps) {
  return (
    <section className="bg-gray-50 py-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-purple-500 font-semibold mb-4">
            Legal
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          <p className="text-sm text-gray-400 mt-4">Last updated: {updatedAt}</p>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <article
              key={section.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{section.body}</p>
              {section.items && (
                <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
