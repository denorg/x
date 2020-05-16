/**
Delay for specified milliseconds. Use delay.frame() if you wish to delay for a frame.
@author vincent <vincent@vincentvictoria.com>
@see {@link https://www.vincentvictoria}
@see {@link https://www.github.com/vincentvictoria/delay}
*/
export async function delay( /** @type {number} */ ms ) {
    return new Promise( ( resolve ) => {
        setTimeout( resolve, ms );
    } );
}

/**
 * Delay for a frame using requestAnimationFrame()
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame}
 */
delay.frame = async function() {
    let r;
    let p = new Promise( function( resolve, reject ) { r = resolve; } );
    requestAnimationFrame( () => { r(); } );
    return p;
}

export default delay;