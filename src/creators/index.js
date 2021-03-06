'use strict';

const creators = {
  // overlay creators
  deleteProjectConfirm: require('./delete-project-confirm'),
  // terminal creators
  rxOn: require('./rx-on'),
  rxOff: require('./rx-off'),
  rxClearTimeout: require('./rx-clear-timeout'),
  txOn: require('./tx-on'),
  txOff: require('./tx-off'),
  txClearTimeout: require('./tx-clear-timeout'),
  receive: require('./receive'),
  transmit: require('./transmit'),
  updateDuration: require('./update-duration'),
  clearTransmission: require('./clear-transmission'),
  echoOn: require('./echo-on'),
  echoOff: require('./echo-off'),
  // device creators
  connect: require('./connect'),
  disconnect: require('./disconnect'),
  reloadDevices: require('./reload-devices'),
  updateDevices: require('./update-devices'),
  enableAutoDownload: require('./enable-auto-download'),
  disableAutoDownload: require('./disable-auto-download'),
  updateSearchStatus: require('./update-search-status'),
  clearSearchStatus: require('./clear-search-status'),
  updateSelectedDevice: require('./update-selected-device'),
  resetDownloadProgress: require('./reset-download-progress'),
  updateDownloadProgress: require('./update-download-progress'),
  // action queue creators
  queueNewFile: require('./queue-new-file'),
  queueChangeFile: require('./queue-change-file'),
  queueOverwriteFile: require('./queue-overwrite-file'),
  resetActionQueue: require('./reset-action-queue')
};

module.exports = creators;
