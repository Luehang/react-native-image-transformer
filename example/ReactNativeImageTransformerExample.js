import React from "react";
import ImageTransformer from "react-native-image-transformer";

export default class ReactNativeImageTransformerExample extends React.PureComponent {
    render() {
        return (
            <ImageTransformer
                style={{flex: 1}}
                image={
                    {
                        uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg",
    
                        // --> Can be used with different object fieldname.
                        // ----> Ex. source, source.uri, uri, URI, url, URL
                        // source: { uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg" },
                        // URI: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg",
                        // url: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg",
                        // URL: "https://luehangs.site/pic-chat-app-images/adult-arm-art-326559.jpg",
    
                        // --> Performance optimization.
                        // dimensions: { width: 1080, height: 1920 },
                        // width: 100
                        // height 100
                    }
                    // --> When using a local image, add dimensions.
                    // {
                    //     source: require("yourApp/image.png"),
                    //     dimensions: { width: 1080, height: 1920 },
                    //     // width: 100
                    //     // height 100
                    // }
            }
            />
        );
    }
}
