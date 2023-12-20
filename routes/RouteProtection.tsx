'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import routerConstants from 'utils/routerConstants';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const router = useRouter();
    const session = useSession();
    const pathname = usePathname();

    const commonRoutes = [
        routerConstants.SIGNIN,
        routerConstants.SIGNUP,
        routerConstants.NOT_FOUND,
        routerConstants.ERROR
    ];

    useEffect(() => {
        // Check if the user is authenticated, redirect to login if not.
        if (!session || session?.status === 'unauthenticated') {
            if (!commonRoutes.includes(pathname)) {
                router.replace(routerConstants.NOT_FOUND);
                return;
            }
        }
    }, [session, pathname, router]);

    return <>{children}</>;
};

export default ProtectedRoute;