'use strict';

(function () {
    //reference

    Window_ItemList.prototype.makeItemList = function () {
        this._data = $gameParty.allItems().filter(function (item) {
            return this.includes(item);
        }, this);
        if (this.includes(null)) {
            this._data.push(null);
        }
    };

    //-----------------------------------------------------------------------
    // Commands

    var LevelingEquipmentCommands = Game_Interpreter.prototype.pluginCommand
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        LevelingEquipmentCommands.apply(this);
        if (command === 'lvecmd') {
            switch (args[0]) {
                case 'open':
                    switch (args[1]) {
                        case 'testwindow':
                            SceneManager.push(Scene_testwindow);
                            break;
                    }
                    break;
                case 'opentest':

                    break;
                default:

                    break;
            }
        }
    };

    //-----------------------------------------------------------------------
    // Core

    function Lveqcmd() {
        throw Error('스테틱 아님');
    }

    $gameActors.actor(n)._equips[0].exp=0;


    Game_Actor.prototype.changeEquip = function (slotId, item) {
        if (this.tradeItemWithParty(item, this.equips()[slotId]) &&
            (!item || this.equipSlots()[slotId] === item.etypeId)) {
            this._equips[slotId].setObject(item);
            this._equips[slotId].exp = 0;
            this.refresh();
        }
    };


    //-----------------------------------------------------------------------
    // Utils

    function Scene_testwindow() {
        this.initialize.apply(this, arguments);
    }
    Scene_testwindow.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_testwindow.prototype.constructor = Scene_testwindow;

    Scene_testwindow.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_testwindow.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);

        this._testwindow = new Window_testwindow(0,0);
        this._testwindow.setHandler('cancel', SceneManager.goto(Scene_Map));
        this.addWindow(this._testwindow);
    };

    Scene_testwindow.prototype.update = function () {
        Scene_MenuBase.prototype.update.call(this);
        if (Input.isRepeated('cancel')) {
            SceneManager.goto(Scene_Map);
        }
    }

    function Window_testwindow() {
        this.initialize.apply(this, arguments);
    }

    Window_testwindow.prototype = Object.create(Window_Base.prototype);
    Window_testwindow.prototype.constructor = Window_testwindow;

    Window_testwindow.prototype.initialize = function (x, y) {
        var w = Graphics.boxWidth;
        var h = Graphics.boxHeight;
        Window_Selectable.prototype.initialize.call(this, x, y, w, h);
        this.refresh();
    }

    Window_testwindow.prototype.setHandler = function (symbol, method) {
        this._handlers[symbol] = method;
    };

    Window_testwindow.prototype.refresh = function () {
        this.drawText('stop', 0, 0, 100, 0)
        this.drawText('stop', 0, 40, 100, 1)
        this.drawText('stop', 0, 80, 100, 2)
    }

    Window_testwindow.prototype.open = function () {
        this.refresh();
        Window_Base.prototype.open.call(this)
    }

})();


