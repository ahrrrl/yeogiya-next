import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CarouselArrowProps {
  direction?: 'prev' | 'next';
  className?: string;
  color?: string;
  onClick?: () => void;
}

export default function CarouselArrow({
  direction = 'prev',
  className,
  onClick,
  color = 'white',
}: CarouselArrowProps) {
  const ariaLabel = direction === 'prev' ? '왼쪽 화살표' : '오른쪽 화살표';

  return (
    <button className={className} onClick={onClick} aria-label={ariaLabel}>
      {direction === 'prev' ? (
        <ChevronLeftIcon color={color} />
      ) : (
        <ChevronRightIcon color={color} />
      )}
    </button>
  );
}
