export default function NotificationBadge({number}) {
    return (
        <span className='absolute top-[-3px] right-[-3px] w-[16px] h-[16px] flex justify-center items-center bg-red-600 text-white text-xs rounded-full'>
            {number}
        </span>
    );
}