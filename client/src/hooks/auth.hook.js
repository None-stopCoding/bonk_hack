import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [role, setRole] = useState(null);
    const [ready, setReady] = useState(false);

    const login = useCallback((jwtToken, id, role_) => {
        const role__ = role_;
        const userId_ = id;
        // debugger
        setRole(role__);
        setUserId(userId_);
        setToken(jwtToken);

        localStorage.setItem(storageName, JSON.stringify({
            userId: userId_, token: jwtToken, role: role__
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setRole(null);
        localStorage.removeItem(storageName);
    }, []);

    // Если в localstorage хранится уже логин c токеном, то автоматически логиним пользователя
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userId, data.role);
        }
        setReady(true);
    }, [login])

    return { login, logout, token, userId, ready, role };
};