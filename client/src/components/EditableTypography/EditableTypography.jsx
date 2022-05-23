import React from 'react';
import styles from './EditableTypography.module.css'
const EditableTypography = ({edit, ...rest}) => {
    return (
        <>
            {edit ?
                <input  {...rest} className={`${styles.input} ${rest.className}`} />
                :
                <>
                    {rest.value}
                </>
            }
        </>
    );
};
export default EditableTypography