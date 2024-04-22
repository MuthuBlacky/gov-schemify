import {create } from 'zustand';

type PromptStore= {
  prompt : string,
  setPrompt : (val :string)=> void
};
export const usePromptStore = create<PromptStore> ((set) => ({
    prompt : "",
    setPrompt : (val : string)=> {
        set({prompt : val})
    }
}))