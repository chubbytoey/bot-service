import instanceAPI from '~/api/instance'
export default {
  addReport: (data) => {
    return instanceAPI.api.post('/add/report', data).then(response => response.data)
  }
}
