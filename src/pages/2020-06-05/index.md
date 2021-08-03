---
path: "/overlay-probs"
date: "2020-06-05"
title: "How to approach image overlay problems"
author: "ShauryaAg"
featured: True
---

Every image has three channels: R, G, B, that is, Red, Green, and Blue which is used to define the pixel value at any point in the image, where the value of red, green, or blue lies between 0–255.

For example: a pixel value of `[255, 0, 0]` would be all RED, and `[255, 255, 0]` would be a mix of RED and GREEN, which gives a YELLOW color.

But, if the image is read using OpenCV, it yields the image in BGR format, that is,`[255, 0, 0]` would be BLUE and so on.

# **Installing OpenCV**

OpenCV is an open-source library for image manipulation in Python or C language.

For Python OpenCV can be downloaded using `pip install opencv-python`.

# **Reading an image in OpenCV**

Any image can be read in opencv using `cv2.imread()` command. However, OpenCV doesn’t support HEIC images yet, you may have to use another library like Pillow to read HEIC images (or convert them into .JPEG first).

```
import cv2image = cv2.imread(‘image.jpg’)
```

After reading the image, it can be converted into RGB format from BGR if necessary, using `cv2.cvtColor()` command.

```
image\_rgb = cv2.cvtColor(image, cv2.COLOR\_BGR2RGB)image\_gray = cv2.cvtColor(image, cv2.COLOR\_BGR2GRAY)
```

# **Overlays**

Images are nothing but a bunch of pixel values stored in a matrix-like format. The value of any pixel can be changed independently of the others.

Let’s say there’s an image

<img alt="" class="t u v jq aj" src="https://miro.medium.com/max/572/1\*XgyADwwHbdnHXcd2pOnM8A.jpeg" width="286" height="270" srcSet="https://miro.medium.com/max/552/1\*XgyADwwHbdnHXcd2pOnM8A.jpeg 276w, https://miro.medium.com/max/572/1\*XgyADwwHbdnHXcd2pOnM8A.jpeg 286w" sizes="286px" role="presentation"/>

image_1

Read the image using opencv:

```
image\_1 = cv2.imread(‘image\_1.jpg’)print(image\_1)
```

This gives a bunch of pixel values in matrix form.

```
array(\[\[\[107, 108, 106\],\[107, 108, 106\],\[107, 108, 106\],…,\[ 77, 78, 76\],\[ 77, 78, 76\],\[ 76, 77, 75\]\],…,\[\[ 93, 88, 87\],\[ 93, 88, 87\],\[ 92, 87, 86\],…,\[ 52, 62, 62\],\[ 52, 62, 62\],\[ 52, 62, 62\]\]\], dtype=uint8)
```

If you’d just change the pixel values of a certain area of the images to let’s say `[0, 0, 0]`, that area of the image would become BLACK as that’s the pixel values of the color BLACK. Similarly, if you’d change the pixel values to `[255, 0, 0]`, that area would become BLUE (OpenCV reads the images in BGR format).

```
image\_1\[50: 100, 50:100\] = \[255, 0, 0\]
```

<img alt="" class="t u v jq aj" src="https://miro.medium.com/max/572/1\*gM5ij0Qm6OmTwGnR7ZVfKA.jpeg" width="286" height="270" srcSet="https://miro.medium.com/max/552/1\*gM5ij0Qm6OmTwGnR7ZVfKA.jpeg 276w, https://miro.medium.com/max/572/1\*gM5ij0Qm6OmTwGnR7ZVfKA.jpeg 286w" sizes="286px" role="presentation"/>

Similarly, those pixel values can be replaced by another image, just by using the pixel values of that image.

In order to do that, you must reshape the overlaying image to the size whose pixels values you want to replace.

This can be done by using `cv2.resize()` function.

```
image\_2 = cv2.imread(‘image\_2.jpg’)resized\_image\_2 = cv2.resize(image\_2, dsize=(100, 100))
```

Here, `dsize` accepts the dimensions to which the image is to be resized

Now, the second image can be overlayed on the top of the first image.

```
image\_1\[50:150, 50:150\] = resized\_image\_2
```

<img alt="" class="t u v jq aj" src="https://miro.medium.com/max/572/1\*E0fWFABvt0L-26xVhViJxg.jpeg" width="286" height="270" srcSet="https://miro.medium.com/max/552/1\*E0fWFABvt0L-26xVhViJxg.jpeg 276w, https://miro.medium.com/max/572/1\*E0fWFABvt0L-26xVhViJxg.jpeg 286w" sizes="286px" role="presentation"/>

