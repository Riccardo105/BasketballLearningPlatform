
// profile button (in burger menu) redirects to log-in page if not logged in
document.querySelectorAll(".profileBtn").forEach(element => {
    element.addEventListener("click", function(){
        if(!checkToken()) {
            window.location.href = "/login" //redirects to login page if no jwt found
        } else {
            window.location.href = "/profile" //if logged in loads profile page
        }
    })
    
});