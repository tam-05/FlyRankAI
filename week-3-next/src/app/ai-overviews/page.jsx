import PageHeader from '@/components/ui/PageHeader';
import PlaceholderSection from '@/components/ui/PlaceholderSection';

export const metadata = {
  title: 'AI Overviews',
};

/**
 * AI Overviews (/ai-overviews) — Server Component
 * Tracks Google Gemini / SGE snippet citations and answer box ownership.
 */
export default function AiOverviewsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="AI Overview Intelligence"
        description="Track Google Gemini AI Overviews, Search Generative Experience (SGE) snippet ownership, and LLM citation rates across your domain portfolio."
        badge={{ label: 'Phase 4', variant: 'warning' }}
      />

      <PlaceholderSection
        title="Generative Answer Monitoring"
        description="AI Overview citation analysis panel with snapshot diffing, emerging topic detection, and automatic source attribution tracking. Built in Phase 4."
        screens={[
          'Google AI Overview presence/absence per keyword',
          'Gemini answer snippet full-text capture and versioning',
          'Citation source domain list with ownership rate',
          'Historical AI Overview appearance frequency heatmap',
          'Competitor citation comparison matrix',
          'Alert rules: notify when AI Overview appears or disappears',
        ]}
      />
    </div>
  );
}
