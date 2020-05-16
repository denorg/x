import { parseFlags } from '../../lib/flags.ts';
import { IParseOptions, OptionType } from '../../lib/types.ts';
import { assertEquals, assertThrows } from '../lib/assert.ts';

const options = <IParseOptions>{
    stopEarly: false,
    allowEmpty: false,
    flags: [ {
        name: 'flag',
        aliases: [ 'f', 'fl', 'flags' ],
        type: OptionType.BOOLEAN,
        optionalValue: true
    } ]
};

Deno.test( 'flags optionAliases f', () => {

    const { flags, unknown, literal } = parseFlags( [ '-f' ], options );

    assertEquals( flags, { flag: true } );
    assertEquals( unknown, [] );
    assertEquals( literal, [] );
} );

Deno.test( 'flags optionAliases fl', () => {

    const { flags, unknown, literal } = parseFlags( [ '--fl' ], options );

    assertEquals( flags, { flag: true } );
    assertEquals( unknown, [] );
    assertEquals( literal, [] );
} );

Deno.test( 'flags optionAliases flag', () => {

    const { flags, unknown, literal } = parseFlags( [ '--flag' ], options );

    assertEquals( flags, { flag: true } );
    assertEquals( unknown, [] );
    assertEquals( literal, [] );
} );

Deno.test( 'flags optionAliases flags', () => {

    const { flags, unknown, literal } = parseFlags( [ '--flags' ], options );

    assertEquals( flags, { flag: true } );
    assertEquals( unknown, [] );
    assertEquals( literal, [] );
} );

Deno.test( 'flags optionAliases InvalidValue f', () => {

    assertThrows(
        () => parseFlags( [ '-f', 'value' ], options ),
        Error,
        'Option --flag must be of type boolean but got: value'
    );
} );

Deno.test( 'flags optionAliases InvalidValue fl', () => {

    assertThrows(
        () => parseFlags( [ '--fl', 'value' ], options ),
        Error,
        'Option --flag must be of type boolean but got: value'
    );
} );

Deno.test( 'flags optionAliases InvalidValue flag', () => {

    assertThrows(
        () => parseFlags( [ '--flag', 'value' ], options ),
        Error,
        'Option --flag must be of type boolean but got: value'
    );
} );

Deno.test( 'flags optionAliases InvalidValue flags', () => {

    assertThrows(
        () => parseFlags( [ '--flags', 'value' ], options ),
        Error,
        'Option --flag must be of type boolean but got: value'
    );
} );
