function handler(e) {
  console.log('handler', e);
  e.preventDefault();
}
var editorView = atom.views.getView(atom.workspace.getActiveTextEditor());
editorView.addEventListener('keydown', handler, false);

editorView.removeEventListener('keydown', handler);
