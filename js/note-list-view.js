var NoteListView = Backbone.View.extend({
    template: _.template($('#bottom-pane').html()),
    initialize: function(notes, viewer) {
        this.notes = notes;
        this.viewer = viewer;

        this.listenTo(notes, 'add', this.addNote);
        this.listenTo(notes, 'change', this.addAllNotes);
    },
    render: function() {
        this.$el.html(this.template());
        return this;
    },
    selected: function() {
        this.$el.find('tr').first().addClass("current");
    },
    addNote: function(noteModel) {
        var note = new NoteView(this.notes, noteModel);
        this.$el.find('#bottom-pane-container').append(note.render().el);
        $('#window-container').trigger("change-mode", "viewer");
    },
    addAllNotes: function() {
        var self = this;
        
        self.render();

        _.each(this.notes.models, function(note) {
            var noteView = new NoteView(self.notes, note);
            self.$el.find('#bottom-pane-container').append(noteView.render().el);
        });
        $('#window-container').trigger("change-mode", "viewer");
    },
    editNote: function(noteModel) {
        var selected = this.$el.find('.current');
        selected.trigger('click');
    },
    newNote: function() {
        var model = new NoteModel({time: this.viewer.getCurrentTime(), content: '', number: this.notes.length});
        var note = new NoteView(this.notes, model);
        this.$el.append(note.renderEdit().el);
        this.$el.find('.edit .content').focus();
        $('#window-container').trigger("change-mode", "editor");
    },
    previous: function() {
        var currentElement = this.$el.find("tr.current");
        var currentID = currentElement.attr("id");
        if(currentID === undefined)
            return
        var currentNum = parseInt(currentID.substring("note-".length));
        
        var newElement = this.$el.find('#note-'+(currentNum-1));
        if(newElement.length > 0) {
            currentElement.removeClass("current");
            newElement.addClass("current");
        }
    },
    next: function() {
        var currentElement = this.$el.find("tr.current");
        var currentID = currentElement.attr("id");
        if(currentID === undefined)
            return
        var currentNum = parseInt(currentID.substring("note-".length));
        
        var newElement = this.$el.find('#note-'+(currentNum+1));
        if(newElement.length > 0) {
            currentElement.removeClass("current");
            newElement.addClass("current");
        }
    }
});

