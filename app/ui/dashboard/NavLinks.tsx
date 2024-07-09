'use client';

import {
  HomeIcon,
  DocumentDuplicateIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavLinks.module.scss';

const links = [
  { name: '구경하기', href: '/dashboard', icon: HomeIcon },
  {
    name: '예약확인',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  {
    name: '등록하기',
    href: '/dashboard/customers',
    icon: ClipboardDocumentCheckIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`${styles.link} ${isActive ? styles.active : ''}`}
          >
            <LinkIcon className={styles['link-icon']} />
            <p className={styles['link-text']}>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
