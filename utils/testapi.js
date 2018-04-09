const testAPIonline = (axios, fn) => {
  setTimeout(() => {
    axios.get('online')
      .then((res) => {
        fn()
      })
      .catch(error => {
        console.log(error)
        testAPIonline(axios, fn)
      })
  }, 5000)
}

export default testAPIonline
