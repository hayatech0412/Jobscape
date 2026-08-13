import React, { useState, useEffect } from 'react';

const UserSearchInput = ({
    onSelect,
    currentOption,
    onCancel,
    has,
}) => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(currentOption);

    // 入力内容が変わった時にユーザーをフェッチ
    useEffect(() => {
        if (query.length > 0) {
            fetch(`/admin/users/filter?keyword=${query}&has=${has ? has : "transactions"}`)
                .then((response) => response.json())
                .then((data) => setUsers(data))
                .catch((error) => console.error('Error fetching users:', error));
        } else {
            setUsers([]); // queryが空の場合、候補をクリア
        }
    }, [query]);

    const handleSelectUser = (user) => {
        setSelectedUser(user); // ユーザー選択
        setUsers([]); // 候補リストをクリア
        setQuery(''); // 入力欄もクリア（必要であれば）
        onSelect(user.id)
    };

    const handleRemoveUser = () => {
        setSelectedUser(null); // ユーザー選択解除
        onCancel();
    };

    return (
        <div className="border border-gray-300 rounded-md h-[42px] py-[4px] bg-white relative px-2 mt-1">
            <div className="flex items-center gap-2">
                {/* ユーザー選択後の表示 */}
                {selectedUser?.id && (
                    <div className="min-w-[120px] flex items-center gap-2 rounded-md relative border border-gray-200 px-1 py-[3px] leading-none">
                        <div className="flex items-center gap-2">
                            <img
                                src={selectedUser?.avatar_url}
                                alt={selectedUser?.profile?.last_name}
                                className="w-6 h-6 rounded-full"
                            />
                            <span className="text-[10px] font-semibold">
                                {selectedUser?.profile.last_name} {selectedUser?.profile.first_name}    
                            </span>
                        </div>
                        <button 
                            onClick={handleRemoveUser} 
                            className=" text-red-500 h-4 hover:text-red-700 text-sm"
                        >
                            ✖️
                        </button>
                    </div>
                )}

                {/* 入力欄 */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="ユーザーを検索"
                    className="block px-3 py-1 text-sm bg-gray-50 rounded focus:outline-none focus:ring-0 focus:border-none border-none"
                />
            </div>

            {/* 候補リスト */}
            {users.length > 0 && (
                <ul className="absolute bg-white border mt-2 w-full max-h-60 overflow-auto shadow-lg z-10">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            onClick={() => handleSelectUser(user)}
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                        >
                            <img
                                src={user?.avatar_url}
                                alt={user?.profile.last_name}
                                className="w-8 h-8 rounded-full mr-3"
                            />
                            <span className="text-sm">
                                {user?.profile.last_name} {user?.profile?.first_name}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserSearchInput;
