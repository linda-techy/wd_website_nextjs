import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface EstimationLineItem {
  lineType: string;
  description: string;
  quantity?: number;
  unit?: string;
  unitRate?: number;
  amount: number;
  displayOrder: number;
}

interface SubResource {
  id: string;
  label: string;
  description?: string;
  percentage?: number;
}

interface PublicEstimation {
  id: string;
  estimationNo: string;
  projectType: string;
  status: string;
  subtotal: number | null;
  discountAmount: number | null;
  gstAmount: number | null;
  grandTotal: number;
  validUntil: string;
  createdAt: string;
  lineItems: EstimationLineItem[];
  inclusions: SubResource[];
  exclusions: SubResource[];
  assumptions: SubResource[];
  paymentMilestones: SubResource[];
  // K — two-mode quotations.
  pricingMode?: 'BUDGETARY' | 'LINE_ITEM';
  estimatedAreaSqft?: number | null;
  grandTotalMin?: number | null;
  grandTotalMax?: number | null;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

async function fetchEstimation(token: string): Promise<PublicEstimation | null> {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';
  try {
    const res = await fetch(`${apiBase}/public/estimations/${token}`, {
      cache: 'no-store', // always fetch fresh — token may have been rotated
    });
    if (!res.ok) return null;
    const json: ApiResponse<PublicEstimation> = await res.json();
    if (!json.success || !json.data) return null;
    return json.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }): Promise<Metadata> {
  const { token } = await params;
  const est = await fetchEstimation(token);
  if (!est) return { title: 'Estimation not found · Walldot Builders' };
  const desc =
    est.pricingMode === 'BUDGETARY' && est.grandTotalMin != null && est.grandTotalMax != null
      ? `${est.projectType} budgetary estimate, range ₹${est.grandTotalMin.toLocaleString('en-IN')}–₹${est.grandTotalMax.toLocaleString('en-IN')}`
      : `${est.projectType} estimation, total ₹${est.grandTotal.toLocaleString('en-IN')}`;
  return {
    title: `Estimation ${est.estimationNo} · Walldot Builders`,
    description: desc,
    robots: 'noindex, nofollow', // share-link tokens shouldn't be indexed
  };
}

export default async function EstimationPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const est = await fetchEstimation(token);
  if (!est) notFound();

