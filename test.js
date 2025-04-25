const axios = require('axios');
axios.post('http://localhost:3000/api/hello')
  .then(response => {
    console.log(response.data); // Should print "Hello World!"
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });