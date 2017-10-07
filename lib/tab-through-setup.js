'use babel';

module.exports = {
  markers: [],
  editor: null,
  index: -1,
  start: function() {
    this.editor = atom.workspace.getActiveTextEditor();
    var selects = this.editor.getSelectedBufferRanges();

    // Reset all markers
    this.unsubscribe();

    if (selects.length > 1) {
      this.index = -1;
      for (var i = 0; i < selects.length; i++) {
        this.markers.push(this.editor.markBufferRange(selects[i]));
      }
      this.next();
    }
  },
  next: function() {
    this.index++;
    return this.select();
  },
  previous: function() {
    this.index--;
    return this.select();
  },
  select: function() {
    if (this.markers[this.index]) {
      this.editor.setSelectedBufferRange(
        this.markers[this.index].getBufferRange()
      );
      return true;
    }
    this.unsubscribe();
  },
  unsubscribe: function() {
    // Remove error tracking for tab
    this.markers = [];
  },
};
