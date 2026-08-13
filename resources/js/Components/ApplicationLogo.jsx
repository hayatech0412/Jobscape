export default function ApplicationLogo({
    myClass
}) {
    return (
        <div className={`${myClass} flex items-center gap-2 mr-4`}>
            <img 
                src="/assets/images/user_logo.png" 
                className="block min-w-5 w-5 object-cover"
                alt="Application Logo" />
            <div className="hidden md:block text-xl tracking-wide leading-none">JOBSCAPE</div>
        </div>
    );
}
