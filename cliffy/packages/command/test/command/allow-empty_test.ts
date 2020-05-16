import { Command } from '../../lib/command.ts';
import { assertEquals, assertThrowsAsync } from '../lib/assert.ts';

Deno.test( 'flags allowEmpty enabled', async () => {

    const { options, args } = await new Command()
        .throwErrors()
        .allowEmpty( true )
        .option( '-f, --flag [value:boolean]', 'description ...' )
        .action( () => {} )
        .parse( [ '-f' ] );

    assertEquals( options, { flag: true } );
    assertEquals( args, [] );
} );

Deno.test( 'flags allowEmpty disabledNoFlags', async () => {

    const { options, args } = await new Command()
        .throwErrors()
        .allowEmpty( true )
        .action( () => {} )
        .parse( [] );

    assertEquals( options, {} );
    assertEquals( args, [] );
} );

Deno.test( 'flags allowEmpty disabled', async () => {

    const cmd = new Command()
        .throwErrors()
        .allowEmpty( false )
        .option( '-f, --flag [value:boolean]', 'description ...' )
        .action( () => {} );

    await assertThrowsAsync( async () => {
        await cmd.parse( [] );
    }, Error, 'No arguments.' );
} );
