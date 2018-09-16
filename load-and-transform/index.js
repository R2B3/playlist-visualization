
var fetch = require("node-fetch");

const token_url = 'https://accounts.spotify.com/api/token'
const client_secret = '***REMOVED***'
const client_id = '***REMOVED***'

const user_id = '***REMOVED***';
const playlist_ids = [
  '***REMOVED***', // Rappig
  '***REMOVED***', // Extra lässiges Zeugs
  '***REMOVED***', // Gute Laune
  '***REMOVED***', // Lässiges Zeugs
   '***REMOVED***', // Rockig
]

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
  })//.then(status).then(json).then(data => data)
}

const status = (response) => {
  // console.log(response.status + " " + response.url)
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
      return Promise.reject(new Error(response.statusText))
  }
}

const json = (response) => {
  return response.json()
}

const addTracksToPlaylistAndClean = (playlist, tracks) => {
  return {
    id: playlist.id,
    name: playlist.name,
    tracks: tracks.map(trackItem => cleanTrackObject(trackItem)),
  }
}

const cleanTrackObject = (item) => {
  return {
    artist_name: item.track.album.artists[0].name,
    album_release_date: item.track.album.release_date,
    track_name: item.track.name,
    track_popularity: item.track.popularity, // 0 - 100 → 100 am Populärsten
    track_explicit: item.track.explicit,
    track_duration: item.track.duration_ms
  }
}


const addTracksToSinglePlaylist = (token, playlist) => {
  return getSinglePlaylistTracks(token, playlist.tracks.href, [], [])
    .then(tracks => {
      playlist.tracks = tracks
      return playlist
    }).then(x => x)
  //return playlist;
}

const getSinglePlaylistTracks = (token, tracksUrl, newTracks, allTracks) => {
  allTracks.push(...newTracks)

  if (tracksUrl === null) {
    console.log('getSinglePlaylistTracks resolve')
    return Promise.resolve(allTracks)
  }
  console.log('getSinglePlaylistTracks ' + tracksUrl)


  return fetch(tracksUrl, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    }
  })
  .then(status)
  .then(json)
  .then(data =>
    getSinglePlaylistTracks(token, data.next, data.items /*data.items.map(item => cleanTrackObject(item))*/, allTracks))
}

const getPlaylistsTracks = async(token, [thisPlaylist, ...nextPlaylists], finishedPlaylists) => {

  if (!thisPlaylist) {
    console.log('getPlaylistsTracks resolve')
    return Promise.resolve(finishedPlaylists)
  }
  console.log('getPlaylistsTracks ' + thisPlaylist.id)
  let cleanedPlaylist
  let thisFinishedPlaylist
  let thisFinishedPlaylists

  await getSinglePlaylistTracks(token, thisPlaylist.tracks.href, [], [])
    .then(tracks => {
      cleanedPlaylist = addTracksToPlaylistAndClean(thisPlaylist, tracks);
      cleanedPlaylist.tracksCount = cleanedPlaylist.tracks.length

      thisFinishedPlaylists = [...finishedPlaylists]
      thisFinishedPlaylists.push(cleanedPlaylist);
  });

  return getPlaylistsTracks(token, nextPlaylists, thisFinishedPlaylists)
}

const  getData = () => {
  getAuthToken()
    .then(token => getAllPlaylists(token, user_id, playlist_ids)
          .then(playlists => {
            getPlaylistsTracks(token, playlists, [])
              .then(playlistsWithTracks => {
                const fs = require('fs');
                fs.writeFile("C:/Repository/playlist-visualization/load-and-transform/data/data.json", JSON.stringify(playlistsWithTracks), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                });
              })}))}
getData()
