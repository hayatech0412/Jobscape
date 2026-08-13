export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-[12px] text-red-600 ' + className}
        >
            {message}
        </p>
    ) : null;
}
