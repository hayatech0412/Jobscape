export default function InputLabel({
    value,
    className = '',
    children,
    type,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-normal text-gray-700 ` +
                className
            }
        >
            {value ? value : children}
            
            {type === '必須' && (
                <span className="ml-2 rounded-sm text-[10px] leading-none px-2 py-[3px] bg-red-500 text-white">*必須</span>
            )}

            {type === '任意' && (
                <span className="ml-2 rounded-sm text-[10px] leading-none px-2 py-[3px] bg-gray-500 text-white">任意</span>
            )}
        </label>
    );
}
