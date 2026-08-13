export default function AngleIcon({ className, size, color }) {
    return (<svg className={`w-${size? size:6} h-${size? size:6} text-gray-800 ${className}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke={color?color:'currentColor'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"/>
      </svg>
    );
}
