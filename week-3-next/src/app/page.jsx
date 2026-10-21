import { Suspense } from 'react';
import MetricCardGrid from '@/components/dashboard/MetricCardGrid';
import RankMomentumTable from '@/components/dashboard/RankMomentumTable';
import PageHeader from '@/components/ui/PageHeader';
import SkeletonGrid from '@/components/ui/SkeletonGrid';

export const metadata = {
  title: 'Dashboard',
};

/**
 * Dashboard (/) — Server Component
 * Data is fetched server-side; no useState/useEffect needed here.
 */
export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Performance Overview"
        description="Real-time organic ranking telemetry and AI Overview citation rates across your tracked keyword portfolio."
        badge={{ label: 'Live', variant: 'success' }}
      />

      {/* KPI metric cards — Suspense boundary while server fetches */}
      <Suspense fallback={<SkeletonGrid cols={4} rows={1} />}>
        <MetricCardGrid />
      </Suspense>

      {/* Rank movement table */}
      <section>
        <h2 className="text-base font-semibold text-slate-200 mb-4">
          Top Keyword Rank Movements
        </h2>
        <Suspense fallback={<SkeletonGrid cols={1} rows={6} />}>
          <RankMomentumTable />
        </Suspense>
      </section>
    </div>
  );
}
