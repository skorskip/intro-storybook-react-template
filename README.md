# Storybook with Snowplow Tracker Sample

This is a sample ToDo project demonstrating the usage of [Storybook.js](https://storybook.js.org/docs/react/get-started/introduction) and [Snowplow Browser Tracker](https://docs.snowplowanalytics.com/docs/collecting-data/collecting-from-own-applications/javascript-trackers/browser-tracker/)

## Starting the Project

Install all dependancies and start the project, site will be running at http://localhost:3000/

```bash
npm install
npm start
```

## Running Storybook

Run the Storybook.js documentation interface by running:

```bash
npm run storybook
```

## Snowplow Setup

The snowplow browser tracker is setup inside the [App.js](src/App.js) file.  

### Update Collector
Currently the collector is pointing to an endpoint running at http://localhost:8080, this can be updated within the *newTracker* method.

```js
newTracker('sp1', 'http://localhost:8080', {appId:'my-app-id', plugins: []});
```

## Snowplow Interceptor

This project includes an event interceptor that can be configured at [snowplow-interceptor.js](src/utils/snowplow-interceptor.js), it is instantiated inside [App.js](src/App.js) file.  The interceptor attaches a click event listener to the body of the DOM and will capture all click events (except those that are not propagating).

### Usage
When instantiated it will, by default, attach an event listener to the body, but if a specific html id is passed as a parameter it will attach an event listener to that specific element.  An example of this is within the [Task.js](src/components/Task/Task.js) file.

```js
useEffect(() => {
  SnowPlowInterceptor("pin-" + id);
}, [id]);
```

### Update Event Type
The project currently shows how to capture a custom iglu schema, the event type being tracked can be updated within the *trackEvent* method as well as items that are captured.

```js
    const trackEvent = (e) => {
        trackSelfDescribingEvent({
            event : {
                schema: 'iglu:com.test/task_click/jsonschema/1-0-0',
                data: {
                    classList: getClassList(e.target),
                    eventType: e.type,
                    objectId: e.target.id,
                    tagType: e.target.localName,
                    timestampField: new Date().toISOString()
                }
            }
        })
    }
```

