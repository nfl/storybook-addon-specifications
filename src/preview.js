import addons from '@kadira/storybook-addons';
import { EVENT_ID } from './';

let currentStory = "";
let currentContext;

const results = {};
const beforeEachFunc = {};
const afterFunc = {};
const afterEachFunc = {};

function setContext(storyName, {
  skipped
} = {}) {
  if (!currentStory) {
    currentStory = storyName;
    results[currentStory] = {
      children: {},
      name: storyName,
      skipped: skipped || false,
      goodResults: [],
      wrongResults: []
    };
    currentContext = results[currentStory];
  } else {
    if (!currentContext.children[storyName]) {
      currentContext.children[storyName] = {
        children: {},
        name: storyName,
        skipped: skipped || false,
        goodResults: [],
        wrongResults: []
      };
    }

    currentContext = currentContext.children[storyName];
  }
}

function clearContext() {
  currentStory = "";
  currentContext = undefined;
}

export function specs(specs) {
  let storyName = specs();
  const channel = addons.getChannel();
  channel.emit(EVENT_ID, {results : results[storyName]});
}

export const describe = (storyName, func) => {
  setContext(storyName);
  func();

  if(afterFunc[currentStory]) afterFunc[currentStory]();

  clearContext();
  return storyName;
};

export const it = function (desc, func) {
  if(beforeEachFunc[currentStory]) beforeEachFunc[currentStory]();
  try {
    func();
    currentContext.goodResults.push(desc);
  } catch (e) {
    console.error(`${currentStory} - ${desc} : ${e}`);
    currentContext.wrongResults.push({spec: desc, message: e.message});
  }
  if(afterEachFunc[currentStory]) afterEachFunc[currentStory]();
};

export const before = function(func) {
  func()
};

export const beforeEach = function(func) {
  beforeEachFunc[currentStory] =  func;
};

export const after = function(func) {
  afterFunc[currentStory] =  func;
};

export const afterEach = function(func) {
  afterEachFunc[currentStory] =  func;
};

export const fit = function (desc, func) {
  it(desc, func)
};

export const xit = function (desc, func) {

};

export const xdescribe = function (storyName, func){
  currentStory = storyName;
  currentContext = {
    children: {},
    name: storyName,
    goodResults: [],
    wrongResults: []
  };
  return storyName;
};

describe.skip = function (storyName, func){
  setContext(storyName, {
    skipped: true
  });
  return storyName;
};

it.only = function (desc, func) {
  it(desc, func);
};

it.skip = function (desc, func) {

};

describe.only = function (storyName, func) {
  setContext(storyName);
  func();

  if(afterFunc[currentStory]) afterFunc[currentStory]();

  clearContext();
  return storyName;
};
