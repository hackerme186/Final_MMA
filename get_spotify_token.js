const axios = require('axios');

const client_id = '2d6220b479844926aa4e81036ca85d6f'; // Thay bằng Client ID của bạn
const client_secret = '501e05d4083549a79ea536916d60e335'; // Thay bằng Client Secret của bạn

const getToken = async () => {
  const resp = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
    }
  );
  console.log('Access token:', resp.data.access_token);
};

getToken();