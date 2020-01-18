<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LueHsoft LueH LABS Lue Hang luehang"/></a>
<br/>
<br/>

<h1 align="center">
    React Native Image Transformer
</h1>

An easy and simple to use React Native component to transform and translate an image with gestures like pan, pinch and double tap.  Supporting both iOS and Android. Free and made possible along with costly maintenance and updates by [Lue Hang](https://www.facebook.com/lue.hang) (the author).

- Supports pinch, double tap or pull.
- Includes guestures and important event listeners for pan, pinch, single tap and double tap.
- Easy to use.  Just include an image path.
- Supports local images.
- Won't capture children's press.
- Won't capture children's scroll, if children don't allow.
- Supports both iOS and Android.

<br/>

---
<br/>

<h1 align="center">
    <a href="https://www.luehangs.site/lue_hang/projects/react-native-image-transformer">
        <img src="https://www.luehangs.site/videos/react-native-image-transformer-demo.gif" alt="react-native-image-transformer"/>
    </a>
</h1>

<br/>
<br/>

# :link: Quick Links
- [Documentation](https://www.luehangs.site/lue_hang/projects/react-native-image-transformer)
- [Mobile Kit Marketplace](https://luehangs.site/marketplace/mobile-development)
- [React Native Development How To Dos](https://luehangs.site/blogs/react-native-development)
- [Chat](https://luehangs.site)

<br/>

---
<br/>

# :gem: Install

Type in the following to the command line to install the module.

```bash
$ npm install --save react-native-image-transformer
```

or

```bash
$ yarn add react-native-image-transformer
```

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :tada: Usage Example

Add an ``import`` to the top of the file.  At minimal, declare the ``ImageTransformer`` component in the ``render()`` method providing data in the ``image`` prop.

#### :information_source: Local images must have a defined `dimensions` field with `width` and `height` or just `height` and `width`.

> If you like [`react-native-image-transformer`](https://github.com/Luehang/react-native-image-transformer), please be sure to give it a star at [GitHub](https://github.com/Luehang/react-native-image-transformer). Thanks.

```javascript
import ImageTransformer from "react-native-image-transformer";

//...
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
//...
```

<br/>

---
<br/>

# :book: Full Documentation

<p>Learn more about the installation and how to use this package in the updated <a href="https://www.luehangs.site/lue_hang/projects/react-native-image-transformer" target="_blank">documentation</a> page.</p>

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :santa: Author

<a href="https://www.facebook.com/lue.hang">
<img src="https://www.luehangs.site/images/lue-hang2018-circle-150px.png"/>
</a>

Free and made possible along with costly maintenance and updates by [Lue Hang](https://www.facebook.com/lue.hang) (the author).

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :clap: Contribute

[Pull requests](https://github.com/Luehang/react-native-image-transformer/pulls) are welcomed.

<br/>

### :tophat: Contributors

Contributors will be posted here.

<br/>

### :baby: Beginners

Not sure where to start, or a beginner? Take a look at the [issues page](https://github.com/Luehang/react-native-image-transformer/issues).

<br/>
<br/>
<a href="https://luehangs.site/marketplace/product/RN%20Posting%20Demo%20App%20Kit"><img src="https://luehangs.site/images/lh-mobile-strip.jpg" alt="LueHsoft LueH LABS Lue Hang luehang"/></a>
<br/>
<br/>

## :page_facing_up: License

MIT © [Lue Hang](https://luehangs.site), as found in the LICENSE file.
