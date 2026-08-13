import React, { useState, useEffect } from "react";

const CardNumberInput = ({
    placeholder,
    value,
    handleChange,
    id,
}) => {
  const [cardNumber, setCardNumber] = useState(value ?? "");

  useEffect(() => {
    setCardNumber(value);
  }, [value]); 

  const handleInputChange = (e) => {
    // 数字以外を排除
    const input = e.target.value.replace(/\D/g, ""); // 数字以外を削除
    const formattedInput = input
      .match(/.{1,4}/g) // 4文字ごとに分割
      ?.join(" ") // 空白で結合
      .substring(0, 19); // 最大19文字 (16数字 + 3空白)

    // 状態の更新とhandleChangeを正しく呼び出す
    setCardNumber(formattedInput || "");
    handleChange(formattedInput);
  };

  return (
    <div className="flex flex-col items-start">
      <input
        type="text"
        id={id ?? "card-number"}
        value={cardNumber}
        onChange={handleInputChange}
        placeholder={placeholder ?? '1234 5678 9012 3456'}
        maxLength="19"
        inputMode="numeric" // モバイル端末で数字パッドを表示させる
        pattern="[0-9]*" // 数字以外の入力を拒否
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
      />
    </div>
  );
};

export default CardNumberInput;