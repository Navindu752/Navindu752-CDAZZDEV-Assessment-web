interface ApiRouter {
	SIGNUP: string;
	SIGNIN: string;
	GET_USER_DETAILS: string;
  }
  
  const apiRouter: ApiRouter = {
	SIGNUP: "/user",
	SIGNIN: "/user/login",
	GET_USER_DETAILS: "/user/get-user-details",
  };
  
  export default apiRouter;