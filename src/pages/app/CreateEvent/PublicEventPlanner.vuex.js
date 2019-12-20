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
                eventType: null,
                eventTheme: null,
                category: null,
            }
        };
    },

    mutations: {
        setEventProperty(state, {key, actualValue}) {
            state.eventData[key] = actualValue;
        },
        setEventData(state, data) {
            state.eventData['id'] = data.id;
            state.eventData['occasion'] = data.occasion ? data.occasion : state.eventData['occasion'];
            state.eventData['occasionCache'] = state.eventData['occasion'];
            state.eventData['theme'] = data.theme;
            state.eventData['title'] = data.title;
            state.eventData['numberOfParticipants'] = data.numberOfParticipants;
            state.eventData['totalBudget'] = data.totalBudget;
            state.eventData['currency'] = data.currency;
            state.eventData['eventType'] = data.eventType;
            state.eventData['date'] = data.eventStartMillis;
            state.eventData['category'] = data.category;
            state.eventData['time'] = moment(data.eventStartMillis).format('h:00 A');
            state.eventData['duration'] = moment(data.eventEndMillis).diff(data.eventStartMillis, 'hours')
        }
    }
};
