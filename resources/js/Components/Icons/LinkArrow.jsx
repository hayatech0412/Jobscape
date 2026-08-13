export default function LinkArrow(props) {
    return (
        <svg
            className={"h-4 w-4 " + props.className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
        </svg>
    );
}
