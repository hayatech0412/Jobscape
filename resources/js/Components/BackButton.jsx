import CircleBackButtonIcon from '@/Components/Icons/ArrowLeft';
import { Link } from '@inertiajs/react';

export default function BackButton({
    back_url,
    className = '',
    disabled,
    children,
    ...props
}) {
    const handleClick = () => {
        history.back();
    };

    return (
        <span>
            {back_url ? (
                <Link
                    href={back_url}
                    {...props}
                    className={
                        `inline-flex justify-center items-center ` + className
                    }
                    disabled={disabled}
                >
                    <CircleBackButtonIcon />
                </Link>
            ) : (
                <button
                    {...props}
                    className={
                        `inline-flex justify-center items-center ` + className
                    }
                    disabled={disabled}
                    onClick={handleClick}
                >
                    <CircleBackButtonIcon />{children}
                </button>
            )}

        </span>
    );
}
