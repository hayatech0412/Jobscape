import { Link } from "@inertiajs/react";
import LinkIcon from "@/Components/Icons/LinkIcon";
import Card from "../Card";

export default function MypageCard(props) {
    return (
        <Link href={props.url} className="block flex-1">
            <Card isLink={true}>
                <div className="flex-1 px-4 py-4 relative">
                    <div className="font-semibold text-left">
                        {props.cardTitle}
                    </div>
                    <div className="mt-0 text-center">
                        <span className="text-primary text-3xl font-semibold">
                            {props.cardValue}
                        </span>
                        <span className="ml-2 font-semibold">件</span>
                    </div>
                    <LinkIcon
                        width={6}
                        heigh={6}
                        className="text-gray-500 absolute right-0 top-9"
                    />
                </div>
            </Card>
        </Link>
    );
}
