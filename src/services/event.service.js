import axios from 'axios';
import store from '../store'

const { SERVER_URL, HOST_URL } = { SERVER_URL: process.env.SERVER_URL, HOST_URL: process.env.HOST_URL}

const API_URL = `${SERVER_URL}`
const HOSTNAME = `${HOST_URL}`
const REGISTRATION_URL = `${API_URL}/1/register`
const REGISTRATION_RSVP_URL = `${API_URL}/1/register-rsvp`
const LOGIN_URL = `${API_URL}/api/login`
const VALIDATE_URL = `${API_URL}/api/validate`
const LOGOUT_URL = `${API_URL}/api/logout`
const FORGOT_PASSWORD_URL = `${API_URL}/1/forgot-password`
const CURRENT_USER_URL = `${API_URL}/1/me`
const CURRENT_TENANT_USER = `${API_URL}/1/userInfo`

import Vue from 'vue'
import authHeader from './auth-header';
import { Model } from 'vue-api-query'
import Tenant from "@/models/Tenant";
import CalendarEvent from '@/models/CalendarEvent'
import Calendar from '@/models/Calendar'

class EventService {
  getFirstTaskLink(event) {
    if (event.conceptProgress !== 100) {
      return `/events/${event.id}/booking/concept`
    } else if (event.budgetProgress !== 100) {
      return `/events/${event.id}/booking/budget`
    } else if (event.timelineProgress !== 100) {
      return `/events/${event.id}/booking/timeline`
    } else {
      const workingComponent = `/events/${event.id}/booking/timeline`
      if (event.components) {
        for (let i in event.components) {
          event.components[i].progress !== 100
          return `/events/${event.id}/booking/${event.components[i].id}` 
        }
      }
      return `/events/${event.id}/booking/timeline`
    }
  }
  saveEventFromStorage(calendarId) {
    const editingEvent = JSON.parse(localStorage.getItem("event"))
    const calendar = new Calendar({id: calendarId})
    return new Promise((resolve, reject) => {
      let newEvent = new CalendarEvent({
        calendar: calendar,
        title: editingEvent.title,
        occasion: editingEvent.occasion?editingEvent.occasion.value:"",
        eventStartMillis: editingEvent.eventStartMillis,
        eventEndMillis: editingEvent.eventEndMillis,
        numberOfParticipants: editingEvent.numberOfParticipants,
        budgetPerPerson: 0,
        totalBudget: 0,
        status: "draft",
        currency: "USD",
        eventType: editingEvent.eventType,
        category: editingEvent.occasion?editingEvent.occasion.name:"",
        editable: true,
        location: editingEvent.location,
        locationId: editingEvent.locationId,
        inOutDoor: editingEvent.inOutDoor,
        eventSongId: editingEvent.eventSongId,
        guestType: editignEvent.guestType
      })
        .for(calendar)
        .save()
        .then(response => {
          localStorage.removeItem("event")
          resolve(response)
        })
        .catch(error => {
          reject(error)
        });
    })

  }
}

export default new EventService();