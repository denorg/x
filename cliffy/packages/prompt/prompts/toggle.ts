import { blue, dim, underline } from 'https://deno.land/std@v0.50.0/fmt/colors.ts';
import { KeyEvent } from '../../keycode/lib/key-event.ts';
import { Figures } from '../lib/figures.ts';
import { GenericInput, GenericInputPromptOptions, GenericInputPromptSettings } from '../lib/generic-input.ts';

export interface ToggleOptions extends GenericInputPromptOptions<boolean> {
    active?: string;
    inactive?: string;
}

export interface ToggleSettings extends GenericInputPromptSettings<boolean> {
    active: string;
    inactive: string;
}

export class Toggle extends GenericInput<boolean, ToggleSettings> {

    public static async prompt( options: string | ToggleOptions ): Promise<boolean | undefined> {

        if ( typeof options === 'string' ) {
            options = { message: options };
        }

        return new this( {
            pointer: blue( Figures.POINTER_SMALL ),
            active: 'Yes',
            inactive: 'No',
            ...options
        } ).prompt();
    }

    protected setPrompt( message: string ) {

        message += ` ${ this.settings.pointer } `;

        if ( this.input === this.settings.active ) {
            message += `${ dim( `${ this.settings.inactive } /` ) } ${ underline( this.settings.active ) }`;
        } else if ( this.input === this.settings.inactive ) {
            message += `${ underline( this.settings.inactive ) } ${ dim( `/ ${ this.settings.active }` ) }`;
        } else {
            message += dim( `${ this.settings.inactive } / ${ this.settings.active }` );
        }

        this.write( message );
    }

    protected async read(): Promise<boolean> {

        this.screen.cursorHide();

        return super.read();
    }

    protected async handleEvent( event: KeyEvent ): Promise<boolean> {

        switch ( event.name ) {

            case 'c':
                if ( event.ctrl ) {
                    return Deno.exit( 0 );
                }
                break;

            case this.settings.inactive[ 0 ].toLowerCase():
            case 'n': // no nein non
            case 'left':
                this.selectInactive();
                break;

            case this.settings.active[ 0 ].toLowerCase():
            case 'y': // yes
            case 'j': // ja
            case 's': // si
            case 'o': // oui
            case 'right':
                this.selectActive();
                break;

            case 'return':
            case 'enter':
                return true;
        }

        return false;
    }

    protected selectActive() {
        this.input = this.settings.active;
    }

    protected selectInactive() {
        this.input = this.settings.inactive;
    }

    protected validate( value: string ): boolean {
        return [ this.settings.active, this.settings.inactive ].indexOf( value ) !== -1;
    }

    protected transform( value: string ): boolean | undefined {
        switch ( value ) {
            case this.settings.active:
                return true;
            case this.settings.inactive:
                return false;
        }
        return;
    }

    protected format( value: boolean ): string {
        return value ? this.settings.active : this.settings.inactive;
    }
}
