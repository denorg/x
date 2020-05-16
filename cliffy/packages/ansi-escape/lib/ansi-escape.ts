import { encode } from 'https://deno.land/std@v0.50.0/encoding/utf8.ts';
import { cursor, erase, image, ImageOptions, link, scroll } from './csi.ts';

export class AnsiEscape {

    /** Create instance from file. */
    public static from( file: Deno.WriterSync ): AnsiEscape {
        return new this( file );
    }

    protected constructor( protected file: Deno.WriterSync ) {}

    /** Write to file. */
    public write( code: string ): this {
        this.file.writeSync( encode( code ) );
        return this;
    }

    /**
     * Cursor
     */

    /** Move cursor to x, y, counting from the top left corner. */
    public cursorTo( x: number, y?: number ) {
        this.write( cursor.to( x, y ) );
        return this;
    }

    /** Move cursor by offset. */
    public cursorMove( x: number, y: number ) {
        this.write( cursor.move( x, y ) );
        return this;
    }

    /** Move cursor up by n lines. */
    public cursorUp( count: number = 1 ) {
        this.write( cursor.up( count ) );
        return this;
    }

    /** Move cursor down by n lines. */
    public cursorDown( count: number = 1 ) {
        this.write( cursor.down( count ) );
        return this;
    }

    /** Move cursor right by n lines. */
    public cursorForward( count: number = 1 ) {
        this.write( cursor.forward( count ) );
        return this;
    }

    /** Move cursor left by n lines. */
    public cursorBackward( count: number = 1 ) {
        this.write( cursor.backward( count ) );
        return this;
    }

    /** Move cursor to the beginning of the line n lines down. */
    public cursorNextLine( count: number = 1 ) {
        this.write( cursor.nextLine( count ) );
        return this;
    }

    /** Move cursor to the beginning of the line n lines up. */
    public cursorPrevLine( count: number = 1 ) {
        this.write( cursor.prevLine( count ) );
        return this;
    }

    /** Move cursor to first column of current row. */
    public cursorLeft() {
        this.write( cursor.left );
        return this;
    }

    /** Hide cursor. */
    public cursorHide() {
        this.write( cursor.hide );
        return this;
    }

    /** Show cursor. */
    public cursorShow() {
        this.write( cursor.show );
        return this;
    }

    /** Save cursor. */
    public cursorSave() {
        this.write( cursor.save );
        return this;
    }

    /** Restore cursor. */
    public cursorRestore() {
        this.write( cursor.restore );
        return this;
    }

    /**
     * Scroll
     */

    /** Scroll window up by n lines. */
    public scrollUp( count: number = 1 ) {
        this.write( scroll.up( count ) );
        return this;
    }

    /** Scroll window down by n lines. */
    public scrollDown( count: number = 1 ) {
        this.write( scroll.down( count ) );
        return this;
    }

    /**
     * Erase
     */

    /** Clear screen. */
    public eraseScreen() {
        this.write( erase.screen );
        return this;
    }

    /** Clear screen up. */
    public eraseUp( count: number = 1 ) {
        this.write( erase.up( count ) );
        return this;
    }

    /** Clear screen down. */
    public eraseDown( count: number = 1 ) {
        this.write( erase.down( count ) );
        return this;
    }

    /** Clear current line. */
    public eraseLine() {
        this.write( erase.line );
        return this;
    }

    /** Clear to line end. */
    public eraseLineEnd() {
        this.write( erase.lineEnd );
        return this;
    }

    /** Clear to line start. */
    public eraseLineStart() {
        this.write( erase.lineStart );
        return this;
    }

    /** Clear n line's up. */
    public eraseLines( count: number ) {
        this.write( erase.lines( count ) );
        return this;
    }

    /**
     * Style
     */

    /** Render link. */
    public link( text: string, url: string ) {
        this.write( link( text, url ) );
        return this;
    }

    /** Render image. */
    public image( buffer: Uint8Array, options?: ImageOptions ) {
        this.write( image( buffer, options ) );
        return this;
    }
}
