export default function CheckOutlineCircleIcon({color, size, fill, className}) {
    return (
        <svg className={`w-${size ? size: 6} h-${size ? size: 6} text-gray-800 dark:text-white ${className}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill={fill?fill: 'none'} viewBox="0 0 24 24">
            <path
                stroke={color ? color : "currentColor"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
    );
}
