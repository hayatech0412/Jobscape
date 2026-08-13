export default function ArrowIcon({ className, size, color }) {
    return (
    <svg className={`w-${size? size:6} h-${size? size:6} text-gray-800 dark:text-white  ${className}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke={color ? color:'currentColor'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v13m0-13 4 4m-4-4-4 4"/>
    </svg>
    );
}
