'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import styles from './SearchBar.module.scss';

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('keyword', term);
    } else {
      params.delete('keyword');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className={styles.searchContainer}>
      <label htmlFor='search' className={styles.srOnly}>
        Search
      </label>
      <input
        id='search'
        className={styles.input}
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('keyword')?.toString()}
      />
      <MagnifyingGlassIcon className={styles.icon} />
    </div>
  );
}
