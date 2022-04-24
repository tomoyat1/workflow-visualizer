import React from 'react';

export type StepProps = {
    task: {
        id: string,
        title: string,
        state: string,
        updatedAt: Date
    },
    onArchiveTask: any,
    onPinTask: any,
}

const Step: React.FC<StepProps> = ({task: {id, title, state}, onArchiveTask, onPinTask}) => {
    return (
        <div className={`list-item ${state}`}>
            <label className="checkbox">
                <input
                    type="checkbox"
                    defaultChecked={state === "TASK_ARCHIVED"}
                    disabled={true}
                    name="checked"
                />
                <span
                    className="checkbox-custom"
                    onClick={() => onArchiveTask(id)}
                    id={`archiveTask-${id}`}
                    aria-label={`archiveTask-${id}`}
                />
            </label>
            <div className="title">
                <input type="text" value={title} readOnly={true} placeholder="Input title"/>
            </div>

            <div className="actions" onClick={event => event.stopPropagation()}>
                {state !== "TASK_ARCHIVED" && (
                    <a onClick={() => onPinTask(id)}>
                        <span className={`icon-star`} id={`pinTask-${id}`} aria-label={`pinTask-${id}`} />
                    </a>
                )}
            </div>

        </div>
    );
}

export default Step;
