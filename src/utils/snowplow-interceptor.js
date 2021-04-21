import { trackSelfDescribingEvent } from "@snowplow/browser-tracker";

export const SnowPlowInterceptor = (idRoot) => {
    var root = document.body// or const root = document.body

    if(idRoot !== null && idRoot !== undefined) {
        root = document.querySelector(`#${idRoot}`);
    }

    const getClassList = (target) => {
        if(target.classList.value === '') {
            return getClassList(target.parentElement);
        } else {
            return target.classList.value;
        }
    }

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

    if(root != null) {
        if(root.getAttribute("data-event") !== "added") {
            root.setAttribute("data-event", "added");
            root.addEventListener('click', (e) => {
                trackEvent(e);
            });
        }
    }
}

const trackEvent = (properties, state) => {
    console.log(properties, state);
};
  
export const SnowPlowReduxInterceptor = store => next => action => {
    // if (action.type === '@@router/LOCATION_CHANGE') {
    //     const nextPage = `${action.payload.pathname}${action.payload.search}`;
    //     trackPage(nextPage, store.getState());
    // }
    trackEvent(action.type, store.getState());

    return next(action);
};

