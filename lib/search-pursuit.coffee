Shell = require 'shell'

module.exports =
  activate: ->
    atom.commands.add 'atom-workspace', 'search-pursuit:toggle': => @search()

  search: ->
    editor = atom.workspace.getActiveTextEditor()
    buffer = editor.getBuffer()
    selections = editor.getSelections()

    buffer.transact ->
      for selection in selections
        cased = selection.getText()
        url = "https://pursuit.purescript.org/search?q=#{cased}"
        Shell.openExternal url
