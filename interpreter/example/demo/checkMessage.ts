import { TDesc } from "../app.ts";
export default function(state: TDesc["initialState"]) {
  return state.message.length !== 0;
}
