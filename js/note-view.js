var NoteView = Backbone.View.extend({
    class: 'note',
    events: {
        'click': 'renderEdit',
        'keydown input': 'keyPressEventHandler'
    },
    initialize: function(notes, model) {
        this.notes = notes;
        this.model = model;
    },
    render: function() {
        this.$el.html("<tr id='note-" + this.model.get('number') + "'><td class='time'>" + this.model.get('time') + "</td><td>" + this.model.get('content') + "</td></tr>");
        return this;
    },
    renderEdit: function(isNew) {
        $('#window-container').trigger("change-mode", "editor");
        this.$el.html("<tr id='note-" + this.model.get('number') + "' class='edit'><form><td><input type='text' name='time' class='time' value='" + this.model.get('time') + "' /></td><td><input type='text' name='content' class='content' value='" + this.model.get('content') + "' /></td><td><input type='submit' value='Submit'></td></tr></form>");
        this.$el.find(".content").focus();
        return this;
    },
    updateNote: function() {
        var time = this.$el.find('.time').val();
        var content = this.$el.find('.content').val();
        this.$el.remove();
        if(this.model.isNew() && content.length > 0) {
            this.model.set({time: time,content:content});
            this.notes.create(this.model);
        } else if(content.length > 0) {
            this.model.set({time: time,content:content});
        } else {
            this.model.destroy();
        }
    },
    keyPressEventHandler: function(event) {
        if(event.keyCode === 13) {
            this.updateNote();
            $('#window-container').trigger("change-mode", "viewer");
        }
    }
});
