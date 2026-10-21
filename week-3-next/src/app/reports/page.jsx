import PageHeader from '@/components/ui/PageHeader';
import PlaceholderSection from '@/components/ui/PlaceholderSection';

export const metadata = {
  title: 'Reports',
};

/**
 * Reports (/reports) — Server Component
 * Scheduled and on-demand reporting exports.
 */
export default function ReportsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Reports & Exports"
        description="Schedule automated rank tracking reports, download CSV/PDF audits, and set up Slack or email delivery for your stakeholders."
        badge={{ label: 'Phase 5', variant: 'muted' }}
        actions={[
          { label: 'New Report', variant: 'primary', icon: 'plus' },
        ]}
      />

      <PlaceholderSection
        title="Report Builder"
        description="Scheduled PDF/CSV report generation, white-label branding, and stakeholder delivery automation. Built in Phase 5."
        screens={[
          'Report template library (weekly, monthly, campaign)',
          'Custom date-range selection and metric pickers',
          'PDF export with brand-colour theming',
          'Scheduled email and Slack delivery',
          'Shareable public report links with password protection',
          'API webhook delivery for third-party integrations',
        ]}
      />
    </div>
  );
}
