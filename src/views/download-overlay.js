'use strict';

const _ = require('lodash');
const React = require('react');
const Button = require('react-material/components/Button');
const Loader = require('react-loader');
const { createContainer } = require('sovereign');

const Overlay = require('../components/overlay');
const OverlayTitle = require('../components/overlay-title');
const OverlayFooter = require('../components/overlay-footer');
const ProgressBar = require('../components/progress-bar');

const styles = {
  overlay: {
    paddingBottom: 40
  },
  overlayFooter: {
    marginLeft: 0,
    display: 'flex'
  },
  deviceTable: {
    width: '100%',
    maxWidth: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0
  },
  deviceTh: {
    padding: '8px 8px 8px 0',
    textAlign: 'left',
    borderTop: 0,
    borderBottom: '2px solid #ddd',
    verticalAlign: 'bottom',
    fontWeight: 'bold'
  },
  deviceTd: {
    padding: '8px 8px 8px 0',
    borderSpacing: 'collapse',
    verticalAlign: 'top',
    borderTop: '1px solid #ddd'
  },
  scrollingContainer: {
    height: 325,
    overflow: 'auto',
    position: 'relative'
  },
  bottomBar: {
    height: 40,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex'
  },
  overlayUserMessage: {
    color: '#911',
    backgroundColor: '#fcdede',
    padding: '10px 16px',
    textAlign: 'center',
    width: '100%'
  },
  refreshButton: {
    marginRight: 'auto'
  },
  active: {
    backgroundColor: '#ddd'
  },
  inactive: {
    backgroundColor: 'transparent'
  }
};

class DownloadOverlay extends React.Component {

  constructor(...args){
    super(...args);

    this.componentizeDevice = this.componentizeDevice.bind(this);
  }

  componentizeDevice(device){
    const {
      path,
      handlers
    } = this.props;

    const {
      selectDevice
    } = handlers;

    const highlight = device.path === path ? 'active' : 'inactive';
    return (
      <tr style={styles[highlight]} onClick={() => selectDevice(device)}>
        <td style={styles.deviceTd}>{device.name}</td>
        <td style={styles.deviceTd}>{device.version}</td>
        <td style={styles.deviceTd}>{device.path}</td>
      </tr>
    );
  }

  render(){
    const {
      deviceList,
      searchStatus,
      downloadProgress,
      searching,
      handlers
    } = this.props;

    const {
      reloadDevices,
      hideOverlay
    } = handlers;

    const deviceRows = _.map(deviceList, this.componentizeDevice);

    let bottomBar;
    if(searchStatus){
      bottomBar = (
        <div style={styles.overlayUserMessage}>{searchStatus}</div>
      );
    } else {
      bottomBar = (
        <ProgressBar percent={downloadProgress} />
      );
    }

    return (
      <Overlay large style={styles.overlay}>
        <OverlayTitle>Please choose your connected device.</OverlayTitle>
        <Loader loaded={!searching}>
          <div style={styles.scrollingContainer}>
            <table style={styles.deviceTable}>
              <thead>
                <tr>
                  <th style={styles.deviceTh}>Device</th>
                  <th style={styles.deviceTh}>Version</th>
                  <th style={styles.deviceTh}>Port</th>
                </tr>
              </thead>
              <tbody>
                {deviceRows}
              </tbody>
            </table>
          </div>
        </Loader>
        <OverlayFooter style={styles.overlayFooter}>
          <Button styles={styles.refreshButton} onClick={reloadDevices}>Refresh</Button>
          <Button onClick={hideOverlay}>Cancel</Button>
        </OverlayFooter>
        <div style={styles.bottomBar}>
          {bottomBar}
        </div>
      </Overlay>
    );
  }

}

module.exports = createContainer(DownloadOverlay, {
  getStores({ store }){
    return {
      store
    };
  },

  getPropsFromStores({ store }) {
    const { deviceList, device, downloadProgress } = store.getState();
    const { searchStatus, searching, path } = device;

    return {
      deviceList,
      downloadProgress,
      searchStatus,
      searching,
      path
    };
  }
});
