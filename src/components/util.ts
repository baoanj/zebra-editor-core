import { v4 as uuidv4 } from 'uuid';
import Block from "./block";
import { createError } from "../util/handle-error";
let store: { [key: string]: any } = {};

export interface IStatistic {
  word: number;
  image: number;
  audio: number;
  video: number;
  table: number;
  list: number;
  code: number;
  block: number;
}

export const getId = () => {
  return uuidv4();
};

export const saveBlock = <T extends Block = Block>(
  component: T,
  key?: string
) => {
  if (key) {
    store[key] = component;
    return;
  }

  store[component.id] = component;
};

export const getBlockById = <T extends Block = Block>(id: string): T => {
  if (!id) {
    let article = store["article"];
    if (!article) throw createError("生成文章后调用。", undefined, "create");
    return store["article"].getChild(0);
  }
  return store[id];
};

export const clearBlock = () => {
  store = {};
};

export const mergerStatistic = (oldS: IStatistic, newS: IStatistic) => {
  return {
    word: oldS.word + newS.word,
    image: oldS.image + newS.image,
    audio: oldS.audio + newS.audio,
    video: oldS.video + newS.video,
    table: oldS.table + newS.table,
    list: oldS.list + newS.list,
    code: oldS.code + newS.code,
    block: oldS.block + newS.block
  };
};
