import PageHeader from '@/components/ui/PageHeader';
import PlaceholderSection from '@/components/ui/PlaceholderSection';

export const metadata = {
  title: 'Competitors',
};

/**
 * Competitors (/competitors) — Server Component
 * SERP visibility benchmarking against tracked competitor domains.
 */
export default function CompetitorsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Competitor SERP Benchmark"
        description="Compare organic visibility, keyword overlap, AI Overview citation share, and position gap analysis against tracked competitor domains."
        badge={{ label: 'Phase 5', variant: 'muted' }}
        actions={[
          { label: 'Add Competitor', variant: 'primary', icon: 'plus' },
        ]}
      />

      <PlaceholderSection
        title="Competitor Analysis Workspace"
        description="Side-by-side visibility comparison, keyword gap analysis, and AI Overview citation share benchmarking. Built in Phase 5."
        screens={[
          'Competitor domain portfolio management',
          'Keyword overlap and gap visualisation',
          'AI Overview citation share by domain',
          'Organic visibility score trend lines',
          'Top-10 rank distribution comparison',
          'Automated weekly competitive intelligence digest',
        ]}
      />
    </div>
  );
}
