import {
    asset,
    Model,
    View,
} from 'react-360';
import React from "react";
import Entity from 'Entity';
import AmbientLight from 'AmbientLight';
import PointLight from 'PointLight';

/**
 * Renders the actual model in 3D space, rotating it a full 360 degrees to show
 * it from all angles.
 */
export default class ModelView extends React.Component {

    render() {
        return (
            <View>
                <AmbientLight intensity={1.0} color={'#ffffff'} />
                <PointLight
                    intensity={1}
                    style={{transform: [{translate: [0, 4, -1]}]}}
                />
                <Entity
                    style={
                        {transform: [
                          {rotateZ: 0},
                          {rotateY: 0},
                          {rotateX: 0},
                          {scale: 1},
                          ]
                        }}
                    source={{
                        obj: `/account/public/modelFormatObj?modelId=${this.props.modelId}`,
                        mtl: asset("cube.mtl"),
                    }}
                />
            </View>
        );
    }
}