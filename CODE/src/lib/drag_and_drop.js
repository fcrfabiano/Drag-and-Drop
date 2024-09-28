// -- FUNCTIONS

export function draggable(
    node,
    data
    )
{
    let state = data;

    node.draggable = true;
    node.style.cursor = 'grab';

    function handleDragStartEvent(
        event
        )
    {
        event.dataTransfer.setData(
            'text/plain',
            state
            );
    }

    node.addEventListener( 'dragstart', handleDragStartEvent );

    return (
        {
            update(
                data
                )
            {
                state = data;
            },
            destroy(
                )
            {
                node.removeEventListener( 'dragstart', handleDragStartEvent );
            }
        }
        );
}

// ~~

export function dropzone(
    node,
    optionMap
    )
{
    let stateMap =
    {
        dropEffect: 'move',
        dragOverClass: 'dropzone-droppable',
        ...optionMap
    };

    function handleDragEnterEvent(
        event
        )
    {
        event.target.classList.add( stateMap.dragOverClass );
    }

    function handleDragLeaveEvent(
        event
        )
    {
        event.target.classList.remove( stateMap.dragOverClass );
    }

    function handleDragOverEvent(
        event
        )
    {
        event.preventDefault();
        event.dataTransfer.dropEffect = stateMap.dropEffect;
    }

    function handleDropEvent(
        event
        )
    {
        event.preventDefault();
        let data = event.dataTransfer.getData( 'text/plain' );
        event.target.classList.remove( stateMap.dragOverClass );
        stateMap.handleOnDropzoneEvent( data, event );
    }

    node.addEventListener( 'dragenter', handleDragEnterEvent );
    node.addEventListener( 'dragleave', handleDragLeaveEvent );
    node.addEventListener( 'dragover', handleDragOverEvent );
    node.addEventListener( 'drop', handleDropEvent );

    return(
        {
            update(
                optionMap
                )
            {
                stateMap =
                {
                    dropEffect: 'move',
                    dragOverClass: 'dropzone-droppable',
                    ...optionMap
                };
            },
            destroy(
                )
            {
                node.removeEventListener( 'dragenter', handleDragEnterEvent );
                node.removeEventListener( 'dragleave', handleDragLeaveEvent );
                node.removeEventListener( 'dragover', handleDragOverEvent );
                node.removeEventListener( 'drop', handleDropEvent );
            }
        }
        );
}