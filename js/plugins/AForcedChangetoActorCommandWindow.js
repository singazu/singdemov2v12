/*:
 * @target MZ
 * @plugindesc Force Actor Command Window Size (even with VisuStella Battle Core) - Width and Height control.
 * @author You
 *
 * @param Window Width
 * @type number
 * @min 0
 * @default 816
 *
 * @param Window Height
 * @type number
 * @min 0
 * @default 120
 *
 * @help
 * Forces the actor command window to a specific width and height even when using VisuStella Battle Core.
 */

(() => {
    const parameters = PluginManager.parameters("ForceActorCommandWindow");
    const customWidth = Number(parameters["Window Width"] || 200);
    const customHeight = Number(parameters["Window Height"] || 60);

    const _Window_ActorCommand_refresh = Window_ActorCommand.prototype.refresh;
    Window_ActorCommand.prototype.refresh = function() {
        _Window_ActorCommand_refresh.call(this);
        this.width = customWidth;
        this.height = customHeight;
        this.x = (Graphics.boxWidth - this.width) / 2; // Center horizontally
        this.refreshPlacement && this.refreshPlacement(); // VisuStella-friendly
    };
})();
