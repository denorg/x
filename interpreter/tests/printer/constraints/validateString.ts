import { TState } from '../printer.ts'

export default function validateString(state: TState){
  return state.message === "Hello! This is a test."
}