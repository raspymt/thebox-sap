module.exports = {
  browserBaseURL: 'http://thebox:80/api/v1/',
  baseURL: 'http://localhost:3000/',
  /*
  ** The Box API
  */
  api: {
    mpd: {
      service: 'mpd.service'
    },
    mpdgui: {
      service: 'ympd.service'
    },
    filesharing: {
      service: 'smbd.service',
      updatePassword: 'samba/update/password'
    },
    torrents: {
      service: 'transmission.service'
    },
    upnpdlna: {
      service: 'minidlna.service'
    },
    networks: {
      service: 'wpa_supplicant@wlan0.service',
      interface: 'wlan0'
    },
    accesspoint: {
      // service: 'wpa_supplicant@uap0.service'
      service: 'hostapd.service'
    }
  }
}
