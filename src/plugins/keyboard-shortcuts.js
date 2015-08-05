'use strict';

/*
  The reason this file doesn't have some sort of generative
  event handlers is that they are generic now but are going
  to have "context" applied to them in the future.

  The functions may eventually be split into multiple files
  to reduce closures but for now, this is fine.
 */

function keyboardShortcuts(app, opts, done){

  const { keypress, handlers } = app;

  const {
    F3,
    F7,
    TAB,
    ESC,
    CTRL_N,
    CTRL_O,
    CTRL_P,
    CTRL_S,
    CTRL_T,
    CTRL_F4,
    CTRL_UP,
    SHIFT_F3,
    SHIFT_TAB,
    CTRL_DOWN,
    CTRL_SHIFT_S
  } = keypress;

  const {
    newFile,
    saveFile,
    hideOverlay,
    showSaveOverlay,
    showProjectsOverlay,
    findNext,
    findPrevious,
    replace,
    moveByScrollUpLine,
    moveByScrollDownLine,
    indent,
    dedent,
    print,
    syntaxCheck
  } = handlers;

  keypress(CTRL_N, function(evt){
    evt.preventDefault();
    newFile();
  });

  keypress(CTRL_S, function(evt){
    evt.preventDefault();
    saveFile();
  });

  keypress(CTRL_SHIFT_S, function(evt){
    evt.preventDefault();
    showSaveOverlay();
  });

  keypress(CTRL_O, function(evt){
    evt.preventDefault();
    showProjectsOverlay();
  });

  keypress(ESC, function(evt){
    evt.preventDefault();
    // TODO: this won't clear text in a textbox, need to move to store?
    hideOverlay();
  });

  keypress(F3, function(evt){
    evt.preventDefault();
    findNext();
  });

  keypress(SHIFT_F3, function(evt){
    evt.preventDefault();
    findPrevious();
  });

  keypress(CTRL_F4, function(evt){
    evt.preventDefault();
    replace();
  });

  keypress(CTRL_UP, function(evt){
    evt.preventDefault();
    moveByScrollUpLine();
  });

  keypress(CTRL_DOWN, function(evt){
    evt.preventDefault();
    moveByScrollDownLine();
  });

  keypress(TAB, function(evt){
    evt.preventDefault();
    indent();
  });

  keypress(SHIFT_TAB, function(evt){
    evt.preventDefault();
    dedent();
  });

  keypress(CTRL_P, function(evt){
    evt.preventDefault();
    print();
  });

  keypress(CTRL_T, function(evt){
    evt.preventDefault();
    syntaxCheck();
  });

  // TODO: combine with CTRL_T handler
  keypress(F7, function(evt){
    evt.preventDefault();
    syntaxCheck();
  });

  done();
}

module.exports = keyboardShortcuts;
