'use babel';

import SearchPursuitView from './search-pursuit-view';
import { CompositeDisposable } from 'atom';

export default {

  searchPursuitView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.searchPursuitView = new SearchPursuitView(state.searchPursuitViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.searchPursuitView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'search-pursuit:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.searchPursuitView.destroy();
  },

  serialize() {
    return {
      searchPursuitViewState: this.searchPursuitView.serialize()
    };
  },

  toggle() {
    console.log('SearchPursuit was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
