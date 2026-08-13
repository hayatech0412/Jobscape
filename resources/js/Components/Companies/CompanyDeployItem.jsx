import { useEffect, useState } from "react";
import TrashCanIcon from "../Icons/TrashCanIcon";

export default function CompanyDeployItem(props) {
    const handleInputChange = (e) => {
        props.onChange(e);
    };

    const handleClickDelete = (e) => {
        props.onDestroy(e);
    };

    return (
        <div className="w-full relative">
            <input
                type="text"
                name="name"
                index={props.index}
                value={props.value ?? ""}
                onChange={handleInputChange}
                className="w-full p-2 pl-4 border border-gray-300 rounded"
            />
            <button
                type="button"
                className={`absolute top-1/2 -right-6 -translate-y-1/2 w-[14px] ${
                    props.isLast
                        ? "disabled:cursor-not-allowed disabled:opacity-50"
                        : ""
                }`}
                index={props.index}
                onClick={handleClickDelete}
                disabled={props.isLast}
            >
                <TrashCanIcon className="w-full hover:fill-[#333333]" />
            </button>
        </div>
    );
}
