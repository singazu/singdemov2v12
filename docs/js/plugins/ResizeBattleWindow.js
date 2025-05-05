(() => {
    const _originalStatusWindowRect = Scene_Battle.prototype.statusWindowRect;

    Scene_Battle.prototype.statusWindowRect = function() {
        const originalRect = _originalStatusWindowRect.call(this);

        const wx = originalRect.x;
        const wy = originalRect.y + 64; //im offseting the y coordinate to make up for the height adjustment.
        const ww = originalRect.width;
        const wh = 140; // adjusting the height

        return new Rectangle(wx, wy, ww, wh);
    };
})();