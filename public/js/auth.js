
// in here we check if there is a JWT in  the session (which means the user is logged in)
// for certain buttons the page output is determinated by being or not logged in 

// check 
function checkToken() {
    const token = sessionStorage.getItem("jwt")
    return !!token
}


module.exports = checkToken