import React from "react";
import { View, Text, Image, ViewPropTypes, Dimensions } from "react-native";
import PropTypes from "prop-types";
import ViewTransformer from "react-native-easy-view-transformer";

export default class ImageTransformer extends React.Component {
    static propTypes = {
        image: PropTypes.shape({
            uri: PropTypes.string,
            dimensions: PropTypes.shape({
                width: PropTypes.number,
                height: PropTypes.number
            })
        }).isRequired,
        index: PropTypes.number,
        style: ViewPropTypes
            ? ViewPropTypes.style
            : View.propTypes.style,
        onLoad: PropTypes.func,
        onLoadStart: PropTypes.func,
        enableTransform: PropTypes.bool,
        enableScale: PropTypes.bool,
        maxScale: PropTypes.number,
        enableTranslate: PropTypes.bool,
        enableResistance: PropTypes.bool,
        resistantStrHorizontal: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.number,
            PropTypes.string
        ]),
        resistantStrVertical: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.number,
            PropTypes.string
        ]),
        maxOverScrollDistance: PropTypes.number,
        onTransformStart: PropTypes.func,
        onPinchTransforming: PropTypes.func,
        onPinchStartReached: PropTypes.func,
        onPinchEndReached: PropTypes.func,
        onViewTransformed: PropTypes.func,
        onTransformGestureReleased: PropTypes.func,
        onSwipeUpReleased: PropTypes.func,
        onSwipeDownReleased: PropTypes.func,
        onDoubleTapStartReached: PropTypes.func,
        onDoubleTapEndReached: PropTypes.func,
        onDoubleTapConfirmed: PropTypes.func,
        onSingleTapConfirmed: PropTypes.func,
        imageComponent: PropTypes.func,
        resizeMode: PropTypes.string,
        errorComponent: PropTypes.func,
        onLayout: PropTypes.func,
    };

    static defaultProps = {
        index: 0,
        enableTransform: true,
        enableScale: true,
        enableTranslate: true,
        enableResistance: true,
        imageComponent: undefined,
        resizeMode: "contain"
    };

    constructor (props) {
        super(props);

        this.onLayout = this.onLayout.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onLoadStart = this.onLoadStart.bind(this);
        this.getViewTransformerInstance =
            this.getViewTransformerInstance.bind(this);
        this.renderError = this.renderError.bind(this);
        this.onOrientation = this.onOrientation.bind(this);

        this.state = {
            viewWidth: 0,
            viewHeight: 0,
            imageLoaded: false,
            imageDimensions: props.image.dimensions
                ? props.image.dimensions
                : props.image.width && props.image.height
                ? { width: props.image.width, height: props.image.height }
                : undefined,
            keyAccumulator: 1,
            source: undefined,
            enableOrientation: false
        };
    }

    UNSAFE_componentWillMount () {
        this._mounted = true;

        // TO DO: Find better way to get initial states
        Dimensions.addEventListener("change", this.onOrientation);
        if (!this.state.source) {
            this.getImageSource(this.props.image);
        }
        if (!this.state.imageDimensions) {
            this.getImageSize(this.props.image);
        }
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (!sameImage(this.props.image, nextProps.image)) {
            // image source changed, clear last
            // image's imageDimensions info if any
            this.setState({
                imageDimensions: nextProps.image.dimensions
                    ? nextProps.image.dimensions
                    : nextProps.image.width && nextProps.image.height
                    ? { width: nextProps.image.width, height: nextProps.image.height }
                    : undefined,
                keyAccumulator: this.state.keyAccumulator + 1,
                imageLoaded: false
            });
            if (!nextProps.image.source) {
                this.getImageSource(nextProps.image);
            }
            // if we don't have image dimensions provided in source
            if (!nextProps.image.dimensions) {
                this.getImageSize(nextProps.image);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.enableOrientation) {
            return true;
        } else if (nextState.imageLoaded && !this.state.imageLoaded) {
            return true;
        }
        return false;
    }

    componentWillUnmount () {
        Dimensions.removeEventListener("change", this.onOrientation);
        this._mounted = false;
    }

    onLoadStart (e) {
        this.props.onLoadStart && this.props.onLoadStart(e);
        if (this.state.imageLoaded) {
            this.setState({ imageLoaded: false });
        }
    }

    onLoad (e) {
        this.props.onLoad && this.props.onLoad(e);
        if (!this.state.imageLoaded) {
            this.setState({ imageLoaded: true });
        }
    }

    onLayout (e) {
        let {width, height} = e.nativeEvent.layout;
        if (this.state.viewWidth !== width || this.state.viewHeight !== height) {
            this.setState({ viewWidth: width, viewHeight: height });
        }

        this.props.onLayout && this.props.onLayout(e);
    }

    onOrientation() {
        this.setState({
            enableOrientation: true
        });
    }

    getImageSize (image) {
        if (!image) {
            return;
        }

        const uri = image.source && image.source.uri
            ? image.source.uri : image.uri
            ? image.uri : image.URI
            ? image.URI : image.url
            ? image.url : image.URL
            ? image.URL : undefined;

        if (image.dimensions && image.dimensions.width && image.dimensions.height) {
            this._mounted && this.setState({
                imageDimensions: image.dimensions
            });
            return;
        }

        if (image.width && image.height) {
            this._mounted && this.setState({
                imageDimensions: {
                    width: image.width,
                    height: image.height
                }
            });
            return;
        }

        if (uri) {
            Image.getSize(
                uri,
                (width, height) => {
                    if (width && height) {
                        if (
                            this.state.imageDimensions &&
                            this.state.imageDimensions.width === width &&
                            this.state.imageDimensions.height === height
                        ) {
                            // no need to update state
                        } else {
                            this._mounted && this.setState({
                                imageDimensions: { width, height }
                            });
                        }
                    }
                },
                () => {
                    this._mounted && this.setState({ error: true });
                }
            );
        } else {
            // eslint-disable-next-line no-console
            console.warn(
                "react-native-image-transformer",
                "Please provide dimensions for your local images."
            );
        }
    }

    getImageSource (image) {
        const source = image.source
            ? image.source : image.uri
            ? { uri: image.uri } : image.URI
            ? { uri: image.URI } : image.url
            ? { uri: image.url } : image.URL
            ? { uri: image.URL } : undefined;

        if (source) {
            this.setState({ source });
        } else {
            // eslint-disable-next-line no-console
            console.warn(
                "react-native-image-transformer",
                "Please provide a valid image field in " +
                "data images. Ex. source, uri, URI, url, URL"
            );
        }
    }

    getViewTransformerInstance () {
        return this.viewTransformer;
    }

    renderError () {
        return (this.props.errorComponent && this.props.errorComponent()) || (
            <View style={{
                flex: 1,
                backgroundColor: "black",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Text
                    style={{
                        color: "white",
                        fontSize: 15,
                        fontStyle: "italic"
                    }}>
                    This image cannot be displayed...
                </Text>
            </View>
        );
    }

    render () {
        const {
            source, imageDimensions, viewWidth, viewHeight,
            error, keyAccumulator, imageLoaded
        } = this.state;
        const {
            style, imageComponent, resizeMode, enableTransform,
            enableScale, maxScale, enableTranslate, enableResistance,
            resistantStrHorizontal, resistantStrVertical,
            maxOverScrollDistance, onTransformStart, onViewTransformed,
            onPinchTransforming,  onPinchStartReached,
            onPinchEndReached, onTransformGestureReleased,
            onSwipeUpReleased, onSwipeDownReleased,
            onDoubleTapStartReached, onDoubleTapEndReached,
            onDoubleTapConfirmed, onSingleTapConfirmed,
            index
        } = this.props;

        let resolvedMaxScale = 1;
        let contentAspectRatio;
        let width, height; // imageDimensions

        if (imageDimensions) {
            width = imageDimensions.width;
            height = imageDimensions.height;
        }

        if (width && height) {
            contentAspectRatio = width / height;
            if (viewWidth && viewHeight) {
                if (!maxScale) {
                    resolvedMaxScale = Math.max(width / viewWidth, height / viewHeight);
                    resolvedMaxScale = Math.max(1, resolvedMaxScale);
                } else {
                    resolvedMaxScale = maxScale;
                }
            }
        }

        const imageProps = {
            ...this.props,
            imageLoaded,
            source: source,
            style: [style, { backgroundColor: "transparent" }],
            resizeMode: resizeMode,
            onLoadStart: this.onLoadStart,
            onLoad: this.onLoad,
            capInsets: { left: 0.1, top: 0.1, right: 0.1, bottom: 0.1 }
        };

        const content = error
            ? this.renderError()
            : imageComponent
            ? imageComponent(imageProps, imageDimensions, index)
            : <Image { ...imageProps } />;

        return (
            <ViewTransformer
                ref={(component) => (this.viewTransformer = component)}
                // when image source changes, we should use a different
                // node to avoid reusing previous transform state
                key={"viewTransformer#" + keyAccumulator}
                // disable transform until image is loaded
                enableTransform={enableTransform && imageLoaded}
                enableScale={enableScale}
                enableTranslate={enableTranslate}
                enableResistance={enableResistance}
                resistantStrHorizontal={resistantStrHorizontal}
                resistantStrVertical={resistantStrVertical}
                maxOverScrollDistance={maxOverScrollDistance}
                onTransformStart={onTransformStart}
                onViewTransformed={onViewTransformed}
                onPinchTransforming={onPinchTransforming}
                onPinchStartReached={onPinchStartReached}
                onPinchEndReached={onPinchEndReached}
                onTransformGestureReleased={onTransformGestureReleased}
                onSwipeUpReleased={onSwipeUpReleased}
                onSwipeDownReleased={onSwipeDownReleased}
                onDoubleTapStartReached={onDoubleTapStartReached}
                onDoubleTapEndReached={onDoubleTapEndReached}
                onDoubleTapConfirmed={onDoubleTapConfirmed}
                onSingleTapConfirmed={onSingleTapConfirmed}
                maxScale={resolvedMaxScale}
                contentAspectRatio={contentAspectRatio}
                onLayout={this.onLayout}
                style={style}>
                    { content }
            </ViewTransformer>
        );
    }
}

function sameImage (source, nextSource) {
    if (source === nextSource) {
        return true;
    }
    if (source && nextSource) {
		const uri = findUri(source);
		const nextUri = findUri(nextSource);
        if (uri && nextUri) {
            return uri === nextUri;
        }
    }
    return false;
}

function findUri (data) {
	return data.source
		? data.source : data.uri
		? { uri: data.uri } : data.URI
		? { uri: data.URI } : data.url
		? { uri: data.url } : data.URL
		? { uri: data.URL } : undefined;
}
