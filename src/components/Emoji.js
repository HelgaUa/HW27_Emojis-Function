import React from 'react';

function Emoji(props)  {
        const { src, alt, width, height, id, onClick } = props;
        return (
                <img className='emoji-item'
                     src={src}
                     id={id}
                     onClick={() => onClick(id)}
                     alt={alt}
                     style={{width, height}} />
        )
}
export default Emoji;
