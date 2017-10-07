'use babel';

import { CompositeDisposable } from 'atom';
import setup from './tab-through-setup';

export default {
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'tab-through-selections:start': event => {
          setup.start();
        },
        'tab-through-selections:next': event => {
          if (!setup.next()) return event.abortKeyBinding();
        },
        'tab-through-selections:previous': event => {
          if (!setup.previous()) return event.abortKeyBinding();
        },
        'tab-through-selections:unsubscribe': event => {
          setup.unsubscribe();

          // Never stop default escape behavior
          event.abortKeyBinding();
        },
      }),
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {},
};
