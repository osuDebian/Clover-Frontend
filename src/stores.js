import axios from 'axios';
import { promisable } from 'svelte-promisable-stores';


const fetchApi = () =>
  axios
    .get('https://nerina.pw/api/v2/search?mode=0&amount=6&status=1&query=')
    .then((response) => response.data);

export const data = promisable(
  fetchApi
)

// promiseFunction: function that returns a promise
// const fetchPerson = (url) =>
//   axios
//     .get(`//jsonplaceholder.typicode.com/users/${personId}`)
//     .then((response) => response.data);

// export const currentPerson = promisable(
//   fetchPerson,
//   // shouldRefreshPromise: function that evaluates if
//   // promise should be refreshed when `dispatch` is called.
//   // In this case, it fetches a person's data
//   // if there is no data for the store or
//   // if it's id is different from the one passed to `dispatch`.
//   (currentStateData, personId) =>
//     !currentStateData || personId != currentStateData.id
// );