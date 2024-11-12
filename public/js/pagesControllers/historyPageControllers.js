// history button (in burger menu and profile dashboard) redirects to log-in page if not logged in
document.querySelectorAll(".historyBtn").forEach(element => {
    element.addEventListener("click", function(){
        if(!checkToken()) {
            window.location.href = "/login" //redirects to login page if no jwt found
        } else {
            window.location.href = "/history" //if logged in loads history page
        }
    })
    
});