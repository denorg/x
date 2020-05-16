/// <reference types="./js-yaml.d.ts" />
import './js-yaml.min.js'

// Re-export keys
export let Type = window.jsyaml.Type
export let Schema = window.jsyaml.Schema
export let FAILSAFE_SCHEMA = window.jsyaml.FAILSAFE_SCHEMA
export let JSON_SCHEMA = window.jsyaml.JSON_SCHEMA
export let CORE_SCHEMA = window.jsyaml.CORE_SCHEMA
export let DEFAULT_SAFE_SCHEMA = window.jsyaml.DEFAULT_SAFE_SCHEMA
export let DEFAULT_FULL_SCHEMA = window.jsyaml.DEFAULT_FULL_SCHEMA
export let load = window.jsyaml.load
export let loadAll = window.jsyaml.loadAll
export let safeLoad = window.jsyaml.safeLoad
export let safeLoadAll = window.jsyaml.safeLoadAll
export let dump = window.jsyaml.dump
export let safeDump = window.jsyaml.safeDump
export let YAMLException = window.jsyaml.YAMLException
export let MINIMAL_SCHEMA = window.jsyaml.MINIMAL_SCHEMA
export let SAFE_SCHEMA = window.jsyaml.SAFE_SCHEMA
export let DEFAULT_SCHEMA = window.jsyaml.DEFAULT_SCHEMA
export let scan = window.jsyaml.scan
export let parse = window.jsyaml.parse
export let compose = window.jsyaml.compose
export let addConstructor = window.jsyaml.addConstructor
