# brobbot-flickr-image

A brobbot plugin for image searches.

```
brobbot image [me] <query>
```

Searches Flickr for `query` and returns a random result's URL.

## Configuration

### API key

```bash
BROBBOT_FLICKR_IMAGE_KEY=key
```

Set the API key used to connect to the Flickr API (`api_key` param for Flickr API requests)

### Image size

```bash
BROBBOT_FLICKR_IMAGE_SIZE=size
```

Set the image size that the url will point to. Should be one of (`xsmall`, `small`, `medium`, `large`, `xlarge`, `original`).
See https://www.flickr.com/services/api/misc.urls.html for details.

