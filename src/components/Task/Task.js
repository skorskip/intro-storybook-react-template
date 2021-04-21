import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { SnowPlowInterceptor } from '../../utils/snowplow-interceptor';

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask}) {
    
    useEffect(() => {
      SnowPlowInterceptor("pin-" + id);
    }, [id]);

    return (
      <div className={`list-item ${state}`}>
        <label className="checkbox">
          <input
            type="checkbox"
            defaultChecked={state === 'TASK_ARCHIVED'}
            disabled={true}
            name="checked"
          />
          <span id={id + "-archive"} className="custom-checkbox" onClick={() => onArchiveTask(id)} />
        </label>
        <div className="title">
          <input type="text" value={title} readOnly={true} placeholder="Input title" />
        </div>
  
        <div className="actions" onClick={event => event.stopPropagation()}>
          {state !== 'TASK_ARCHIVED' && (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a onClick={() => onPinTask(id)}>
              <span id={"pin-" + id} className={`icon-star`} />
            </a>
          )}
        </div>
      </div>
    );
}

Task.propTypes = {
 /** Composition of the task */
 task: PropTypes.shape({
   /** Id of the task */
   id: PropTypes.string.isRequired,
   /** Title of the task */
   title: PropTypes.string.isRequired,
   /** Current state of the task */
   state: PropTypes.string.isRequired,
 }),
 /** Event to change the task to archived */
 onArchiveTask: PropTypes.func,
 /** Event to change the task to pinned */
 onPinTask: PropTypes.func,
};