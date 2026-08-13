import { Link } from "@inertiajs/react";

export default function CustomCard({ children, title, link_title, link, className }) {
    return (
        <div className={'mt-6 bg-white rounded-lg px-4 md:px-8 pb-4 md:pb-8 pt-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]' + (className ? ' ' + className : '')}>
            {children}
        </div>
    );
}