/* eslint-disable react/no-children-prop */
// import theme style scss file
import 'styles/theme.scss';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Provider from "./context/client-provider"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import ProtectedRoute from 'routes/RouteProtection';

export const metadata = {
    title: 'CDAZZDEV - Assessment',
    description: 'Assessment',
    keywords: 'Assessment'
}

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<React.ReactElement> {

    const session = await getServerSession(authOptions)

    return (
        <html lang="en">
            <body className='bg-light'>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Provider session={session}>
                    <ProtectedRoute children={children} />
                </Provider>
            </body>
        </html>
    )
}