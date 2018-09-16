import {ReactInstance, Location, Module} from 'react-360-web';
import SimpleRaycaster from "simple-raycaster";

class TeleportModule extends Module {
    constructor() {
        super('TeleportModule');
        this._camera = null;
    }

    setCamera(camera) {
        this._camera = camera;
    }

    teleportCamera(x, y, z) {
        if (this._camera) {
            this._camera.position.set(x, y, z);
            // Call this to make sure anything positioned relative to the camera is set up properly:
            this._camera.updateMatrixWorld(true);
        }
    }
}

function init(bundle, parent, options = {}) {
  const teleportModule = new TeleportModule();
  const r360 = new ReactInstance(bundle, parent, {
    nativeModules: [ teleportModule ],
    fullScreen: true,
    ...options,
  });

    r360.renderToLocation(
        r360.createRoot('ModelView'),
        new Location([0, -1.65, 0]),
    );

    // Load the initial environment
    r360.compositor.setBackground(r360.getAssetURL("sky_box.jpg"));
    r360.controls.clearRaycasters();
    r360.controls.addRaycaster(SimpleRaycaster);
}

window.React360 = {init};
