import { useEffect, useState } from "react";
import TrashCanIcon from "../Icons/TrashCanIcon";

export default function FaqItemInput(props) {
    return (
        <>
            <div className="flex md:flex-row flex-col items-center justify-start gap-2">
                <div className="md:w-[80px] w-full relative">
                    <p>質問内容</p>
                    <button
                        type="button"
                        className="md:hidden block absolute top-1/2 right-1 -translate-y-1/2 w-[14px] hover:opacity-50"
                        onClick={(e) => {
                            props.onClickBtn(0)
                        }}
                    >
                        <TrashCanIcon className="w-full" />
                    </button>
                </div>

                <div className="flex-1 md:max-w-[600px] w-full relative">
                    <input
                        type="text"
                        name="question"
                        className="w-full p-2 pl-4 border border-gray-300 rounded"
                        value={props.question}
                        onChange={(e) => props.onChange(e)}
                    />

                    <button
                        type="button"
                        className="md:block hidden absolute top-1/2 -right-6 -translate-y-1/2 w-[14px] hover:opacity-50"
                        onClick={(e) => {
                            props.onClickBtn(0)
                        }}
                    >
                        <TrashCanIcon className="w-full" />
                    </button>
                </div>
            </div>

            <div className="flex md:flex-row flex-col items-center justify-start gap-2 mt-4">
                <div className="md:w-[80px] w-full">
                    <p>アンサー</p>
                </div>

                <div className="flex-1 md:max-w-[600px] w-full">
                    <input
                        type="text"
                        name="answer"
                        className="w-full p-2 pl-4 border border-gray-300 rounded"
                        value={props.answer}
                        onChange={(e) => props.onChange(e)}
                    />
                </div>
            </div>
        </>
    );
}
