import { createStore } from 'vuex'
import EventService from '@/services/EventService.js'

export default createStore({
  state: {
    user: 'Adam Jahr',
    events: [],
    event: {}
  },
  mutations: {
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
    fetchEvent({ commit, state }, id) {
      //check of the state events already has that event
      const existingEvent = state.events.find(event => event.id === id)
      if (existingEvent) {
        commit('SET_EVENT', existingEvent)
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }

    },

    fetchEvents({ commit }) {
      EventService.getEvents()
        .then(response => {
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createEvent({ commit }, event) {
      EventService.postEvent(this.event)
        .then(() => {
          //add event to vuexn
          commit('ADD_EVENT', event)

        })
        .catch(err => {
          console.log("Error:", err)
        })
    }
  },
  modules: {}
})