import PageHeader from '@/components/ui/PageHeader';
import PlaceholderSection from '@/components/ui/PlaceholderSection';

export const metadata = {
  title: 'Keywords',
};

/**
 * Keywords (/keywords) — Server Component
 * Placeholder for the full keyword tracking table (to be built in Phase 4).
 */
export default function KeywordsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Keyword Tracking"
        description="Monitor organic SERP positions, rank velocity, and visibility scores across Google, Bing, and Perplexity."
        badge={{ label: 'Phase 4', variant: 'warning' }}
        actions={[
          { label: 'Add Keyword', variant: 'primary', icon: 'plus' },
          { label: 'Import CSV', variant: 'secondary', icon: 'upload' },
        ]}
      />

      <PlaceholderSection
        title="SERP Keyword Database"
        description="Interactive keyword table with live search, multi-criteria filters (Intent, Engine, AI Status, Trend), bidirectional column sorting, and CSV export. Built in Phase 4."
        screens={[
          'Live query search across keywords and landing URLs',
          'Filter: Search Intent (Informational, Commercial, Transactional, Navigational)',
          'Filter: AI Overview Status (Won, Cited, Absent)',
          'Filter: Rank Trend (Gained, Dropped, Top 3, Top 10)',
          'Bidirectional sort: Rank, Change, Volume, Keyword Name',
          'Row actions: Inspect AI Overview, Manual Recrawl, Delete',
        ]}
      />
    </div>
  );
}