  const fmtINR = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(n);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6 text-gray-900">
      {/* Header */}
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold">Walldot Builders</h1>
        <p className="text-sm text-gray-600 mt-1">
          Estimation <span className="font-mono font-semibold">{est.estimationNo}</span>
          {' · '}
          <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${statusBadgeClass(est.status)}`}>
            {est.status}
          </span>
        </p>
        <p className="text-sm text-gray-600">
          Generated {new Date(est.createdAt).toLocaleDateString('en-IN')} ·{' '}
          Valid until {new Date(est.validUntil).toLocaleDateString('en-IN')}
        </p>
      </header>

      {/* Project type + mode pill */}
      <section className="flex items-center gap-3">
        <p className="text-sm">Project type: <span className="font-semibold">{est.projectType}</span></p>
        {est.pricingMode === 'BUDGETARY' && (
          <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-slate-200 text-slate-700">
            Budgetary
          </span>
        )}
      </section>

      {est.pricingMode === 'BUDGETARY' ? (
        /* Budgetary mode — show area + range, no line items */
        <section className="bg-blue-50 border border-blue-200 rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Budgetary estimate</h2>
          <p className="text-sm">
            Estimated buildable area:{' '}
            <span className="font-semibold">
              {est.estimatedAreaSqft != null ? `${est.estimatedAreaSqft.toLocaleString('en-IN')} sqft` : '—'}
            </span>
          </p>
          <p className="text-xs text-gray-600 mt-2">
            This is a lead-stage estimate. The final figure is finalised as a detailed quotation
            once architectural drawings are agreed.
          </p>
        </section>
      ) : (
        /* Line-item table */
        <section>
          <h2 className="text-xl font-semibold mb-2">Line items</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-2 px-3 border">Description</th>
                  <th className="text-right py-2 px-3 border w-16">Qty</th>
                  <th className="text-left py-2 px-3 border w-16">Unit</th>
                  <th className="text-right py-2 px-3 border w-24">Rate</th>
                  <th className="text-right py-2 px-3 border w-32">Amount</th>
                </tr>
              </thead>
              <tbody>
                {est.lineItems.sort((a, b) => a.displayOrder - b.displayOrder).map((li, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2 px-3 border">{li.description}</td>
                    <td className="py-2 px-3 border text-right">{li.quantity ?? ''}</td>
                    <td className="py-2 px-3 border">{li.unit ?? ''}</td>
                    <td className="py-2 px-3 border text-right">{li.unitRate != null ? fmtINR(li.unitRate) : ''}</td>
                    <td className="py-2 px-3 border text-right">{fmtINR(li.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Sub-resources — only rendered when non-empty */}
      <SubResourceSection title="Inclusions" items={est.inclusions} />
      <SubResourceSection title="Exclusions" items={est.exclusions} />
      <SubResourceSection title="Assumptions" items={est.assumptions} />

      {/* Payment milestones */}
      {est.paymentMilestones.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Payment milestones</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-2 px-3 border w-12">#</th>
                  <th className="text-left py-2 px-3 border">Milestone</th>
                  <th className="text-right py-2 px-3 border w-24">%</th>
                </tr>
              </thead>
              <tbody>
                {est.paymentMilestones.map((m, i) => (
                  <tr key={m.id} className="border-b">
                    <td className="py-2 px-3 border">{i + 1}</td>
                    <td className="py-2 px-3 border">
                      {m.label}
                      {m.description && <div className="text-xs text-gray-500">{m.description}</div>}
                    </td>
                    <td className="py-2 px-3 border text-right">{m.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Totals — branched on pricingMode */}
      {est.pricingMode === 'BUDGETARY' && est.grandTotalMin != null && est.grandTotalMax != null ? (
        <section className="border-t pt-4 space-y-1 text-sm">
          <div className="flex justify-between text-lg font-bold pt-2 mt-2 text-green-800">
            <span>Estimated range (incl. GST)</span>
            <span className="font-mono">
              {fmtINR(est.grandTotalMin)} – {fmtINR(est.grandTotalMax)}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Range = (area × base rate) ±10%, GST applied. Final figure available after detailed estimate.
          </p>
        </section>
      ) : (
        <section className="border-t pt-4 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono">{fmtINR(est.subtotal ?? 0)}</span>
          </div>
          {(est.discountAmount ?? 0) > 0 && (
            <div className="flex justify-between text-red-600">
              <span>Discount</span>
              <span className="font-mono">−{fmtINR(est.discountAmount ?? 0)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>GST</span>
            <span className="font-mono">{fmtINR(est.gstAmount ?? 0)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2 text-green-800">
            <span>Grand total</span>
            <span className="font-mono">{fmtINR(est.grandTotal)}</span>
          </div>
        </section>
      )}

      <footer className="border-t pt-4 text-xs text-gray-500">
        This estimation is valid until {new Date(est.validUntil).toLocaleDateString('en-IN')}.
        Prices subject to soil-test report and final design freeze.
      </footer>
    </main>
  );
}

function SubResourceSection({ title, items }: { title: string; items: SubResource[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <ul className="list-disc list-inside space-y-1 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <span className="font-medium">{item.label}</span>
            {item.description && <span className="text-gray-600"> — {item.description}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

function statusBadgeClass(status: string): string {
  switch (status) {
    case 'DRAFT':    return 'bg-gray-200 text-gray-700';
    case 'SENT':     return 'bg-blue-100 text-blue-800';
    case 'ACCEPTED': return 'bg-green-100 text-green-800';
    case 'REJECTED': return 'bg-red-100 text-red-800';
    default:         return 'bg-gray-200 text-gray-700';
  }
}
