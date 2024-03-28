document.querySelector("#btnDeco").addEventListener("click", async()=>{
    sessionStorage.removeItem('username')
    window.location.href='/projet1/index.php'
})