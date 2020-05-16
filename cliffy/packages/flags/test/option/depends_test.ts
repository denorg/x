import { parseFlags } from '../../lib/flags.ts';
import { IParseOptions, OptionType } from '../../lib/types.ts';
import { assertEquals, assertThrows } from '../lib/assert.ts';

const options = <IParseOptions>{
    allowEmpty: true,
    flags: [ {
        name: 'video-type',
        aliases: [ 'v' ],
        type: OptionType.STRING,
        depends: [ 'audio-type', 'image-type' ]
    }, {
        name: 'audio-type',
        aliases: [ 'a' ],
        type: OptionType.STRING,
        depends: [ 'video-type', 'image-type' ]
    }, {
        name: 'image-type',
        aliases: [ 'i' ],
        type: OptionType.STRING,
        depends: [ 'video-type', 'audio-type' ]
    } ]
};

Deno.test( 'flags optionDepends noArguments', () => {

    const { flags, unknown, literal } = parseFlags( [], options );

    assertEquals( flags, {} );
    assertEquals( unknown, [] );
    assertEquals( literal, [] );
} );

Deno.test( 'flags optionDepends videoAudioImageType', () => {

    const { flags, unknown, literal } = parseFlags( [ '-v', 'value', '-a', 'value', '--image-type', 'value' ], options );

    assertEquals( flags, { videoType: 'value', audioType: 'value', imageType: 'value' } );
    assertEquals( unknown, [] );
    assertEquals( literal, [] );
} );

Deno.test( 'flags optionDepends videoType', () => {

    assertThrows(
        () => parseFlags( [ '-v', 'value' ], options ),
        Error,
        'Option --video-type depends on option: --audio-type'
    );
} );

Deno.test( 'flags optionDepends audioType', () => {

    assertThrows(
        () => parseFlags( [ '-a', 'value' ], options ),
        Error,
        'Option --audio-type depends on option: --video-type'
    );
} );

Deno.test( 'flags optionDepends imageType', () => {

    assertThrows(
        () => parseFlags( [ '-i', 'value' ], options ),
        Error,
        'Option --image-type depends on option: --video-type'
    );
} );

Deno.test( 'flags optionDepends videoAudio', () => {

    assertThrows(
        () => parseFlags( [ '-v', 'value', '-a', 'value' ], options ),
        Error,
        'Option --video-type depends on option: --image-type'
    );
} );

Deno.test( 'flags optionDepends audioVideo', () => {

    assertThrows(
        () => parseFlags( [ '-a', 'value', '-v', 'value' ], options ),
        Error,
        'Option --audio-type depends on option: --image-type'
    );
} );

Deno.test( 'flags optionDepends imageVideo', () => {

    assertThrows(
        () => parseFlags( [ '-i', 'value', '-v', 'value' ], options ),
        Error,
        'Option --image-type depends on option: --audio-type'
    );
} );

const options2 = {
    allowEmpty: true,
    flags: [ {
        name: 'standalone',
        type: OptionType.BOOLEAN,
        standalone: true
    }, {
        name: 'flag1',
        type: OptionType.BOOLEAN,
        depends: [ 'flag2' ]
    }, {
        name: 'flag2',
        type: OptionType.BOOLEAN,
        depends: [ 'flag1' ],
        default: false
    } ]
};

Deno.test( 'flags depends: should accept no arguments', () => {

    const { flags, unknown, literal } = parseFlags( [], options2 );

    assertEquals( flags, { flag2: false } );
    assertEquals( unknown, [] );
    assertEquals( literal, [] );
} );

Deno.test( 'flags depends: should accept --standalone', () => {

    const { flags, unknown, literal } = parseFlags( [ '--standalone' ], options2 );

    assertEquals( flags, { standalone: true, flag2: false } );
    assertEquals( unknown, [] );
    assertEquals( literal, [] );
} );

Deno.test( 'flags depends: should not accept --no-flag2', () => {
    assertThrows(
        () => parseFlags( [ '--no-flag2' ], options2 ),
        Error,
        'Option --flag2 depends on option: --flag1'
    );
} );

Deno.test( 'flags depends: should accept --flag1 --no-flag2', () => {

    const { flags, unknown, literal } = parseFlags( [ '--flag1', '--no-flag2' ], options2 );

    assertEquals( flags, { flag1: true, flag2: false } );
    assertEquals( unknown, [] );
    assertEquals( literal, [] );
} );

Deno.test( 'flags depends: should accept --no-flag1 --no-flag2', () => {

    const { flags, unknown, literal } = parseFlags( [ '--no-flag1', '--no-flag2' ], options2 );

    assertEquals( flags, { flag1: false, flag2: false } );
    assertEquals( unknown, [] );
    assertEquals( literal, [] );
} );

Deno.test( 'flags depends: should accept --flag1', () => {

    const { flags, unknown, literal } = parseFlags( [ '--flag1' ], options2 );

    assertEquals( flags, { flag1: true, flag2: false } );
    assertEquals( unknown, [] );
    assertEquals( literal, [] );
} );

Deno.test( 'flags depends: should accept --flag1 --flag2', () => {

    const { flags, unknown, literal } = parseFlags( [ '--flag1', '--flag2' ], options2 );

    assertEquals( flags, { flag1: true, flag2: true } );
    assertEquals( unknown, [] );
    assertEquals( literal, [] );
} );

Deno.test( 'flags depends: should accept --flag1 --flag2', () => {

    const { flags, unknown, literal } = parseFlags( [ '--flag1', '--flag2', 'true' ], options2 );

    assertEquals( flags, { flag1: true, flag2: true } );
    assertEquals( unknown, [] );
    assertEquals( literal, [] );
} );

Deno.test( 'flags depends: should accept --flag1 --flag2 false', () => {

    const { flags, unknown, literal } = parseFlags( [ '--flag1', '--flag2', 'false' ], options2 );

    assertEquals( flags, { flag1: true, flag2: false } );
    assertEquals( unknown, [] );
    assertEquals( literal, [] );
} );
