import instanceAPI from '~/api/instance'
export default {
  addReport: (data) => {
    return instanceAPI.api.post('/add/report', data).then(response => response.data)
  },
  getReport: (province) => {
    return instanceAPI.api.get(`/reports?province=${province}`).then(response => response.data)
  },
  queryReport: (id) => {
    return instanceAPI.api.get(`/report/${id}`).then(response => response.data)
  },
  reply: (data) => {
    return instanceAPI.api.post('/reply/user', data).then(response => response.data)
  }
}
