
var fetch = require("node-fetch");

const token_url = 'https://accounts.spotify.com/api/token'
const client_secret = '***REMOVED***'
const client_id = '***REMOVED***'

const user_id = '***REMOVED***';
const playlist_ids = [
  '***REMOVED***', // Extra lässiges Zeugs
  '***REMOVED***', // Gute Laune
  '***REMOVED***', // Lässiges Zeugs
  '***REMOVED***', // Rappig
  '***REMOVED***', // Rockig
]


const status = (response) => {
  console.log(response.status)
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
      return Promise.reject(new Error(response.statusText))
  }
}

const json = (response) => {
  return response.json()
}

const getAuthToken = () => {
  return fetch(token_url, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  .then(status)
  .then(json)
  .then(function(data) {
    return data.access_token;
  }).catch(error => console.log(error))
}

const getAllPlaylists = (token, user_id, playlist_ids) => {
  return Promise.all(playlist_ids.map(playlist_id => getPlaylistPromise(token, user_id, playlist_id)
    .then(status).then(json).then(data => data)))
}


const getPlaylistPromise = (token, user_id, playlist_id) => {
  return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}`, {
    //fields: 'tracks.items(track.album.release_date,track.album.artists(name),track.name,track.id,track.explicit,track.popularity)',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    }
  })
}





const cleanPlaylist = (playlist) => {
  return {
    id: playlist.id,
    name: playlist.name,
    tracks: playlist.tracks.items.map(trackItem => cleanTrackObject(trackItem)),
  }
}

const getPlaylistTracks = (token, playlist) => {
  const next_tracks_url = playlist.tracks.next;
  if (next_tracks_url == null)
    return playlist;

  fetch(next_tracks_url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    }
  })



}

const cleanTrackObject = (trackItem) => {
  return {
    artist_name: trackItem.track.album.artists[0].name,
    album_data: trackItem.track.album.release_date,
    track_name: trackItem.track.name,
    track_popularity: trackItem.track.popularity, // 0 - 100 → 100 am Populärsten
    track_explicit: trackItem.track.explicit,
  }
}



getAuthToken()
  .then(token => {
      getAllPlaylists(token, user_id, playlist_ids).then(playlists => playlists.map(x => console.log(cleanPlaylist(x))))
    }
)


//
// // AllTests()
// getAuthToken()
//  .then(token => getAllPlaylists(token, user_id, playlist_ids))
// // getAuthToken()
// //   .then(token =>
// //     console.log(token),
// //     getPlaylist(token, '***REMOVED***', '***REMOVED***'))
