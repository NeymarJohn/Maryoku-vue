import moment from "moment";
import { postReq, getReq } from '@/utils/token'
import axios from 'axios'
import { resolve } from "promise-polyfill";

const formatScheduleTime = (date) => {
  return moment(new Date(date)).format("hh:mm A");
}

const formatScheduleDay = (date, format) => {
  if (!format) format = "MM/DD/YY"
  if (typeof date == "number") {
    return moment(new Date(date)).format(format);
  }
  return moment(date).format(format);
}

const getLocationFromPlaceId = (placeId) => {
  return new Promise((resolve, reject)=> {
    try {
      var request = {
        placeId,
        fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
      };
      // const placeService = new google.maps.places.PlacesService();
      var placeService = new google.maps.places.PlacesService(document.createElement('div'));
      placeService.getDetails(request, (place, status)=>{
        resolve(place);
      });
      
    } catch (error) {
      console.error(error);
    }
  }) 
}

const getTimeZoneNameFromPlaceId = async (placeId) => {
    const placeInfo = await getLocationFromPlaceId(placeId);
    console.log(placeInfo)
    var targetDate = new Date() // Current date/time of user computer
    var apicall = `https://maps.googleapis.com/maps/api/timezone/json?location=${placeInfo.geometry.location.lat()},${placeInfo.geometry.location.lng()}&key=AIzaSyD6JvMsiEN9jz3lfVbKlnUQhjZB6fgcCu8`
 
    var xhr = new XMLHttpRequest() // create new XMLHttpRequest2 object
    xhr.open('GET', apicall) // open GET request
    xhr.onload = function(){
        if (xhr.status === 200){ // if Ajax request successful
            var output = JSON.parse(xhr.responseText) // convert returned JSON string to JSON object
            console.log(output.status) // log API return status for debugging purposes
            if (output.status == 'OK'){ // if API reports everything was returned successfully
              alert("success")
                console.log(output)
            }
        }
        else{
            alert('Request failed.  Returned status of ' + xhr.status)
        }
    }
    xhr.send() // send request
}
// const getTimeZoneNameFromPlaceId = (placeId) =>{
//   getLocationFromPlaceId(placeId).then(location => {
//     console.log(location)

//   })
// }
export default {
  formatScheduleTime,
  formatScheduleDay,
  getLocationFromPlaceId,
  getTimeZoneNameFromPlaceId
}