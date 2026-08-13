import { useState } from "react";
import TrashCanIcon from "../Icons/TrashCanIcon";

export default function ImageSelect(props) {
    const [isShowTrash, setIsShowTrash] = useState(false);

    const handleShowTrashButton = (isShow) => {
        setIsShowTrash(isShow);
    };

    return (
        <div
            className="border rounded-sm aspect-3/2 object-fill relative"
            onMouseOver={() => handleShowTrashButton(true)}
            onMouseOut={() => handleShowTrashButton(false)}
        >
            {props.image_file && (
                <>
                    {props.image_file !== undefined && (
                        <img
                            src={URL.createObjectURL(props.image_file)}
                            alt="Main product"
                            className="w-full h-full object-contain"
                        />
                    )}
                    {isShowTrash && (
                        <button
                            type="button"
                            name="image"
                            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[14px]"
                            onClick={(e) => props.handleClickDelete()}
                        >
                            <TrashCanIcon className="w-full hover:fill-[#333333]" />
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
