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
 // teleportModule.setCamera(r360.controls.cameraControllers);
 /* r360.renderToSurface(
    r360.createRoot('SlideShow', {
      photos: [
        {uri: './static_assets/sky_box.jpg', title: 'YIT flat', format: '2D'},
        // Add your own 180 / 360 photos to this array,
        // with an associated title and format
      ],
    }),
    /!*  r360.createRoot("custom360", {
          /!* initial props *!/
      }),*!/
    r360.getDefaultSurface(),
  );*/

    r360.renderToLocation(
        r360.createRoot('ModelView'),
        new Location([-10, -3.5, 3], [0, -0.707, 0, 0.707]),
    );

    // Load the initial environment
    r360.compositor.setBackground(r360.getAssetURL("sky_box.jpg"));
    r360.controls.clearRaycasters();
    r360.controls.addRaycaster(SimpleRaycaster);
}

window.React360 = {init};
