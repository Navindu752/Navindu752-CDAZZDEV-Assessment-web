// This hook is used to get authorization header with the session token
import { useSession, Session } from 'next-auth/react';

interface AuthHeader {
    headers: {
        Authorization: string;
    };
}

function useAuthHeader(): AuthHeader {
    const session = useSession() as Session | undefined;
    return {
        headers: {
            Authorization: `Bearer ${session?.data?.user?.token}`,
        },
    };
}

export default useAuthHeader;