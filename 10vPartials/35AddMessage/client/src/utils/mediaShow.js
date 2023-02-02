export const imageShow = (src, theme) => <img src={src} alt="images" className="img-thumbnail" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />

export const videoShow = (src, theme) => <video controls src={src} alt="images" className="img-thumbnail" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
