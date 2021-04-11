import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [role, setRole] = useState(null);
    const [orgId, setOrgId] = useState(null);
    const [ready, setReady] = useState(false);

    const login = useCallback((jwtToken, id, role, orgId) => {
        setRole(role);
        setUserId(id);
        setOrgId(orgId);
        setToken(jwtToken);

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, role: role, org: orgId
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setRole(null);
        setOrgId(null);
        localStorage.removeItem(storageName);
    }, []);

    // Если в localstorage хранится уже логин c токеном, то автоматически логиним пользователя
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userId, data.role, data.org);
        }
        setReady(true);
    }, [login])

    return { login, logout, token, userId, ready, role, orgId };
};