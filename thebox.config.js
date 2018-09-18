module.exports = {
  browserBaseURL: 'http://thebox/api/v1/',
  baseURL: 'http://localhost:3000/',
  /*
  ** The Box API
  */
  api: {
    rpc: 'rpc',
    users: {
      update: 'users/'
    },
    service: {
      statuses: 'services/statuses',
      action: 'services/action'
    },
    mpd: 'mpd',
    mpdgui: 'mpdgui',
    mpdCredentials: 'mpdCredentials',
    filesharing: 'filesharing',
    filesharingCredentials: 'filesharingCredentials',
    torrent: 'torrent',
    torrentCredentials: 'torrentCredentials',
    upnpdlna: 'upnpdlna',
    upnpdlnaRebuild: 'rebuildUpnpDlna',
    upnpdlnaRescan: 'rescanUpnpDlna',
    syncthing: 'syncthing',
    resilio: 'resilio',
    startService: 'startService',
    stopService: 'stopService',
    medias: 'medias',
    poweroff: 'poweroff',
    reboot: 'reboot',
    unmount: 'unmount',
    wifi: 'wifi',
    accesspoint: 'accesspoint',
    accesspointUpdate: 'accesspointUpdate',
    networks: 'networks'
  }
}
