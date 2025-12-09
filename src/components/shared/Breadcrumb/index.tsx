import Link from 'next/link';
import { Icon } from '@iconify/react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap gap-2 text-sm md:text-base">
        <li>
          <Link
            href="/"
            className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors flex items-center gap-1.5"
            title="Walldot Builders Home"
          >
            <Icon icon="ph:house-fill" width={18} height={18} />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <Icon icon="ph:caret-right" width={14} height={14} className="text-gray-400" />
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                title={item.label}
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

