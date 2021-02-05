const apiURL = 
	process.env.NODE_ENV === 'production'
	? "https://eslate.herokuapp.com/"
	: "http://localhost:8000";
export {apiURL};