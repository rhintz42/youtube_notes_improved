var WorkspaceView = Backbone.View.extend({
    template: _.template($('#container').html()),
    id: "window-container",
    events: {
        'change-mode': function(event, mode) {this.changeMode(mode)}
    },
    initialize: function() {
        this.notes = new NoteCollection;
        this.viewerPane = new ViewerView;
        this.noteListPane = new NoteListView(this.notes, this.viewerPane);
        
        this.$el.append(this.viewerPane.render().el);
        this.$el.append(this.noteListPane.render().el);

        this.changeMode('viewer');
    },
    render: function() {
        $('body').append(this.el);
    },
    changeMode: function(mode) {
        var self = this;

        if(mode === 'viewer' && this.mode !== 'viewer') {
            self.setModeViewer();
            $('#debug-view-mode').html("viewer");
        } else if(mode === 'editor' && this.mode !== 'editor') {
            self.setModeEditor();
            $('#debug-view-mode').html("editor");
        } else if(mode === 'note-list' && this.mode !== 'note-list') {
            self.setModeNoteList();
            $('#debug-view-mode').html("note-list");
        }
    },
    // TODO
    // Create Function called "Add Shortcut" that creates shortcuts and adds
    //  them to modes
    // Add them to an object called `shortcuts`
    setModeViewer: function() {
        var self = this;
        
        shortcut.removeAll();

        shortcut.add("k",function() {
            self.viewerPane.toggle();
        });
        
        shortcut.add("l",function() {
            self.viewerPane.goForward(2);
        });
        shortcut.add("º",function() {
            self.viewerPane.goForward(10);
        });
        
        shortcut.add("j",function() {
            self.viewerPane.goBack(2);
        });
        shortcut.add("h",function() {
            self.viewerPane.goBack(10);
        });
        
        shortcut.add("c",function() {
            self.noteListPane.newNote();
        });
        
        shortcut.add("i",function() {
            self.noteListPane.newNote();
        });

        shortcut.add("Ctrl+3",function() {
            self.changeMode('note-list');
        });

        self.mode = 'viewer';
    },
    setModeEditor: function() {
        var self = this;
        
        shortcut.removeAll();

        // TODO: Add Enter Shortcut that edits the current node on

        shortcut.add("Ctrl+1",function() {
            self.changeMode('viewer');
        });

        shortcut.add("Ctrl+3",function() {
            self.changeMode('note-list');
        });

        /*
        shortcut.add("Enter",function() {
            self.noteListPane.editNote();
        });
        */

        self.mode = 'editor';
    },
    setModeNoteList: function() {
        var self = this;
        
        shortcut.removeAll();

        shortcut.add("Ctrl+1",function() {
            self.changeMode('viewer');
        });

        shortcut.add("Ctrl+2",function() {
            self.changeMode('editor');
        });

        shortcut.add("k",function() {
            self.noteListPane.previous();
        });

        shortcut.add("j",function() {
            self.noteListPane.next();
        });

        shortcut.add("Enter",function() {
            self.noteListPane.editNote();
        });

        self.noteListPane.selected();
        self.mode = 'note-list';
    }
});
