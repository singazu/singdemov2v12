/*:
 * @target MZ
 * @plugindesc Adjusts Actor Command Window size (width & height) even with VisuStella Battle Core installed (Front View only). 
 * @author You
 *
 * @param Window Width
 * @type number
 * @min 0
 * @desc Set the width of the Actor Command Window.
 * @default 816
 *
 * @param Window Height
 * @type number
 * @min 0
 * @desc Set the height of the Actor Command Window.
 * @default 120
 *
 * @help
 * This plugin adjusts the Actor Command Window dimensions even if using VisuStella Battle Core.
 */

(() => {
    const parameters = PluginManager.parameters("AdjustActorCommandWindow");
    const customWidth = Number(parameters["Window Width"] || 816);
    const customHeight = Number(parameters["Window Height"] || 120);

    const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
    Scene_Battle.prototype.createActorCommandWindow = function() {
        _Scene_Battle_createActorCommandWindow.call(this);
        const win = this._actorCommandWindow;
        win.width = customWidth;
        win.height = customHeight;
        win.refresh();
    };
})();
