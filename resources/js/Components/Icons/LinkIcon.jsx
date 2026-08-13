export default function LinkIcon(props) {
    return (
        <svg
            className={`h-${props.height} w-${props.width} ${props.className}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {" "}
            <polyline points="9 18 15 12 9 6" />
        </svg>
    );
}
