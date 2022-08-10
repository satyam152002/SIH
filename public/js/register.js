const inputLocation=document.getElementById("loc")
const mainLocation=document.getElementById("location")
function getLocationOnSuccess(pos)
{
    mainLocation.value=`
    {"latitude":${pos.coords.latitude},"longitude":${pos.coords.longitude}}`;
    console.log(pos)
}
function handleError(error)
{
    console.log("Error in getting Error : "+error.message)
}
const locationOptions={
    enableHighAccuracy:true,
    timeout:5000,
    maximumAge:0
}
inputLocation.onclick=async e=>{
    try 
    {
        await navigator.geolocation.getCurrentPosition(getLocationOnSuccess,handleError,locationOptions);
    } 
    catch (e)
    {
        console.log(e)
    }
}
