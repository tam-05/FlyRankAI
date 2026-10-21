import PageHeader from '@/components/ui/PageHeader';
import PlaceholderSection from '@/components/ui/PlaceholderSection';

export const metadata = {
  title: 'Settings',
};

/**
 * Settings (/settings) — Server Component
 * Project configuration: domains, crawl schedule, API keys, team.
 */
export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Project Settings"
        description="Configure target domains, crawl frequency schedules, API integration keys, AI Overview monitoring scope, and team access roles."
        badge={{ label: 'Phase 4', variant: 'warning' }}
      />

      <PlaceholderSection
        title="Settings Panel"
        description="Full project configuration with validated forms for crawl configuration, API keys, and team management. Built in Phase 4 using CLAUDE.md validation rules."
        screens={[
          'Project name and target domain management',
          'Crawl frequency: daily / weekly / monthly per keyword',
          'Search engine scope: Google, Bing, Perplexity',
          'AI Overview monitoring toggle with snapshot frequency',
          'Custom Search API key (masked, validated fk_... format)',
          'Team member invite and role assignment (Admin, Editor, Viewer)',
        ]}
      />
    </div>
  );
}
