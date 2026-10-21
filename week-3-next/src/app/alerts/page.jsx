import PageHeader from '@/components/ui/PageHeader';
import PlaceholderSection from '@/components/ui/PlaceholderSection';

export const metadata = {
  title: 'Alerts',
};

/**
 * Alerts (/alerts) — Server Component
 * Rank drop and AI Overview change notification rules.
 */
export default function AlertsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Alert Rules & Notifications"
        description="Configure rank drop thresholds, AI Overview appearance/disappearance triggers, and delivery channels for automated SERP monitoring alerts."
        badge={{ label: 'Phase 4', variant: 'warning' }}
        actions={[
          { label: 'Create Alert Rule', variant: 'primary', icon: 'bell' },
        ]}
      />

      <PlaceholderSection
        title="Alert Configuration Centre"
        description="Granular alert rules per keyword, delivery channels (email, Slack, webhook), and snooze controls. Built in Phase 4."
        screens={[
          'Alert rule builder (keyword × threshold × channel)',
          'Rank drop severity tiers (critical / warning / info)',
          'AI Overview emergence and disappearance triggers',
          'Email and Slack delivery channel configuration',
          'Webhook payload format designer',
          'Alert history and acknowledgement log',
        ]}
      />
    </div>
  );
}
