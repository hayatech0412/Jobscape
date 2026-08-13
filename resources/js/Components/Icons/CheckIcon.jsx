export default function CheckIcon({ className, color }) {
    return (
        <svg
            className={`h-4 w-4 ${className}`}
            viewBox="0 0 24 24"
            strokeWidth="2"
            fill="none"
            stroke={`${color?color:'currentColor'}`}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {" "}
            <path d="M5 12l5 5l10 -10" />
        </svg>
    );
}
