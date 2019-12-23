import moment from 'moment';

export default {
    namespaced: true,
    state() {
        return {
            publicEventData: {
                id: null,
                occasion: "",
                occasionCache: "",
                title: "New Event",
                date: null,
                theme: "",
                time: "",
                duration: "",
                numberOfParticipants: "",
                status: "draft",
                totalBudget: "",
                currency: "",
                eventType: "",
                eventTheme: null,
                category: null,
                expectingPeople : null,
                eventTime : null,
                haveEventPlace : false,
                flexibleWithDates : false,
                eventSongId : null
            }
        };
    },

    mutations: {
        setEventProperty(state, {key, actualValue}) {
            state.publicEventData[key] = actualValue;
        },
        setEventData(state, data) {
            state.publicEventData['id'] = data.id;
            state.publicEventData['occasion'] = data.occasion ? data.occasion : state.eventData['occasion'];
            state.publicEventData['occasionCache'] = state.eventData['occasion'];
            state.publicEventData['theme'] = data.theme;
            state.publicEventData['title'] = data.title;
            state.publicEventData['numberOfParticipants'] = data.numberOfParticipants;
            state.publicEventData['totalBudget'] = data.totalBudget;
            state.publicEventData['currency'] = data.currency;
            state.publicEventData['eventType'] = data.eventType;
            state.publicEventData['date'] = data.eventStartMillis;
            state.publicEventData['category'] = data.category;
            state.publicEventData['time'] = moment(data.eventStartMillis).format('h:00 A');
            state.publicEventData['duration'] = moment(data.eventEndMillis).diff(data.eventStartMillis, 'hours')
        }
    }
};
