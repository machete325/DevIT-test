import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import {
    Slide,
    ToastContainer,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { LoginPage } from './pages/LoginPage';
import { sagaMiddleware } from './store';
import { PostsPage } from './pages/posts/PostsPage';
import { Root } from './pages/Root';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage/>,
    },
    {
        path: '/',
        element: <Root/>,
        errorElement: <div>Incorrect page</div>,
        children: [
            {
                path: '/posts',
                element: <PostsPage/>,
            },
        ],
    },
]);

sagaMiddleware.setContext({
    router,
});

export const App = () => {
    return (
        <React.Fragment>
            <RouterProvider router={router}/>

            <ToastContainer
                transition={Slide}
                position='bottom-center'
            />
        </React.Fragment>
    );
};
