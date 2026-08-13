import { useRef, useState } from "react";
import InputError from "../InputError";

export default function MasterForm(props) {
    console.log(props.info.card_back)
    const [isFrontSelected, setIsFrontSelected] = useState(
        props.info.card_front !== null && props.info.card_front !== ""
    );
    const [isBackSelected, setIsBackSelected] = useState(
        props.info.card_back !== null && props.info.card_back !== ""
    );

    const frontRef = useRef();
    const backRef = useRef();

    const selectFile = (e) => {
        if (e.target.name === "card_front") {
            frontRef.current.click();
        } else {
            backRef.current.click();
        }
    };

    const handleSelectFile = (e) => {
        const { name } = e.target;

        if (name === "card_front") {
            setIsFrontSelected(true);
        } else if (name === "card_back") {
            setIsBackSelected(true);
        }

        props.onSelectedFile(e);
    };

    const deleteFile = (e) => {
        props.onDeletedFile(e);
    };

    const handleInputChange = (e) => {
        props.onInputChange(e);
    };

    return (
        props.info && (
            <div>
                <p
                    className={`mt-8 text-[13px] font-semibold ${
                        props.disabled ? "text-gray-400" : ""
                    }`}
                >
                    管理者{props.index + 1}
                </p>

                <div className="flex flex-wrap items-center justify-between lg:gap-4">
                    <div className="mt-3 lg:flex-1 w-full">
                        <label
                            htmlFor="first_name"
                            className={`text-[12px] block font-bold mb-1 ${
                                props.disabled
                                    ? "text-gray-400"
                                    : "text-gray-700"
                            }`}
                        >
                            姓
                        </label>

                        <input
                            name="first_name"
                            className={`appearance-none border rounded w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline ${
                                props.disabled
                                    ? "text-gray-400 border-gray-200 placeholder-gray-300"
                                    : "text-gray-700 border-gray-300"
                            }`}
                            data={props.index}
                            value={props.info.first_name || ""}
                            onChange={handleInputChange}
                            onInput={handleInputChange}
                            disabled={props.disabled}
                            placeholder="例：山田"
                        />
                        {props.inputStatus > 0 &&
                            props.inputStatus < 11111111 &&
                            props.inputStatus & 1 && (
                                <InputError
                                    message="姓を入力してください。"
                                    className="mt-1 text-[12px]"
                                />
                            )}
                    </div>
                    <div className="mt-3 lg:flex-1 w-full">
                        <label
                            htmlFor="last_name"
                            className={`text-[12px] block font-bold mb-1 ${
                                props.disabled
                                    ? "text-gray-400"
                                    : "text-gray-700"
                            }`}
                        >
                            名
                        </label>

                        <input
                            name="last_name"
                            className={`appearance-none border rounded w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline ${
                                props.disabled
                                    ? "text-gray-400 border-gray-200 placeholder-gray-300"
                                    : "text-gray-700 border-gray-300"
                            }`}
                            data={props.index}
                            value={props.info.last_name || ""}
                            onChange={handleInputChange}
                            onInput={handleInputChange}
                            disabled={props.disabled}
                            placeholder="例：太郎"
                        />
                        {props.inputStatus > 0 &&
                            props.inputStatus < 11111111 &&
                            props.inputStatus & 10 && (
                                <InputError
                                    message="名を入力してください。"
                                    className="mt-1 text-[12px]"
                                />
                            )}
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between lg:gap-4">
                    <div className="mt-3 lg:flex-1 w-full">
                        <label
                            htmlFor="first_kana"
                            className={`text-[12px] block font-bold mb-1 ${
                                props.disabled
                                    ? "text-gray-400"
                                    : "text-gray-700"
                            }`}
                        >
                            姓カナ
                        </label>

                        <input
                            name="first_kana"
                            className={`appearance-none border rounded w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline ${
                                props.disabled
                                    ? "text-gray-400 border-gray-200 placeholder-gray-300"
                                    : "text-gray-700 border-gray-300"
                            }`}
                            data={props.index}
                            value={props.info.first_kana || ""}
                            onChange={handleInputChange}
                            onInput={handleInputChange}
                            disabled={props.disabled}
                            placeholder="例：ヤマダ"
                        />
                        {props.inputStatus > 0 &&
                            props.inputStatus < 11111111 &&
                            props.inputStatus & 100 && (
                                <InputError
                                    message="姓カナを入力してください。"
                                    className="mt-1 text-[12px]"
                                />
                            )}
                    </div>
                    <div className="mt-3 lg:flex-1 w-full">
                        <label
                            htmlFor="last_kana"
                            className={`text-[12px] block font-bold mb-1 ${
                                props.disabled
                                    ? "text-gray-400"
                                    : "text-gray-700"
                            }`}
                        >
                            名カナ
                        </label>

                        <input
                            name="last_kana"
                            className={`appearance-none border rounded w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline ${
                                props.disabled
                                    ? "text-gray-400 border-gray-200 placeholder-gray-300"
                                    : "text-gray-700 border-gray-300"
                            }`}
                            data={props.index}
                            value={props.info.last_kana || ""}
                            onChange={handleInputChange}
                            onInput={handleInputChange}
                            disabled={props.disabled}
                            placeholder="例：タロウ"
                        />
                        {props.inputStatus > 0 &&
                            props.inputStatus < 11111111 &&
                            props.inputStatus & 1000 && (
                                <InputError
                                    message="名カナを入力してください。"
                                    className="mt-1 text-[12px]"
                                />
                            )}
                    </div>
                </div>

                <div className="mt-3">
                    <label
                        htmlFor="phone_number"
                        className={`text-[12px] block font-bold mb-1 ${
                            props.disabled ? "text-gray-400" : "text-gray-700"
                        }`}
                    >
                        電話番号
                    </label>

                    <input
                        name="phone_number"
                        className={`appearance-none border rounded w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline ${
                            props.disabled
                                ? "text-gray-400 border-gray-200 placeholder-gray-300"
                                : "text-gray-700 border-gray-300"
                        }`}
                        data={props.index}
                        value={props.info.phone_number || ""}
                        onChange={handleInputChange}
                        disabled={props.disabled}
                        placeholder="例：0345678910"
                    />
                    <p
                        className={`text-[12px] mt-1 ${
                            props.disabled ? "text-gray-400" : ""
                        }`}
                    >
                        ハイフンなしで入力してください
                    </p>
                    {props.inputStatus > 0 &&
                        props.inputStatus < 11111111 &&
                        props.inputStatus & 10000 && (
                            <InputError
                                message="法人代表電話番号を入力してください。"
                                className="mt-1 text-[12px]"
                            />
                        )}
                </div>

                <div className="mt-3">
                    <label
                        htmlFor="email"
                        className={`text-[12px] block font-bold mb-1 ${
                            props.disabled ? "text-gray-400" : "text-gray-700"
                        }`}
                    >
                        メールアドレス
                    </label>

                    <input
                        type="email"
                        name="email"
                        className={`appearance-none border rounded w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline ${
                            props.disabled
                                ? "text-gray-400 border-gray-200 placeholder-gray-300"
                                : "text-gray-700 border-gray-300"
                        }`}
                        data={props.index}
                        value={props.info.email || ""}
                        onChange={handleInputChange}
                        onInput={handleInputChange}
                        disabled={props.disabled}
                        placeholder="例：jobscape@jobscape.com"
                    />
                    {props.inputStatus > 0 &&
                        props.inputStatus < 11111111 &&
                        props.inputStatus & 100000 && (
                            <InputError
                                message="メールアドレスを入力してください。"
                                className="mt-1 text-[12px]"
                            />
                        )}
                </div>

                <div className="mt-6">
                    <p
                        className={`text-[12px] mt-3 ${
                            props.disabled ? "text-gray-400" : ""
                        }`}
                    >
                        名刺の添付（表）
                        {!isFrontSelected && (
                            <>
                                <button
                                    type="button"
                                    name="card_front"
                                    className={`border  mx-2 px-2 py-1 rounded-full ${
                                        props.disabled
                                            ? "border-blue-300 disabled:cursor-not-allowed"
                                            : "border-primary hover:bg-primary hover:text-white hover:font-semibold"
                                    }`}
                                    disabled={props.disabled}
                                    onClick={selectFile}
                                >
                                    ファイルの選択
                                </button>
                                <span className="text-gray-400">4MBまで</span>
                            </>
                        )}
                        {isFrontSelected && (
                            <>
                                <span className="ml-2">
                                    {props.info.card_front}
                                </span>
                                <button
                                    type="button"
                                    name="card_front"
                                    data={props.index}
                                    className={`border mx-2 px-3 py-1 rounded-full  ${
                                        props.disabled
                                            ? "border-red-300 text-red-300 disabled:cursor-not-allowed"
                                            : "border-red-700 text-red-700 hover:bg-red-700 hover:text-white hover:font-semibold"
                                    }`}
                                    disabled={props.disabled}
                                    onClick={deleteFile}
                                >
                                    削除
                                </button>
                            </>
                        )}
                    </p>

                    {props.inputStatus > 0 &&
                        props.inputStatus < 11111111 &&
                        props.inputStatus & 1000000 && (
                            <InputError
                                message="名刺の添付（表）を選択してください。"
                                className="mt-1 text-[12px]"
                            />
                        )}

                    <input
                        type="file"
                        name="card_front"
                        data={props.index}
                        ref={frontRef}
                        onChange={handleSelectFile}
                        className="hidden"
                    />
                </div>

                <div className="mt-3">
                    <p
                        className={`text-[12px] mt-3 ${
                            props.disabled ? "text-gray-400" : ""
                        }`}
                    >
                        名刺の添付（裏）
                        {!isBackSelected && (
                            <>
                                <button
                                    type="button"
                                    name="card_back"
                                    className={`border  mx-2 px-2 py-1 rounded-full ${
                                        props.disabled
                                            ? "border-blue-300 disabled:cursor-not-allowed"
                                            : "border-primary hover:bg-primary hover:text-white hover:font-semibold"
                                    }`}
                                    disabled={props.disabled}
                                    onClick={selectFile}
                                >
                                    ファイルの選択
                                </button>
                                <span className="text-gray-400">4MBまで</span>
                            </>
                        )}
                        {isBackSelected && (
                            <>
                                <span className="ml-2">
                                    {props.info.card_back}
                                </span>
                                <button
                                    type="button"
                                    name="card_back"
                                    data={props.index}
                                    className={`border mx-2 px-3 py-1 rounded-full  ${
                                        props.disabled
                                            ? "border-red-300 text-red-300 disabled:cursor-not-allowed"
                                            : "border-red-700 text-red-700 hover:bg-red-700 hover:text-white hover:font-semibold"
                                    }`}
                                    disabled={props.disabled}
                                    onClick={deleteFile}
                                >
                                    削除
                                </button>
                            </>
                        )}
                    </p>

                    {props.inputStatus > 0 &&
                        props.inputStatus < 11111111 &&
                        props.inputStatus & 10000000 && (
                            <InputError
                                message="名刺の添付（裏）を選択してください。"
                                className="mt-1 text-[12px]"
                            />
                        )}

                    <input
                        type="file"
                        name="card_back"
                        data={props.index}
                        ref={backRef}
                        onChange={handleSelectFile}
                        className="hidden"
                    />
                </div>
            </div>
        )
    );
}
