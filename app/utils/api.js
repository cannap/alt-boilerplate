import request from 'superagent';
import config from '../config/config';

export function errorNotification(error) {
  let errorMessage = error.message;
  if (error.response && error.response.body) {
    errorMessage = error.response.body.error;
  }
  return {title: 'Error', message: errorMessage};
}

export function loginUser(username, password) {
  return new Promise((resolve, reject) => {
    request
    .post(`${config.API_ROOT}/api/v1/users/signin`)
    .send({ user: {email: username, password: password } })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end(function(err, res) {
      if (err) {
        reject(err);
        return;
      }
      resolve(res.body);
    });
  });
}

