type ArrowIconProps = {
  className?: string;
};

export function ArrowIcon({ className = "size-4" }: ArrowIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.86154 12L10.7692 6.09231V11.3846H12V4H4.61538V5.23077H9.90769L4 11.1385L4.86154 12Z"
        fill="currentColor"
      />
    </svg>
  );
}
