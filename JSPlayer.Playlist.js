(function() {
    "use strict";
    var nextItemID = 0;

    // Constructor
    function playlist() {
        this.items = [];
        this.selectedIndex = null;

        this.onCleared = new JSPlayer.event();
        this.onItemAdded = new JSPlayer.event();
        this.onItemSelected = new JSPlayer.event();
    }

    // Private methods
    function createItem(playlist, file) {
        var item = { id: nextItemID, file: file };
        nextItemID += 1;
        return item;
    }

    // Public methods
    function addItem(file) {
        var item = createItem(playlist, file);
        this.items.push(item);

        this.onItemAdded.trigger(item);

        if (this.selectedIndex == null) {
            this.selectItem(0);
        }
    }

    function clear() {
        this.items = [];
        this.selectedIndex = null;
        this.onCleared.trigger();
    }

    function isFirstItemSelected() {
        return this.selectedIndex != null && this.selectedIndex == 0;
    }

    function isLastItemSelected() {
        return this.selectedIndex != null &&
            this.selectedIndex == this.items.length - 1;
    }

    function selectItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.selectedIndex = index;
            this.onItemSelected.trigger(this.items[index]);
        }
    }

    function selectItemByID(itemID) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id == itemID) {
                this.selectItem(i);
                break;
            }
        }
    }

    function selectNext() {
        if (this.selectedIndex < this.items.length - 1) {
            this.selectItem(this.selectedIndex + 1);
        }
    }

    function selectPrevious() {
        if (this.selectedIndex > 0) {
            this.selectItem(this.selectedIndex - 1);
        }
    }

    playlist.prototype = {
        addItem: addItem,
        clear: clear,
        isFirstItemSelected: isFirstItemSelected,
        isLastItemSelected: isLastItemSelected,
        selectItem: selectItem,
        selectItemByID: selectItemByID,
        selectNext: selectNext,
        selectPrevious: selectPrevious
    };

    JSPlayer.playlist = playlist;
})();