# **Overlaying PNG Images**

Unlike JPEG images, PNG (Portable Network Graphics) images can also have a 4th channel in them, that defines the ALPHA (opacity) at the given pixel.

OpenCV reads the PNGs in the same way as JPEGs (that is, with 3 channels) unless specified otherwise.

To read a PNG image with its Alpha values, we need to specify the flag `cv2.IMREAD_UNCHANGED` while reading an image.

Now, the image read has 4 channels: BGRA.

```
image\_3 = cv2.imread(‘image\_3.png’, cv2.IMREAD\_UNCHANGED)print(image\_3)array(\[\[\[0 0 0 0\]\[0 0 0 0\]\[0 0 0 0\]…\[0 0 0 0\]\[0 0 0 0\]\[0 0 0 0\]\]…\[\[0 0 0 0\]\[0 0 0 0\]\[0 0 0 0\]…\[0 0 0 0\]\[0 0 0 0\]\[0 0 0 0\]\]\], dtype=uint8)
```

(**\*\*Note:\*\*** The values printed are all 0s because the starting and ending of the image are blanks)

<img alt="" class="t u v jq aj" src="https://miro.medium.com/max/1280/1\*R-utGCtvBqGXnwq361JJAA.png" width="640" height="320" srcSet="https://miro.medium.com/max/552/1\*R-utGCtvBqGXnwq361JJAA.png 276w, https://miro.medium.com/max/1104/1\*R-utGCtvBqGXnwq361JJAA.png 552w, https://miro.medium.com/max/1280/1\*R-utGCtvBqGXnwq361JJAA.png 640w" sizes="640px" role="presentation"/>

However, this image has 4 channels but our JPEG image has only 3 channels so, those values can not simply be replaced.

We need to add a dummy channel in our JPEG image.

For this, we will use a `numpy`. It can be installed using `pip install numpy` .

numpy offers a function `numpy.dstack()` to stack values against along the depth.

First, we need a dummy array of the same size as of the image.

To create a dummy channel we can use `numpy.ones()` function to create an array of ones.

```
import numpy as npones = np.ones((image\_1.shape\[0\], image\_1.shape\[1\]))\*255image\_1 = np.dstack(\[image\_1, ones\])
```

We are multiplying the array of ones with 255 because the value of the alpha channel also exists between 0–255.

Now, you can replace the pixel values of the image with the PNG image.

```
image\_1\[150:250, 150:250\] = image\_3
```

However, it will not give the desired result as we are also changing the value of the alpha channel to zero.

<img alt="" class="t u v jq aj" src="https://miro.medium.com/max/572/1\*yfA-ZodeIfS7db8yOZdAJw.png" width="286" height="270" srcSet="https://miro.medium.com/max/552/1\*yfA-ZodeIfS7db8yOZdAJw.png 276w, https://miro.medium.com/max/572/1\*yfA-ZodeIfS7db8yOZdAJw.png 286w" sizes="286px" role="presentation"/>

We only need to replace those pixel values that have a non zero value.

To do that, you can always brute-force your way by checking each pixel value and replacing the non-zero ones, but that's time-consuming.

So, there’s a better way.

You can take the alpha values of the image that is to be overlayed.

```
alpha\_image\_3 = image\_3\[:, :, 3\] / 255.0
```

We are dividing the pixel values by 255.0 in order to keep the values between 0–1.

The sum of alpha of `image_1` and `image_3` needs to be equal to 255.

So, you can create another array which contains the values of the needed alpha to create the sum to be equal to 255.

`alpha_image = 1 — alpha_image_3`

Now, you can simply take element-wise product of the alpha values and the image pixel values of each channel of each image and take their sum.

```
for c in range(0, 3): image\_1\[150:250, 150:250, c\] = ((alpha\_image\*image\_1\[150:250,      150:250, c\]) + (alpha\_image\_3\*image\_3\[:, :, c\]))
```

<img alt="" class="t u v jq aj" src="https://miro.medium.com/max/572/1\*LXDIfYCSQRsax8zPlU-dbg.png" width="286" height="270" srcSet="https://miro.medium.com/max/552/1\*LXDIfYCSQRsax8zPlU-dbg.png 276w, https://miro.medium.com/max/572/1\*LXDIfYCSQRsax8zPlU-dbg.png 286w" sizes="286px" role="presentation"/>

Voilà! The image has now been overlayed on top of the other. ez pz :)
